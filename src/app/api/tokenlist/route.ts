import { NextResponse } from "next/server";
import { getTokenList } from "@/config/tokenlist";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export function GET() {
  const tokenList = getTokenList();
  return NextResponse.json({
    ...tokenList,
    timestamp: new Date().toISOString()
  });
}
