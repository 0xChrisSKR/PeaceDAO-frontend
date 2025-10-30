import ADDRS from "./addresses.local";

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 0) || 0;

type ChainMap = Record<number, { DONATION: string; TREASURY: string; GOVERNANCE: string }>;

const fallback = (ADDRS as unknown as ChainMap)[CHAIN_ID] || {
  DONATION: "",
  TREASURY: "",
  GOVERNANCE: "",
};

export const CONTRACTS = {
  CHAIN_ID,
  RPC_HTTP: process.env.NEXT_PUBLIC_RPC_HTTP || "",
  DONATION_ADDRESS: process.env.NEXT_PUBLIC_DONATION_ADDRESS || fallback.DONATION || "",
  TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || fallback.TREASURY || "",
  GOVERNANCE_ADDRESS: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || fallback.GOVERNANCE || "",
} as const;

export default CONTRACTS;
