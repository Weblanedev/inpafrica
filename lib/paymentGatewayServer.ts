/**
 * Server-side payment gateway probe. Used before completing checkout or membership.
 * Set PAYMENT_GATEWAY_HEALTH_URL to your provider’s health/ping URL when onboarded.
 * If unset, waits the full timeout then fails (same UX as gateway not responding).
 */

const GATEWAY_TIMEOUT_MS = 10_000;

export type TryGatewayResult =
  | { ok: true }
  | { ok: false; error: string };

export async function tryPaymentGateway(): Promise<TryGatewayResult> {
  const url = process.env.PAYMENT_GATEWAY_HEALTH_URL?.trim();

  if (url) {
    try {
      const res = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(GATEWAY_TIMEOUT_MS),
        cache: "no-store",
      });
      if (res.ok) return { ok: true };
      return {
        ok: false,
        error: "Payment gateway returned an error. Please try again later.",
      };
    } catch {
      return {
        ok: false,
        error:
          "We could not reach the payment gateway in time. Please try again later.",
      };
    }
  }

  await new Promise((r) => setTimeout(r, GATEWAY_TIMEOUT_MS));
  return {
    ok: false,
    error:
      "Payment gateway is not available yet. Your cart is saved. Please try again later.",
  };
}
