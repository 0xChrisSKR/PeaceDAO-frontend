export const WHITEPAPER_URL = process.env.NEXT_PUBLIC_WHITEPAPER_URL ?? "/whitepaper.pdf";

export const env = {
  NETWORK: process.env.NEXT_PUBLIC_NETWORK ?? "bsc",
  WC_PROJECT_ID: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  RPC_BSC: process.env.NEXT_PUBLIC_RPC_BSC ?? "",
  RPC_BSC_TEST: process.env.NEXT_PUBLIC_RPC_BSC_TEST ?? "",
  PEACE_FUND: process.env.NEXT_PUBLIC_PEACE_FUND ?? "",
  TOKEN: process.env.NEXT_PUBLIC_TOKEN ?? "WORLDPEACE",
  FOUNDER_BSCTEST: process.env.NEXT_PUBLIC_FOUNDER_BSCTEST ?? "",
  CONFIG_PATH: "/config" as const,
  wcProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  rpcBsc: process.env.NEXT_PUBLIC_RPC_BSC ?? "",
  rpcBscTest: process.env.NEXT_PUBLIC_RPC_BSC_TEST ?? "",
  peaceFund: process.env.NEXT_PUBLIC_PEACE_FUND ?? "",
  peaceFundHints: (process.env.NEXT_PUBLIC_PEACE_FUND_HINTS ?? "")
    .split(",")
    .map((hint) => hint.trim())
    .filter(Boolean),
  demoApiBase: process.env.NEXT_PUBLIC_DEMO_API_BASE ?? "",
  demoConfigPath: process.env.NEXT_PUBLIC_DEMO_CONFIG_PATH ?? "/config.json",
  governanceApi: process.env.NEXT_PUBLIC_GOVERNANCE_API ?? "",
  governanceApiKey: process.env.NEXT_PUBLIC_GOVERNANCE_API_KEY ?? "",
  governanceApiKeyHeader: process.env.NEXT_PUBLIC_GOVERNANCE_API_KEY_HEADER ?? "",
  peaceSwapRouter: process.env.NEXT_PUBLIC_PEACE_SWAP_ROUTER ?? "",
  peaceToken: process.env.NEXT_PUBLIC_TOKEN ?? "WORLDPEACE",
  twitter: process.env.NEXT_PUBLIC_TWITTER ?? "https://x.com/WorldPeace_DAO"
} as const;
