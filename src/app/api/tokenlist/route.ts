import { NextResponse } from "next/server";
import { getTokenList } from "@/config/tokenlist";

export const revalidate = 300;

export function GET() {
  const tokenList = getTokenList();
  return NextResponse.json({
    ...tokenList,
    timestamp: new Date().toISOString()
  });
}
