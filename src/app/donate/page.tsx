"use client";

import TopNav from "@/components/TopNav";
import { useEffect, useState } from "react";

export default function Page() {
  const [addr, setAddr] = useState<string>("");
  useEffect(() => {
    fetch("/api/demo/donate")
      .then((r) => r.json())
      .then((d) => setAddr(d?.address || ""));
  }, []);
  return (
    <main className="min-h-screen text-white">
      <TopNav />
      <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-semibold">Donate</h1>
        <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-900/50">
          <div className="text-sm text-neutral-400 mb-1">WorldPeace Fund Address</div>
          <div className="font-mono break-all">{addr || "…"}</div>
          <button disabled className="mt-3 px-3 py-2 rounded bg-neutral-700 text-neutral-300 text-sm">
            Copy (disabled)
          </button>
        </div>
      </div>
    </main>
  );
}
