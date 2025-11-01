export type Proposal = {
  id: string;
  title: string;
  author: string;
  status: "Active"|"Pending"|"Succeeded"|"Defeated";
  start: string;
  end: string;
  forPct: number;
  againstPct: number;
  abstainPct: number;
  quorumPct: number;
  feeBps?: number; // 手續費治理展示
  content: string;
};

export const proposals: Proposal[] = [
  {
    id: "p-001",
    title: "設定 Swap 手續費為 25 bps，用於 Peace Fund",
    author: "0x9a...cD3",
    status: "Active",
    start: "2025-10-30 10:00",
    end: "2025-11-05 22:00",
    forPct: 62,
    againstPct: 31,
    abstainPct: 7,
    quorumPct: 18,
    feeBps: 25,
    content:
      "提案說明：將平台 Swap 手續費設定為 25 bps（0.25%），收入全數注入 Peace Fund。投票結束後 24 小時內生效。",
  },
  {
    id: "p-002",
    title: "創建 WorldPeace Grants（每月 5,000 USDT）",
    author: "0x12...7F8",
    status: "Pending",
    start: "2025-11-08 12:00",
    end: "2025-11-12 20:00",
    forPct: 0,
    againstPct: 0,
    abstainPct: 0,
    quorumPct: 0,
    content: "提案說明：設立每月 5,000 USDT 的 Grants 用於公共物品。",
  },
  {
    id: "p-003",
    title: "將治理閾值提高到 100k 代幣",
    author: "0x45...AA9",
    status: "Succeeded",
    start: "2025-10-10 09:00",
    end: "2025-10-15 18:00",
    forPct: 71,
    againstPct: 26,
    abstainPct: 3,
    quorumPct: 22,
    content: "提案說明：為避免垃圾提案，提升最小提案持幣門檻至 100k。",
  },
];
