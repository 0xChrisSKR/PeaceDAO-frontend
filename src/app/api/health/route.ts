import { NextResponse } from "next/server";
import { isAddress } from "viem";
import env from "@/config/env";
import { getTokenList } from "@/config/tokenlist";

function isValidAddress(value?: string) {
  return Boolean(value && value.startsWith("0x") && value.length === 42 && isAddress(value));
}

export function GET() {
  const tokenList = getTokenList();
  const peaceFundConfigured = isValidAddress(env.peaceFund);
  const peaceSwapRouterConfigured = isValidAddress(env.peaceSwapRouter);
  return NextResponse.json({
    ok: true,
    chain: "bsc",
    peaceFund: peaceFundConfigured,
    peaceSwapRouter: peaceSwapRouterConfigured,
    tokenListVersion: tokenList.version,
    tokens: tokenList.tokens.length,
    placeholders: tokenList.metadata,
    time: Date.now()
  });
}
