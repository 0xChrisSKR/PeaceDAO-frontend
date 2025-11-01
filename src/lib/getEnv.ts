/**
 * getEnv(key): resilient env reader for both server/client in Next.js
 * - Accepts either "peaceFund" or "PEACE_FUND" (camelCase / SNAKE_CASE)
 * - Also checks NEXT_PUBLIC_ variants for client-side usage
 * - Returns string | undefined (do not crash build)
 */
const toSnake = (s: string) =>
  s.replace(/[A-Z]/g, (m) => `_${m}`).toUpperCase().replace(/^_/, "");

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

export function getEnv(key: string): string | undefined {
  const snake = toSnake(key);
  const candidates = uniq([
    key,
    snake,
    `NEXT_PUBLIC_${snake}`,
    // sometimes projects keep both forms around:
    key.toUpperCase(),
    `NEXT_PUBLIC_${key.toUpperCase()}`,
  ]);

  for (const k of candidates) {
    const v = (process.env as Record<string, string | undefined>)[k];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return undefined;
}

export function getEnvOr(key: string, fallback: string): string {
  return getEnv(key) ?? fallback;
}
