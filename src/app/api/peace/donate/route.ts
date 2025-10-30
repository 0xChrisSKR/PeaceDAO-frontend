import { NextResponse } from "next/server";

import { CONTRACTS } from "@/config/contracts";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    page: "donate",
    address: CONTRACTS.DONATION_ADDRESS,
    note: "Replace ABI & wire actions later",
  });
}
