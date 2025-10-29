import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    ok: true,
    ts: Date.now(),
    env: {
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
      token: Boolean(process.env.NEXT_PUBLIC_TOKEN_ADDRESS),
      fund: Boolean(process.env.NEXT_PUBLIC_PEACE_FUND),
      validator: Boolean(process.env.NEXT_PUBLIC_PEACE_VALIDATOR)
    }
  });
}
