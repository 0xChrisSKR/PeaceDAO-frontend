import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  return NextResponse.json({
    page: 'governance',
    address: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || '',
    note: 'Replace ABI & wire actions later',
  });
}
