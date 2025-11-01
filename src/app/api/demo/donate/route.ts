import { NextResponse } from "next/server";
import { getEnv } from "@/lib/getEnv";

// 假資料／預設：沒有設定就回示意位址，讓 UI 能跑
export async function GET() {
  const address =
    getEnv("PEACE_FUND") ||
    getEnv("DONATE_ADDRESS") ||
    "0x000000000000000000000000000000000000dEaD";
  return NextResponse.json({ address });
}

