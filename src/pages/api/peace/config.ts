import type { NextApiRequest, NextApiResponse } from "next";
import CONTRACTS from "@/config/contracts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    ok: true,
    chainId: CONTRACTS.CHAIN_ID,
    rpc: !!CONTRACTS.RPC_HTTP,
    contracts: {
      donation: CONTRACTS.DONATION_ADDRESS,
      treasury: CONTRACTS.TREASURY_ADDRESS,
      governance: CONTRACTS.GOVERNANCE_ADDRESS,
    },
    env: {
      NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || "",
      NEXT_PUBLIC_RPC_HTTP: !!process.env.NEXT_PUBLIC_RPC_HTTP,
      NEXT_PUBLIC_DONATION_ADDRESS: process.env.NEXT_PUBLIC_DONATION_ADDRESS || "",
      NEXT_PUBLIC_TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || "",
      NEXT_PUBLIC_GOVERNANCE_ADDRESS:
        process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || "",
    },
  });
}
