import { NextResponse } from "next/server";
import { ENV } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    ok: true,
    network: ENV.CHAIN_ID,
    rpc: ENV.RPC_HTTP,
    donation: ENV.DONATION_ADDRESS,
    treasury: ENV.TREASURY_ADDRESS,
    governance: ENV.GOVERNANCE_ADDRESS,
    timestamp: Date.now(),
  });
}
