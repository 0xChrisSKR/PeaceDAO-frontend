/**
 * Frontend-safe env accessor: Next 會把 NEXT_PUBLIC_* 值在編譯期注入字面量，
 * 因此在瀏覽器端使用是安全的，不會觸發 "process is not defined"。
 */
import { CONTRACTS } from "@/config/contracts";

const chainIdFallback =
  process.env.NEXT_PUBLIC_CHAIN_ID ||
  (typeof window === "undefined" ? process.env.CHAIN_ID : undefined) ||
  "56";

export const ENV = {
  CHAIN_ID: Number(chainIdFallback),
  RPC_HTTP: process.env.NEXT_PUBLIC_RPC_HTTP || "",
  DONATION_ADDRESS: CONTRACTS.DONATION_ADDRESS,
  TREASURY_ADDRESS: CONTRACTS.TREASURY_ADDRESS,
  GOVERNANCE_ADDRESS: CONTRACTS.GOVERNANCE_ADDRESS,
} as const;
