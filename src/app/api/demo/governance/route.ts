import { NextResponse } from "next/server";

// 治理列表假資料，讓首頁/分頁可以先跑畫面
export async function GET() {
  const now = Date.now();
  return NextResponse.json({
    proposals: [
      {
        id: "prop-001",
        title: "啟動世界和平基金（WorldPeace Fund）",
        status: "Active",
        start: now - 3600_000,
        end: now + 72 * 3600_000,
        forVotes: 123456,
        againstVotes: 2345,
        abstainVotes: 789,
      },
      {
        id: "prop-002",
        title: "將捐贈地址升級為多簽金庫",
        status: "Pending",
        start: now + 24 * 3600_000,
        end: now + 96 * 3600_000,
        forVotes: 0,
        againstVotes: 0,
        abstainVotes: 0,
      },
    ],
  });
}

