import { env } from "@/config/env";

const DEFAULT_BSC_RPC = "https://bsc-dataseed.binance.org";

export const bsc = {
  id: 56,
  name: "BSC Mainnet",
  network: "bsc",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [env.rpcBsc || DEFAULT_BSC_RPC] },
    public: { http: [env.rpcBsc || DEFAULT_BSC_RPC] },
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://bscscan.com" },
  },
} as const;

export const CHAINS = [bsc] as const;
export const DEFAULT_CHAIN = bsc;
export const RPC_URL = bsc.rpcUrls.default.http[0];
