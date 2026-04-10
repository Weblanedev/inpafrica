/** Minimal user fields for pricing checks (matches AuthUser / API). */
export type MemberPricingUser = {
  accountType?: string | null;
  membershipPaid?: boolean;
} | null;

/** Member book prices only for paid affiliate or paid vendor. Legacy accounts (no accountType) keep member pricing. */
export function canViewMemberBookPrice(user: MemberPricingUser): boolean {
  if (!user) return false;
  if (user.accountType === "customer") return false;
  if (user.accountType === "affiliate" || user.accountType === "vendor") {
    return user.membershipPaid === true;
  }
  return true;
}

export function canUseAffiliateProgram(user: MemberPricingUser): boolean {
  return (
    user?.accountType === "affiliate" && user?.membershipPaid === true
  );
}

export function canUseVendorProgram(user: MemberPricingUser): boolean {
  return user?.accountType === "vendor" && user?.membershipPaid === true;
}
