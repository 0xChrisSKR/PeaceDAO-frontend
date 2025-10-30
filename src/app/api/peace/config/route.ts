import { NextResponse } from "next/server";

import { CONTRACTS } from "@/config/contracts";
import { ENV } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const out = {
    ok: true,
    CHAIN_ID: ENV.CHAIN_ID,
    RPC_HTTP: ENV.RPC_HTTP,
    DONATION_ADDRESS: CONTRACTS.DONATION_ADDRESS,
    TREASURY_ADDRESS: CONTRACTS.TREASURY_ADDRESS,
    GOVERNANCE_ADDRESS: CONTRACTS.GOVERNANCE_ADDRESS,
  };
  return NextResponse.json(out);
}
