import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  completeCheckoutProfile,
  getUserById,
  toPublicUser,
  userNeedsProfileSetup,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("bookstem_session")?.value;
    if (!sessionId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
    const current = getUserById(sessionId);
    if (!current) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
    if (!userNeedsProfileSetup(current)) {
      return NextResponse.json(
        { error: "Profile is already complete" },
        { status: 400 },
      );
    }

    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    const user = await completeCheckoutProfile(
      sessionId,
      String(username),
      String(password),
    );

    return NextResponse.json({
      success: true,
      user: toPublicUser(user),
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not update profile";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
