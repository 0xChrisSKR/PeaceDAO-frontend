import local from "./addresses.local.json";

const env = (k: string) => (typeof process !== "undefined" ? (process.env as any)[k] : undefined);

const CHAIN_ID = Number(env("NEXT_PUBLIC_CHAIN_ID") ?? 0);
const fromLocal = (key: "DONATION_ADDRESS"|"TREASURY_ADDRESS"|"GOVERNANCE_ADDRESS") =>
  (local as any)?.[String(CHAIN_ID)]?.[key] ?? "";

export const CONTRACTS = {
  CHAIN_ID,
  RPC_HTTP: env("NEXT_PUBLIC_RPC_HTTP") ?? "",
  DONATION_ADDRESS: env("NEXT_PUBLIC_DONATION_ADDRESS") ?? fromLocal("DONATION_ADDRESS"),
  TREASURY_ADDRESS: env("NEXT_PUBLIC_TREASURY_ADDRESS") ?? fromLocal("TREASURY_ADDRESS"),
  GOVERNANCE_ADDRESS: env("NEXT_PUBLIC_GOVERNANCE_ADDRESS") ?? fromLocal("GOVERNANCE_ADDRESS"),
};
