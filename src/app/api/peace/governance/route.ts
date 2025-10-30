import { NextResponse } from "next/server";

import { CONTRACTS } from "@/config/contracts";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    page: "governance",
    address: CONTRACTS.GOVERNANCE_ADDRESS,
    note: "Replace ABI & wire actions later",
  });
}
