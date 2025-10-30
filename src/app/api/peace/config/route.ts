import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const allow = (k: string) => k.startsWith('NEXT_PUBLIC_');
  const env = Object.fromEntries(
    Object.entries(process.env)
      .filter(([k]) => allow(k))
      .map(([k, v]) => [k, String(v ?? '')])
  );

  return NextResponse.json({
    ok: true,
    timestamp: Date.now(),
    env,
    docs: {
      readme: 'Set NEXT_PUBLIC_* in Vercel Project → Settings → Environment Variables',
      chains: 'NEXT_PUBLIC_CHAIN_ID + NEXT_PUBLIC_RPC_HTTP',
      addresses: 'NEXT_PUBLIC_DONATION_ADDRESS / NEXT_PUBLIC_TREASURY_ADDRESS / NEXT_PUBLIC_GOVERNANCE_ADDRESS',
    },
  });
}
