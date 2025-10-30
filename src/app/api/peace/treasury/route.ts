import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  return NextResponse.json({
    page: 'treasury',
    address: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || '',
    note: 'Replace ABI & wire actions later',
  });
}
