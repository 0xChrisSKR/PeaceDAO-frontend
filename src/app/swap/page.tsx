import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { SwapCard } from "@/components/SwapCard";
import env from "@/config/env";
import tokenListData from "@/data/tokenlist.json";
import type { TokenInfo, TokenList } from "@/types/token";

const tokenList = tokenListData as TokenList;

export const metadata: Metadata = {
  title: "Swap Tokens for World Peace 🌍"
};

function resolveDefaultTokens(tokens: TokenInfo[]): {
  fromToken: TokenInfo | null;
  toToken: TokenInfo | null;
} {
  if (tokens.length === 0) {
    return { fromToken: null, toToken: null };
  }

  const fromToken = tokens.find((token) => token.isNative) ?? tokens[0];
  const peaceAddress = env.peaceTokenAddress.toLowerCase();
  const toToken =
    tokens.find((token) => token.address.toLowerCase() === peaceAddress) ??
    tokens.find((token) => token.address !== fromToken.address) ??
    fromToken;

  return { fromToken, toToken };
}

export default function SwapPage() {
  const tokens = (tokenList.tokens ?? []).filter((token) => token.chainId === env.chainId);
  const { fromToken, toToken } = resolveDefaultTokens(tokens);

  return (
    <div className="space-y-6 pb-10">
      <PageTitle
        title="Swap Tokens for World Peace 🌍"
        subtitle="Trade into the 世界和平 token or rebalance your Peace DAO portfolio with a friendly swapping experience."
      />
      {fromToken && toToken ? (
        <SwapCard tokens={tokens} defaultFromToken={fromToken} defaultToToken={toToken} />
      ) : (
        <div className="rounded-3xl border border-dashed border-emerald-200 bg-white/60 p-6 text-sm text-slate-600">
          No tokens are configured for chain ID {env.chainId}. Update your token list to enable swaps.
        </div>
      )}
    </div>
  );
}
