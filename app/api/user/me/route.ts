import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserById, toPublicUser } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("bookstem_session")?.value;
  if (!sessionId) return NextResponse.json({ user: null });
  const user = getUserById(sessionId);
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: toPublicUser(user),
  });
}
