import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  return NextResponse.json({
    page: 'donate',
    address: process.env.NEXT_PUBLIC_DONATION_ADDRESS || '',
    note: 'Replace ABI & wire actions later',
  });
}
