"use client";

import TopNav from "@/components/TopNav";
import { useState } from "react";

export default function Page() {
  const [theme, setTheme] = useState("Dark");
  const [lang, setLang] = useState("中文 / English");
  return (
    <main className="min-h-screen text-white">
      <TopNav />
      <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-900/50 space-y-4">
          <div>
            <div className="text-xs text-neutral-400 mb-1">Theme</div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm"
            >
              <option>Dark</option>
              <option>Light</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <div className="text-xs text-neutral-400 mb-1">Language</div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm"
            >
              <option>中文 / English</option>
              <option>English</option>
              <option>中文</option>
            </select>
          </div>
          <button disabled className="w-full px-3 py-2 rounded bg-neutral-700 text-neutral-300 text-sm">
            Save (disabled)
          </button>
        </div>
      </div>
    </main>
  );
}
