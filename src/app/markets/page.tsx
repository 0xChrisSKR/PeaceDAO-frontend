"use client";

import TopNav from "@/components/TopNav";
import { Table } from "@/components/Table";
import { useMemo, useState } from "react";

type M = { pair: string; last: string; change: string; vol: string };
const data: M[] = [
  { pair: "BTC/USDT", last: "67,420.12", change: "+1.23%", vol: "12,340 BTC" },
  { pair: "ETH/USDT", last: "3,245.77", change: "-0.84%", vol: "98,220 ETH" },
  { pair: "SOL/USDT", last: "182.33", change: "+3.94%", vol: "1.2M SOL" },
  { pair: "BNB/USDT", last: "612.88", change: "+0.12%", vol: "88,120 BNB" },
  { pair: "DOGE/USDT", last: "0.1780", change: "+6.10%", vol: "4.8B DOGE" },
];

export default function Page() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const f = data.filter((d) => d.pair.toLowerCase().includes(q.toLowerCase()));
    return f.map((d) => [
      d.pair,
      `$${d.last}`,
      <span className={d.change.startsWith("+") ? "text-green-400" : "text-red-400"}>{d.change}</span>,
      d.vol,
      <button className="px-2 py-1 text-xs rounded bg-neutral-800 text-neutral-200" disabled>
        Trade
      </button>,
    ]);
  }, [q]);

  return (
    <main className="min-h-screen text-white">
      <TopNav />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Markets</h1>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pair…"
            className="px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm"
          />
        </div>
        <Table
          header={["Pair", "Last Price", "24h Change", "24h Volume", ""]}
          rows={rows}
        />
      </div>
    </main>
  );
}
