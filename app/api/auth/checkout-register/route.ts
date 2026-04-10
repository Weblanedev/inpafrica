import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createUserFromCheckout, toPublicUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const city = String(body.city ?? "").trim();
    const country = body.country != null ? String(body.country).trim() : "";
    const state = body.state != null ? String(body.state).trim() : "";

    if (!name || !email || !phone || !city) {
      return NextResponse.json(
        { error: "Name, email, phone, and city are required" },
        { status: 400 },
      );
    }

    const user = await createUserFromCheckout(
      name,
      email,
      phone,
      city,
      country || undefined,
      state || undefined,
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
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not create account";
    const status = message.includes("already exists") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
