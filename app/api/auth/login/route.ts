import { NextRequest, NextResponse } from "next/server";
import {
  findUserByLogin,
  isBlockedPendingMembership,
  toPublicUser,
  verifyUser,
} from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const login = String(body.login ?? "");
  const password = String(body.password ?? "");
  const accessCode =
    body.accessCode != null ? String(body.accessCode) : undefined;

  if (!login || !password) {
    return NextResponse.json(
      { error: "Email or username and password are required" },
      { status: 400 },
    );
  }

  const candidate = findUserByLogin(login);
  if (candidate && isBlockedPendingMembership(candidate)) {
    return NextResponse.json(
      {
        error:
          "Complete your membership payment first. Return to the payment step from registration, or open Register and choose affiliate or vendor again.",
      },
      { status: 403 },
    );
  }

  const user = await verifyUser(login, password, accessCode);
  if (!user) {
    return NextResponse.json(
      {
        error:
          "Invalid email, username, password, or member access code. Affiliate and vendor members must enter the access code issued after payment.",
      },
      { status: 401 },
    );
  }
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
  });
}
