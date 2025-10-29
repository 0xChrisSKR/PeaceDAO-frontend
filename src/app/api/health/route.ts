import { NextResponse } from "next/server";
import env from "@/config/env";

export function GET() {
  return NextResponse.json({
    ok: true,
    chain: "bsc",
    peaceFund: Boolean(env.peaceFund),
    time: Date.now()
  });
}
