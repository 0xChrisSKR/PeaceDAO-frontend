/**
 * Frontend-safe env accessor: Next 會把 NEXT_PUBLIC_* 值在編譯期注入字面量，
 * 因此在瀏覽器端使用是安全的，不會觸發 "process is not defined"。
 */
import { CONTRACTS } from "@/config/contracts";

export const ENV = {
  CHAIN_ID: CONTRACTS.CHAIN_ID,
  RPC_HTTP: CONTRACTS.RPC_HTTP,
  DONATION_ADDRESS: CONTRACTS.DONATION_ADDRESS,
  TREASURY_ADDRESS: CONTRACTS.TREASURY_ADDRESS,
  GOVERNANCE_ADDRESS: CONTRACTS.GOVERNANCE_ADDRESS,
} as const;
