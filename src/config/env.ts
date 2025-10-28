const env = {
  wcProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  defaultNetwork: (process.env.NEXT_PUBLIC_DEFAULT_NETWORK ?? "bsctest").toLowerCase(),
  rpcBsc: process.env.NEXT_PUBLIC_RPC_BSC ?? "",
  rpcBscTest: process.env.NEXT_PUBLIC_RPC_BSC_TEST ?? "",
  peaceFund: process.env.NEXT_PUBLIC_PEACE_FUND ?? "",
  peaceSwapRouter: process.env.NEXT_PUBLIC_PEACE_SWAP_ROUTER ?? "",
  peaceToken: process.env.NEXT_PUBLIC_TOKEN ?? "",
  tokenInMainnet: process.env.NEXT_PUBLIC_TOKEN_IN ?? "",
  tokenOutMainnet: process.env.NEXT_PUBLIC_TOKEN_OUT ?? "",
  tokenInTestnet: process.env.NEXT_PUBLIC_TOKEN_IN_TEST ?? "",
  tokenOutTestnet: process.env.NEXT_PUBLIC_TOKEN_OUT_TEST ?? "",
  donateMethod: process.env.NEXT_PUBLIC_DONATE_METHOD ?? "donate",
  swapFeeBps: Number(process.env.NEXT_PUBLIC_SWAP_FEE_BPS ?? "50"),
  defaultDeadlineSecs: Number(process.env.NEXT_PUBLIC_DEADLINE_SECS ?? "900"),
  defaultSlippageBps: Number(process.env.NEXT_PUBLIC_DEFAULT_SLIPPAGE_BPS ?? "50"),
  tgPublic: process.env.NEXT_PUBLIC_TG_PUBLIC ?? "",
  tgVerified: process.env.NEXT_PUBLIC_TG_VERIFIED ?? ""
};

export default env;
