/**
 * Client helper: call server try-gateway (10s handled server-side; client allows extra headroom).
 */

const CLIENT_FETCH_MS = 15_000;

export type TryGatewayResponse =
  | { ok: true }
  | { ok: false; error: string };

export async function fetchTryGateway(): Promise<TryGatewayResponse> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), CLIENT_FETCH_MS);
  try {
    const res = await fetch("/api/payments/try-gateway", {
      method: "POST",
      signal: controller.signal,
    });
    const data = (await res.json()) as TryGatewayResponse & { error?: string };
    if (res.ok && data.ok) return { ok: true };
    return {
      ok: false,
      error:
        typeof data.error === "string"
          ? data.error
          : "Payment gateway is unavailable. Please try again later.",
    };
  } catch {
    return {
      ok: false,
      error:
        "We could not reach the payment gateway in time. Please try again later.",
    };
  } finally {
    clearTimeout(t);
  }
}
