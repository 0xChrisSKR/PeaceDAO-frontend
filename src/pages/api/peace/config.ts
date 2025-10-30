import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 56),
    rpc: process.env.NEXT_PUBLIC_RPC_HTTP || null,
    donation: process.env.NEXT_PUBLIC_DONATION_ADDRESS || null,
    treasury: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || null,
    governance: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || null,
  });
}
