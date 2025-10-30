import { NextResponse } from "next/server";

export async function GET() {
  const cfg = {
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 56),
    rpcHttp: process.env.NEXT_PUBLIC_RPC_HTTP || "",
    donationAddress: process.env.NEXT_PUBLIC_DONATION_ADDRESS || "",
    treasuryAddress: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || "",
    governanceAddress: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || "",
  };
  return NextResponse.json(cfg, { headers: { "Cache-Control": "no-store" }});
}
