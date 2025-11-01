"use client";

import TopNav from "@/components/TopNav";
import { useState } from "react";

export default function Page() {
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  return (
    <main className="min-h-screen text-white">
      <TopNav />
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-lg border border-neutral-800 p-4 bg-neutral-900/40 min-h-[360px]">
          <div className="text-sm text-neutral-400 mb-2">K-Line (placeholder)</div>
          <div className="h-[300px] rounded bg-neutral-900 border border-neutral-800 grid place-items-center">
            <div className="text-neutral-500 text-sm">Chart area (mock)</div>
          </div>
        </div>
        <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-900/40">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setSide("BUY")}
              className={`px-3 py-1.5 rounded text-sm ${side === "BUY" ? "bg-green-500 text-black" : "bg-neutral-800"}`}
            >
              Buy
            </button>
            <button
              onClick={() => setSide("SELL")}
              className={`px-3 py-1.5 rounded text-sm ${side === "SELL" ? "bg-red-500 text-black" : "bg-neutral-800"}`}
            >
              Sell
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-neutral-400 mb-1">Order Type</div>
              <select className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm">
                <option>Limit</option>
                <option>Market</option>
                <option>Stop</option>
              </select>
            </div>
            <div>
              <div className="text-xs text-neutral-400 mb-1">Price (USDT)</div>
              <input className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm" placeholder="0.00" />
            </div>
            <div>
              <div className="text-xs text-neutral-400 mb-1">Amount (BTC)</div>
              <input className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm" placeholder="0.000" />
            </div>
            <button disabled className="w-full mt-2 px-3 py-2 rounded bg-neutral-700 text-neutral-300">
              Submit (disabled in demo)
            </button>
          </div>
        </div>
        <div className="md:col-span-3 rounded-lg border border-neutral-800 p-4 bg-neutral-900/40">
          <div className="text-sm font-semibold mb-2">Order Book (mock)</div>
          <div className="grid grid-cols-3 gap-3 text-sm text-neutral-300">
            <div className="rounded bg-neutral-900 border border-neutral-800 p-3 text-center">Asks</div>
            <div className="rounded bg-neutral-900 border border-neutral-800 p-3 text-center">Spread</div>
            <div className="rounded bg-neutral-900 border border-neutral-800 p-3 text-center">Bids</div>
          </div>
        </div>
      </div>
    </main>
  );
}
