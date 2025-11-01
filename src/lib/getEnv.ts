export type Env = Record<string, string | undefined>;
const cache: Env = {};
const keys = [
  "PEACE_FUND","NEXT_PUBLIC_PEACE_FUND","peaceFund",
  "DEMO_API_BASE","NEXT_PUBLIC_DEMO_API_BASE","demoApiBase",
  "NEXT_PUBLIC_DOCS_URL",
  "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID",
  "NEXT_PUBLIC_CHAIN_ID",
  "NEXT_PUBLIC_RPC_URL",
];
function readRaw(key: string) {
  if (typeof process !== "undefined" && process.env) return process.env[key];
  // @ts-ignore
  if (typeof window !== "undefined") return (window as any).__ENV__?.[key];
  return undefined;
}
export function getEnv(key: string): string | undefined {
  if (cache[key] !== undefined) return cache[key];
  const candidates = new Set<string>([
    key,
    key.toUpperCase(),
    key.toLowerCase(),
    key.startsWith("NEXT_PUBLIC_") ? key.replace("NEXT_PUBLIC_","") : `NEXT_PUBLIC_${key}`,
  ]);
  for (const k of candidates) {
    const v = readRaw(k);
    if (v !== undefined && v !== "") { cache[key] = String(v); return cache[key]; }
  }
  return undefined;
}
export function envSnapshot() {
  const o: Record<string,string|undefined> = {};
  keys.forEach(k => o[k] = getEnv(k));
  return o;
}
