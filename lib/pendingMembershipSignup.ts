import fs from "fs";
import path from "path";

const FILE = path.join(
  process.cwd(),
  "data",
  "pending-membership-signups.json",
);

export type PendingAccountType = "affiliate" | "vendor";

export interface PendingMembershipSignup {
  id: string;
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  accountType: PendingAccountType;
  createdAt: string;
}

export function readPendingSignups(): PendingMembershipSignup[] {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    return JSON.parse(raw) as PendingMembershipSignup[];
  } catch {
    return [];
  }
}

export function writePendingSignups(rows: PendingMembershipSignup[]): void {
  fs.writeFileSync(FILE, JSON.stringify(rows, null, 2), "utf8");
}

export function findPendingSignupById(
  id: string,
): PendingMembershipSignup | undefined {
  return readPendingSignups().find((p) => p.id === id);
}

export function removePendingSignupById(id: string): void {
  const rows = readPendingSignups().filter((p) => p.id !== id);
  writePendingSignups(rows);
}
