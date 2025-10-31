export type SupportedNetwork = "bsc" | "bsctest";

const pick = (k: string, d = "") => process.env[k] ?? d;

export const ENV = {
  NETWORK: (pick("NEXT_PUBLIC_NETWORK", "bsctest") as SupportedNetwork),
  WC_PROJECT_ID: pick("NEXT_PUBLIC_WC_PROJECT_ID", ""),
  RPC_BSC: pick("NEXT_PUBLIC_RPC_BSC", "https://bsc-dataseed.binance.org"),
  RPC_BSC_TEST: pick("NEXT_PUBLIC_RPC_BSC_TEST","https://data-seed-prebsc-1-s1.binance.org:8545"),
  PEACE_FUND: pick("NEXT_PUBLIC_PEACE_FUND",""),
  TOKEN: pick("NEXT_PUBLIC_TOKEN",""),
  FOUNDER_BSCTEST: pick("NEXT_PUBLIC_FOUNDER_ADDRESS_BSCTEST",""),
  CONFIG_PATH: pick("NEXT_PUBLIC_PEACEDAO_CONFIG_PATH","/config")
} as const;
