import { NextResponse } from 'next/server';
export const dynamic = 'force-static';
export async function GET() {
  return NextResponse.json({
    name: 'World Peace DAO',
    chainId: 56,
    rpc: process.env.NEXT_PUBLIC_RPC_BSC ?? '',
    fundAddress: process.env.NEXT_PUBLIC_PEACE_FUND ?? '',
    token: process.env.NEXT_PUBLIC_TOKEN ?? 'WORLDPEACE',
  }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}
