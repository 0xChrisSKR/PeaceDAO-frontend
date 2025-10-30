import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  const out = {
    ok: true,
    CHAIN_ID: Number(process.env.NEXT_PUBLIC_CHAIN_ID || '56'),
    RPC_HTTP: process.env.NEXT_PUBLIC_RPC_HTTP || '',
    DONATION_ADDRESS: process.env.NEXT_PUBLIC_DONATION_ADDRESS || '',
    TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || '',
    GOVERNANCE_ADDRESS: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || '',
  };
  return NextResponse.json(out);
}
