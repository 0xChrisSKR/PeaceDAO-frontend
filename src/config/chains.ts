import { env } from "@/config/env";

const rpcUrl = env.rpcBsc || "https://bsc-dataseed.binance.org";

export const bsc = {
  id: 56,
  name: "BNB Smart Chain",
  network: "bsc",
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
};
