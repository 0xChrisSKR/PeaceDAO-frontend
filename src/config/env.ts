const isServer = typeof window === "undefined";

const rawPeaceFundHints =
  (isServer ? process.env.PEACE_FUND_HINTS : undefined) ??
  process.env.NEXT_PUBLIC_PEACE_FUND_HINTS ??
  process.env.NEXT_PUBLIC_PEACE_FUND_AUTO ??
  "";

const peaceFundHints = rawPeaceFundHints
  .split(/[\s,\n]+/)
  .map((value) => value.trim())
  .filter((value) => value && value.toLowerCase() !== "auto");

const env = {
  wcProjectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
    process.env.NEXT_PUBLIC_WC_PROJECT_ID ??
    process.env.NEXT_PUBLIC_PROJECT_ID ??
    "",
  rpcBsc:
    process.env.NEXT_PUBLIC_RPC_BSC ??
    process.env.NEXT_PUBLIC_RPC_URL ??
    "https://bsc-dataseed.binance.org",
  peaceFund:
    process.env.NEXT_PUBLIC_PEACE_FUND ??
    process.env.NEXT_PUBLIC_PEACEFUND ??
    process.env.NEXT_PUBLIC_CONTRACT_PEACEFUND ??
    process.env.NEXT_PUBLIC_TREASURY ??
    "",
  peaceSwapRouter:
    process.env.NEXT_PUBLIC_PEACE_SWAP_ROUTER ??
    process.env.NEXT_PUBLIC_ROUTER ??
    process.env.NEXT_PUBLIC_ROUTER_ADDRESS ??
    "",
  peaceToken:
    process.env.NEXT_PUBLIC_TOKEN ??
    process.env.NEXT_PUBLIC_PEACE_TOKEN ??
    "0x4444def5cf226bf50aa4b45e5748b676945bc509",
  guildLink: process.env.NEXT_PUBLIC_GUILD_LINK ?? "https://guild.xyz/world-peace-dao",
  tgPublic: process.env.NEXT_PUBLIC_TG_PUBLIC ?? "https://t.me/WorldPeace_BNB",
  tgPrivate:
    process.env.NEXT_PUBLIC_TG_PRIVATE ??
    process.env.NEXT_PUBLIC_TG_VERIFIED ??
    "https://t.me/+i-dpunM-luk1ZjRl",
  tgVerified: process.env.NEXT_PUBLIC_TG_VERIFIED ?? "https://t.me/+i-dpunM-luk1ZjRl",
  twitter: process.env.NEXT_PUBLIC_TWITTER ?? "https://x.com/WorldPeace_BNB",
  governanceApi:
    process.env.NEXT_PUBLIC_GOVERNANCE_API ??
    process.env.NEXT_PUBLIC_PEACEDAO_DEMO_API ??
    process.env.NEXT_PUBLIC_DEMO_API ??
    "",
  demoApiBase:
    ((isServer ? process.env.PEACEDAO_DEMO_API : undefined) ??
      process.env.NEXT_PUBLIC_PEACEDAO_DEMO_API ??
      process.env.NEXT_PUBLIC_GOVERNANCE_API ??
      "").replace(/\/$/, ""),
  demoConfigPath:
    (isServer ? process.env.PEACEDAO_CONFIG_PATH : undefined) ??
    process.env.NEXT_PUBLIC_PEACEDAO_CONFIG_PATH ??
    process.env.NEXT_PUBLIC_GOVERNANCE_CONFIG_PATH ??
    "/config",
  peaceFundHints,
  governanceApiKey: isServer ? process.env.PEACEDAO_DEMO_API_KEY ?? process.env.GOVERNANCE_API_KEY ?? "" : "",
  governanceApiKeyHeader: isServer
    ? process.env.PEACEDAO_DEMO_API_KEY_HEADER ?? "x-api-key"
    : "x-api-key"
};

export default env;
