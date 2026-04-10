import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  completeMembershipPayment,
  finalizeAffiliateVendorFromPending,
  getUserById,
  isBlockedPendingMembership,
  type MembershipPlan,
  toPublicUser,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pendingId = String(body.pendingId ?? "").trim();
    const legacyUserId = String(body.userId ?? "").trim();
    const plan = body.plan as MembershipPlan;
    const validPlans: MembershipPlan[] = [
      "affiliate-starter",
      "affiliate-pro",
      "vendor",
    ];
    if (!validPlans.includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (!pendingId && !legacyUserId) {
      return NextResponse.json(
        { error: "Missing registration session" },
        { status: 400 },
      );
    }

    if (pendingId) {
      const { user, accessCode } = await finalizeAffiliateVendorFromPending(
        pendingId,
        plan,
      );
      const cookieStore = await cookies();
      cookieStore.set("bookstem_session", user.id, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
      return NextResponse.json({
        success: true,
        user: toPublicUser(user),
        accessCode,
      });
    }

    const existing = getUserById(legacyUserId);
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!isBlockedPendingMembership(existing)) {
      if (existing.membershipPaid) {
        return NextResponse.json(
          { error: "Membership already active" },
          { status: 400 },
        );
      }
      return NextResponse.json(
        {
          error:
            "This account is not waiting for membership payment. Log in as a customer or contact support.",
        },
        { status: 400 },
      );
    }
    if (plan === "vendor" && existing.accountType !== "vendor") {
      return NextResponse.json(
        { error: "Plan does not match registration type" },
        { status: 400 },
      );
    }
    if (
      (plan === "affiliate-starter" || plan === "affiliate-pro") &&
      existing.accountType !== "affiliate"
    ) {
      return NextResponse.json(
        { error: "Plan does not match registration type" },
        { status: 400 },
      );
    }

    const { user, accessCode } = await completeMembershipPayment(
      legacyUserId,
      plan,
    );

    const cookieStore = await cookies();
    cookieStore.set("bookstem_session", user.id, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return NextResponse.json({
      success: true,
      user: toPublicUser(user),
      accessCode,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not complete membership";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
