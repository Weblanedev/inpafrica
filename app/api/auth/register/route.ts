import { NextRequest, NextResponse } from "next/server";
import {
  createPendingAffiliateVendorSignup,
  createUser,
  toPublicUser,
} from "@/lib/auth";
import type { AccountType } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, username, email, password } = body;
    const accountType = (body.accountType as AccountType | undefined) ?? "customer";

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (
      accountType !== "customer" &&
      accountType !== "affiliate" &&
      accountType !== "vendor"
    ) {
      return NextResponse.json({ error: "Invalid account type" }, { status: 400 });
    }

    if (accountType === "affiliate" || accountType === "vendor") {
      const { pendingId } = await createPendingAffiliateVendorSignup(
        name,
        username,
        email,
        password,
        accountType,
      );
      return NextResponse.json({
        success: true,
        requiresPayment: true,
        pendingId,
        accountType,
      });
    }

    const user = await createUser(name, username, email, password);
    const cookieStore = await cookies();
    cookieStore.set("bookstem_session", user.id, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    return NextResponse.json({
      success: true,
      requiresPayment: false,
      user: toPublicUser(user),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
