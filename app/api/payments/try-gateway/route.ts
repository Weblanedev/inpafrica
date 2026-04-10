import { NextResponse } from "next/server";
import { tryPaymentGateway } from "@/lib/paymentGatewayServer";

export async function POST() {
  const result = await tryPaymentGateway();
  if (result.ok) {
    return NextResponse.json({ ok: true as const });
  }
  return NextResponse.json(
    { ok: false as const, error: result.error },
    { status: 503 },
  );
}
