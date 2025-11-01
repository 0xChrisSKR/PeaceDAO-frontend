// src/lib/peaceFund.ts
import { isAddress } from "viem";

export async function resolvePeaceFundAddress(): Promise<{ address: string; source: string }> {
  const direct = process.env.NEXT_PUBLIC_PEACE_FUND?.trim();
  if (direct && isAddress(direct)) {
    return { address: direct, source: "env:NEXT_PUBLIC_PEACE_FUND" };
  }

  // fallback：可再加 API 查詢（暫時返回空值避免 build fail）
  return { address: "0x0000000000000000000000000000000000000000", source: "auto" };
}
