import { env } from "@/config/env";

const DEFAULT_BSC_RPC = "https://bsc-dataseed.binance.org";
const rpcUrl = env.rpcBsc || DEFAULT_BSC_RPC;

export const bsc = {
  id: 56,
  name: "BNB Smart Chain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: {
    default: { http: [rpcUrl] },
    public: { http: [rpcUrl] }
  }
} as const;

export const CHAINS = [bsc] as const;
export const DEFAULT_CHAIN = bsc;

export const transports = {
  [bsc.id]: rpcUrl
} as const;
