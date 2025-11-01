"use client";

import TopNav from "@/components/TopNav";
import { useEffect, useState } from "react";

type P = {
  id: string;
  title: string;
  status: string;
  start: number;
  end: number;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
};

export default function Page() {
  const [list, setList] = useState<P[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/demo/governance")
      .then((r) => r.json())
      .then((d) => setList(d?.proposals || []))
      .finally(() => setLoading(false));
  }, []);
  return (
    <main className="min-h-screen text-white">
      <TopNav />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold">Governance (Demo)</h1>
        {loading ? (
          <div className="text-neutral-400">Loading…</div>
        ) : (
          <div className="grid gap-3">
            {list.map((p) => (
              <div key={p.id} className="rounded-lg border border-neutral-800 p-4 bg-neutral-900/50">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-xs px-2 py-1 rounded bg-neutral-800">{p.status}</div>
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  For {p.forVotes} • Against {p.againstVotes} • Abstain {p.abstainVotes}
                </div>
                <button disabled className="mt-3 px-3 py-1.5 rounded bg-neutral-700 text-neutral-300 text-sm">
                  Vote (disabled)
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
