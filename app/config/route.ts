import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const fund = process.env.NEXT_PUBLIC_PEACE_FUND ?? '';
  const rpc = process.env.NEXT_PUBLIC_RPC_BSC ?? '';
  const token = process.env.NEXT_PUBLIC_TOKEN ?? 'WORLDPEACE';
  return NextResponse.json(
    {
      name: 'World Peace DAO',
      chainId: 56,
      rpc,
      fundAddress: fund,
      token,
    },
    { headers: { 'Cache-Control': 'public, max-age=60' } }
  );
}
