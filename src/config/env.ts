const env = {
  wcProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  rpcBsc: process.env.NEXT_PUBLIC_RPC_BSC ?? "https://bsc-dataseed.binance.org",
  rpcBscTest: process.env.NEXT_PUBLIC_RPC_BSC_TEST ?? "https://data-seed-prebsc-1-s1.binance.org:8545",
  peaceToken: process.env.NEXT_PUBLIC_TOKEN ?? "",
  peaceFund: process.env.NEXT_PUBLIC_PEACE_FUND ?? "",
  peaceSwapRouter: process.env.NEXT_PUBLIC_PEACE_SWAP_ROUTER ?? "",
  wbnbMainnet: process.env.NEXT_PUBLIC_WBNB_MAIN ?? "",
  wbnbTestnet: process.env.NEXT_PUBLIC_WBNB_TEST ?? "",
  underlyingRouterMainnet: process.env.NEXT_PUBLIC_UNDERLYING_ROUTER_MAIN ?? "",
  underlyingRouterTestnet: process.env.NEXT_PUBLIC_UNDERLYING_ROUTER_TEST ?? "",
  donateMethod: process.env.NEXT_PUBLIC_DONATE_METHOD ?? "donate",
  swapFeeBps: Number(process.env.NEXT_PUBLIC_SWAP_FEE_BPS ?? "50"),
  defaultDeadlineSecs: Number(process.env.NEXT_PUBLIC_DEADLINE_SECS ?? "900"),
  defaultSlippageBps: Number(process.env.NEXT_PUBLIC_DEFAULT_SLIPPAGE_BPS ?? "50"),
  tgPublic: process.env.NEXT_PUBLIC_TG_PUBLIC ?? "",
  tgVerified: process.env.NEXT_PUBLIC_TG_VERIFIED ?? "",
  guildLink: process.env.NEXT_PUBLIC_GUILD_LINK ?? "",
  defaultNetwork: (process.env.NEXT_PUBLIC_DEFAULT_NETWORK ?? "bsctest").toLowerCase()
};

export default env;
