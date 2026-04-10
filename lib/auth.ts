import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import {
  findPendingSignupById,
  removePendingSignupById,
  readPendingSignups,
  writePendingSignups,
  type PendingMembershipSignup,
} from "@/lib/pendingMembershipSignup";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

export type AccountType = "customer" | "affiliate" | "vendor";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  plan: "free" | "starter" | "pro";
  createdAt: string;
  /** Set on all new accounts; omitted on legacy rows */
  accountType?: AccountType;
  /** Affiliate/vendor only: registered but not yet paid for membership */
  membershipPending?: boolean;
  /** Affiliate/vendor: payment completed; unlocks member book pricing & tools */
  membershipPaid?: boolean;
  /** Bcrypt hash of long access code; set after membership payment (affiliate/vendor) */
  accessCodeHash?: string | null;
  /** Saved from checkout; used to prefill next time */
  phone?: string;
  city?: string;
  /** ISO 3166-1 alpha-2, e.g. CM */
  country?: string;
  /** State/province name from subdivision list (or free text when none listed) */
  state?: string;
  /**
   * `false` = account created at checkout; user must set username & password.
   * Omitted or `true` = normal account.
   */
  profileSetupComplete?: boolean;
}

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function readUsers(): User[] {
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

export function writeUsers(users: User[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

export async function createUser(
  name: string,
  username: string,
  email: string,
  password: string,
): Promise<User> {
  const users = readUsers();
  const userNorm = normalizeUsername(username);
  if (!userNorm.length) {
    throw new Error("Username is required");
  }
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Email already registered");
  }
  if (users.some((u) => normalizeUsername(u.username) === userNorm)) {
    throw new Error("Username already taken");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    username: userNorm,
    email,
    passwordHash,
    plan: "free",
    createdAt: new Date().toISOString(),
    profileSetupComplete: true,
    accountType: "customer",
    membershipPaid: false,
  };
  writeUsers([...users, newUser]);
  return newUser;
}

/**
 * Affiliate/vendor: stores signup in pending file only until payment succeeds.
 * No row in users.json until finalizeAffiliateVendorFromPending.
 */
export async function createPendingAffiliateVendorSignup(
  name: string,
  username: string,
  email: string,
  password: string,
  accountType: "affiliate" | "vendor",
): Promise<{ pendingId: string }> {
  const emailLower = email.toLowerCase();
  let users = readUsers();
  const userNorm = normalizeUsername(username);
  if (!userNorm.length) {
    throw new Error("Username is required");
  }

  const existing = users.find((u) => u.email.toLowerCase() === emailLower);
  if (existing) {
    const abandonedLegacyMembership =
      (existing.accountType === "affiliate" ||
        existing.accountType === "vendor") &&
      existing.membershipPending === true &&
      existing.membershipPaid !== true;
    if (abandonedLegacyMembership) {
      users = users.filter((u) => u.id !== existing.id);
      writeUsers(users);
    } else {
      throw new Error(
        "This email already has an account. Sign in to continue, or use a different email for affiliate or vendor signup.",
      );
    }
  }

  users = readUsers();
  if (users.some((u) => normalizeUsername(u.username) === userNorm)) {
    throw new Error("Username already taken");
  }
  let pending = readPendingSignups();
  pending = pending.filter((p) => p.email.toLowerCase() !== emailLower);
  if (pending.some((p) => normalizeUsername(p.username) === userNorm)) {
    throw new Error("Username already taken");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const row: PendingMembershipSignup = {
    id: crypto.randomUUID(),
    name,
    username: userNorm,
    email,
    passwordHash,
    accountType,
    createdAt: new Date().toISOString(),
  };
  writePendingSignups([...pending, row]);
  return { pendingId: row.id };
}

export type MembershipPlan =
  | "affiliate-starter"
  | "affiliate-pro"
  | "vendor";

export function generateMembershipAccessCode(): string {
  const a = crypto.randomUUID().replace(/-/g, "");
  const b = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return `INP-${a}${b}`.toUpperCase();
}

/** Legacy: user row exists with membershipPending (older flow). Prefer finalizeAffiliateVendorFromPending. */
export async function completeMembershipPayment(
  userId: string,
  plan: MembershipPlan,
): Promise<{ user: User; accessCode: string }> {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error("User not found");
  const u = users[idx];
  if (u.accountType !== "affiliate" && u.accountType !== "vendor") {
    throw new Error("Not an affiliate or vendor registration");
  }
  if (u.membershipPaid) {
    throw new Error("Membership already active");
  }
  const accessCode = generateMembershipAccessCode();
  const accessCodeHash = await bcrypt.hash(accessCode, 10);
  let nextPlan: User["plan"] = "free";
  if (plan === "affiliate-starter") nextPlan = "starter";
  if (plan === "affiliate-pro") nextPlan = "pro";
  const updated: User = {
    ...u,
    plan: nextPlan,
    membershipPending: false,
    membershipPaid: true,
    accessCodeHash,
  };
  const next = [...users];
  next[idx] = updated;
  writeUsers(next);
  return { user: updated, accessCode };
}

/** After successful payment: create affiliate/vendor user in one step (no prior users.json row). */
export async function finalizeAffiliateVendorFromPending(
  pendingId: string,
  plan: MembershipPlan,
): Promise<{ user: User; accessCode: string }> {
  const pending = findPendingSignupById(pendingId);
  if (!pending) {
    throw new Error(
      "Registration session expired or invalid. Please register again.",
    );
  }
  if (plan === "vendor" && pending.accountType !== "vendor") {
    throw new Error("Plan does not match registration type");
  }
  if (
    (plan === "affiliate-starter" || plan === "affiliate-pro") &&
    pending.accountType !== "affiliate"
  ) {
    throw new Error("Plan does not match registration type");
  }
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === pending.email.toLowerCase())) {
    removePendingSignupById(pendingId);
    throw new Error("Email already registered");
  }
  if (
    users.some(
      (u) => normalizeUsername(u.username) === normalizeUsername(pending.username),
    )
  ) {
    throw new Error("Username already taken");
  }
  const accessCode = generateMembershipAccessCode();
  const accessCodeHash = await bcrypt.hash(accessCode, 10);
  let nextPlan: User["plan"] = "free";
  if (plan === "affiliate-starter") nextPlan = "starter";
  if (plan === "affiliate-pro") nextPlan = "pro";
  const newUser: User = {
    id: crypto.randomUUID(),
    name: pending.name,
    username: normalizeUsername(pending.username),
    email: pending.email,
    passwordHash: pending.passwordHash,
    plan: nextPlan,
    createdAt: new Date().toISOString(),
    profileSetupComplete: true,
    accountType: pending.accountType,
    membershipPaid: true,
    accessCodeHash,
  };
  writeUsers([...users, newUser]);
  removePendingSignupById(pendingId);
  return { user: newUser, accessCode };
}

function randomTempUsername(): string {
  const hex = crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  return `member_${hex}`;
}

export function userNeedsProfileSetup(user: User): boolean {
  return user.profileSetupComplete === false;
}

/**
 * Creates a session user from checkout details with a temporary username and
 * random password. Caller must follow with completeCheckoutProfile.
 */
export async function createUserFromCheckout(
  name: string,
  email: string,
  phone: string,
  city: string,
  country?: string,
  state?: string,
): Promise<User> {
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error(
      "An account with this email already exists. Please log in to continue.",
    );
  }
  let username = randomTempUsername();
  let attempts = 0;
  while (users.some((u) => normalizeUsername(u.username) === username) && attempts < 20) {
    username = randomTempUsername();
    attempts += 1;
  }
  const tempPassword = crypto.randomUUID() + crypto.randomUUID();
  const passwordHash = await bcrypt.hash(tempPassword, 10);
  const newUser: User = {
    id: crypto.randomUUID(),
    name: name.trim(),
    username,
    email: email.trim(),
    passwordHash,
    plan: "free",
    createdAt: new Date().toISOString(),
    phone: phone.trim(),
    city: city.trim(),
    country: country?.trim() || undefined,
    state: state?.trim() || undefined,
    profileSetupComplete: false,
    accountType: "customer",
    membershipPaid: false,
  };
  writeUsers([...users, newUser]);
  return newUser;
}

export async function completeCheckoutProfile(
  userId: string,
  username: string,
  password: string,
): Promise<User> {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error("User not found");
  const current = users[idx];
  if (!userNeedsProfileSetup(current)) {
    throw new Error("Profile is already complete");
  }
  const userNorm = normalizeUsername(username);
  if (!userNorm.length) throw new Error("Username is required");
  if (users.some((u, i) => i !== idx && normalizeUsername(u.username) === userNorm)) {
    throw new Error("Username already taken");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const updated: User = {
    ...current,
    username: userNorm,
    passwordHash,
    profileSetupComplete: true,
  };
  const next = [...users];
  next[idx] = updated;
  writeUsers(next);
  return updated;
}

export function updateUserDeliveryFields(
  userId: string,
  fields: { phone?: string; city?: string; country?: string; state?: string },
): User | null {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  const updated: User = {
    ...users[idx],
    ...fields,
  };
  const next = [...users];
  next[idx] = updated;
  writeUsers(next);
  return updated;
}

export async function verifyUser(
  loginIdentifier: string,
  password: string,
  accessCode?: string,
): Promise<User | null> {
  const users = readUsers();
  const raw = loginIdentifier.trim();
  if (!raw) return null;

  const byEmail = users.find(
    (u) => u.email.toLowerCase() === raw.toLowerCase(),
  );
  const byUsername = users.find(
    (u) => normalizeUsername(u.username) === normalizeUsername(raw),
  );
  const user = byEmail ?? byUsername;
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  if (
    (user.accountType === "affiliate" || user.accountType === "vendor") &&
    user.membershipPending &&
    !user.membershipPaid
  ) {
    return null;
  }

  if (user.accountType === "affiliate" || user.accountType === "vendor") {
    if (user.membershipPaid && user.accessCodeHash) {
      const code = (accessCode ?? "").trim();
      if (!code) return null;
      const ok = await bcrypt.compare(code, user.accessCodeHash);
      if (!ok) return null;
    }
  }

  return user;
}

export function getUserById(id: string): User | null {
  return readUsers().find((u) => u.id === id) ?? null;
}

export function findUserByLogin(loginIdentifier: string): User | null {
  const raw = loginIdentifier.trim();
  if (!raw) return null;
  const byEmail = readUsers().find(
    (u) => u.email.toLowerCase() === raw.toLowerCase(),
  );
  const byUsername = readUsers().find(
    (u) => normalizeUsername(u.username) === normalizeUsername(raw),
  );
  return byEmail ?? byUsername ?? null;
}

export function isBlockedPendingMembership(user: User): boolean {
  return (
    (user.accountType === "affiliate" || user.accountType === "vendor") &&
    user.membershipPending === true &&
    user.membershipPaid !== true
  );
}

/** Shape returned to the client (cookies / JSON). */
export function toPublicUser(user: User) {
  const needsAccessCodeForLogin =
    (user.accountType === "affiliate" || user.accountType === "vendor") &&
    user.membershipPaid === true;

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    plan: user.plan,
    needsProfileSetup: userNeedsProfileSetup(user),
    phone: user.phone,
    city: user.city,
    country: user.country,
    state: user.state,
    accountType: user.accountType ?? null,
    membershipPending: user.membershipPending === true,
    membershipPaid: user.membershipPaid === true,
    needsAccessCodeForLogin,
  };
}

/** Member book pricing: paid affiliate or paid vendor. Legacy accounts (no accountType) keep previous behaviour. */
export function canViewMemberBookPrice(user: User | null): boolean {
  if (!user) return false;
  if (user.accountType === "customer") return false;
  if (user.accountType === "affiliate" || user.accountType === "vendor") {
    return user.membershipPaid === true;
  }
  return true;
}

export function canUseAffiliateProgram(user: User | null): boolean {
  return (
    !!user &&
    user.accountType === "affiliate" &&
    user.membershipPaid === true
  );
}

export function canUseVendorProgram(user: User | null): boolean {
  return (
    !!user &&
    user.accountType === "vendor" &&
    user.membershipPaid === true
  );
}
