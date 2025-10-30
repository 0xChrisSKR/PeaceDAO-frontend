/**
 * Frontend-safe env accessor: Next 會把 NEXT_PUBLIC_* 值在編譯期注入字面量，
 * 因此在瀏覽器端使用是安全的，不會觸發 "process is not defined"。
 */
export const ENV = {
  CHAIN_ID: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? '56'),
  RPC_HTTP: process.env.NEXT_PUBLIC_RPC_HTTP || '',
  DONATION_ADDRESS: process.env.NEXT_PUBLIC_DONATION_ADDRESS || '',
  TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || '',
  GOVERNANCE_ADDRESS: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || '',
} as const;
