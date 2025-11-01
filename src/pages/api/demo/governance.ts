import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    proposals: [
      {
        id: "1",
        title: "Allocate 5% treasury to humanitarian grants",
        status: "Active",
        start: Date.now() - 1000 * 60 * 60 * 24,
        end: Date.now() + 1000 * 60 * 60 * 24 * 2,
        forVotes: 623411,
        againstVotes: 21450,
        abstainVotes: 5120,
      },
      {
        id: "2",
        title: "List PeaceToken on additional partner exchanges",
        status: "Pending",
        start: Date.now() + 1000 * 60 * 60 * 6,
        end: Date.now() + 1000 * 60 * 60 * 24 * 3,
        forVotes: 0,
        againstVotes: 0,
        abstainVotes: 0,
      },
      {
        id: "3",
        title: "Adopt regenerative finance research initiative",
        status: "Executed",
        start: Date.now() - 1000 * 60 * 60 * 24 * 10,
        end: Date.now() - 1000 * 60 * 60 * 24 * 7,
        forVotes: 712340,
        againstVotes: 11234,
        abstainVotes: 4312,
      },
    ],
  });
}
