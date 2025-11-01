"use client";

import TopNav from "@/components/TopNav";
import { useState } from "react";

export default function Page() {
  const [from, setFrom] = useState("USDT");
  const [to, setTo] = useState("BTC");
  return (
    <main className="min-h-screen text-white">
      <TopNav />
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-semibold">Swap (Demo)</h1>
        <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-900/50 space-y-3">
          <div>
            <div className="text-xs text-neutral-400 mb-1">From</div>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm"
            >
              <option>USDT</option>
              <option>ETH</option>
              <option>SOL</option>
            </select>
            <input
              placeholder="Amount"
              className="mt-2 w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm"
            />
          </div>
          <div>
            <div className="text-xs text-neutral-400 mb-1">To</div>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm"
            >
              <option>BTC</option>
              <option>USDT</option>
              <option>SOL</option>
            </select>
            <input
              placeholder="Estimated"
              className="mt-2 w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm"
              disabled
            />
          </div>
          <div className="text-xs text-neutral-400">Fee (mock): 0.10%</div>
          <button disabled className="w-full px-3 py-2 rounded bg-neutral-700 text-neutral-300">
            Swap (disabled in demo)
          </button>
        </div>
      </div>
    </main>
  );
}
