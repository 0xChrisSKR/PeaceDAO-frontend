// src/config/env.ts
const env = {
  NETWORK: process.env.NEXT_PUBLIC_NETWORK ?? "bsctest",
  WC_PROJECT_ID: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  RPC_BSC: process.env.NEXT_PUBLIC_RPC_BSC ?? "",
  RPC_BSC_TEST: process.env.NEXT_PUBLIC_RPC_BSC_TEST ?? "",
  PEACE_FUND: process.env.NEXT_PUBLIC_PEACE_FUND ?? "",
  TOKEN: process.env.NEXT_PUBLIC_TOKEN ?? "",
  FOUNDER_BSCTEST: process.env.NEXT_PUBLIC_FOUNDER_BSCTEST ?? "",
  CONFIG_PATH: "/config",
} as const;

export type Env = typeof env;
export default env;
