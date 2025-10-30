import { NextResponse } from "next/server";
import { isAddress } from "viem";
import env from "@/config/env";
import { getTokenList } from "@/config/tokenlist";
import { resolvePeaceFundAddress } from "@/lib/peaceFund";

function isValidAddress(value?: string) {
  return Boolean(value && value.startsWith("0x") && value.length === 42 && isAddress(value));
}

export async function GET() {
  const tokenList = getTokenList();
  const resolution = await resolvePeaceFundAddress();
  const peaceFundConfigured = isValidAddress(resolution.address);
  const peaceSwapRouterConfigured = isValidAddress(env.peaceSwapRouter);
  return NextResponse.json({
    ok: true,
    chain: "bsc",
    peaceFund: peaceFundConfigured,
    peaceFundSource: resolution.source ?? null,
    peaceSwapRouter: peaceSwapRouterConfigured,
    tokenListVersion: tokenList.version,
    tokens: tokenList.tokens.length,
    placeholders: tokenList.metadata,
    time: Date.now()
  });
}
