/**
 * Thousands separator: comma every 3 digits from the right (e.g. 1,000, 79,196).
 * Works consistently in SSR/Node where `toLocaleString` may omit grouping.
 */
function formatIntWithCommaGrouping(n: number): string {
  const s = String(Math.floor(Math.abs(n)));
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Formats a whole number with comma thousands (e.g. 1200 → `1,200`).
 * Use for pages, review counts, stats. For money amounts use {@link formatXaf}.
 */
export function formatThousands(value: number): string {
  const n = Math.floor(Math.abs(Number.isFinite(value) ? value : 0));
  return formatIntWithCommaGrouping(n);
}

/**
 * Formats XAF amounts (hundreds / thousands, not millions).
 * Whole amounts: `1,500XAF` (comma thousands; no space before XAF).
 * With centimes: `79,196.50XAF` (comma thousands, period before fractional part).
 */
export function formatXaf(amount: number): string {
  const totalCents = Math.round(Math.abs(amount) * 100);
  const intNum = Math.floor(totalCents / 100);
  const cents = totalCents % 100;
  const intStr = formatIntWithCommaGrouping(intNum);
  if (cents === 0) {
    return `${intStr}XAF`;
  }
  const decStr = cents.toString().padStart(2, "0");
  return `${intStr}.${decStr}XAF`;
}
