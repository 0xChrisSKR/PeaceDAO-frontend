import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    address: "0xPEACE0000000000000000000000000000HELP",
  });
}
