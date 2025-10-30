import { NextResponse } from "next/server";
import { resolvePeaceFundAddress } from "@/lib/peaceFund";

export async function GET() {
  const resolution = await resolvePeaceFundAddress();
  return NextResponse.json({
    ok: Boolean(resolution.address),
    address: resolution.address,
    source: resolution.source ?? null
  });
}
