function resolveChainId() {
  const value = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!value) return 56;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 56;
  return parsed;
}

const env = {
  wcProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  rpcBsc: process.env.NEXT_PUBLIC_RPC_BSC ?? "https://bsc-dataseed.binance.org",
  chainId: resolveChainId(),
  peaceFund:
    process.env.NEXT_PUBLIC_TREASURY_ADDRESS ??
    process.env.NEXT_PUBLIC_PEACE_FUND ??
    "",
  treasury:
    process.env.NEXT_PUBLIC_TREASURY_ADDRESS ??
    process.env.NEXT_PUBLIC_PEACE_FUND ??
    "",
  governance: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS ?? "",
  peaceSwapRouter: process.env.NEXT_PUBLIC_PEACE_SWAP_ROUTER ?? "",
  peaceToken:
    process.env.NEXT_PUBLIC_TOKEN_ADDRESS ??
    process.env.NEXT_PUBLIC_TOKEN ??
    "0x4444def5cf226bf50aa4b45e5748b676945bc509",
  guildLink: process.env.NEXT_PUBLIC_GUILD_LINK ?? "https://guild.xyz/world-peace-dao",
  tgPublic: process.env.NEXT_PUBLIC_TG_PUBLIC ?? "https://t.me/WorldPeace_BNB",
  tgVerified: process.env.NEXT_PUBLIC_TG_VERIFIED ?? "https://t.me/+i-dpunM-luk1ZjRl",
  twitter: process.env.NEXT_PUBLIC_TWITTER ?? "https://x.com/WorldPeace_BNB"
};

export default env;
