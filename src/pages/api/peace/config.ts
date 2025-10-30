import type { NextApiRequest, NextApiResponse } from "next";

import { CONTRACTS } from "@/config/contracts";
import { ENV } from "@/lib/env";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    chainId: ENV.CHAIN_ID,
    rpc: ENV.RPC_HTTP || null,
    donation: CONTRACTS.DONATION_ADDRESS || null,
    treasury: CONTRACTS.TREASURY_ADDRESS || null,
    governance: CONTRACTS.GOVERNANCE_ADDRESS || null,
  });
}
