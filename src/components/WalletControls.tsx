"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function WalletControls() {
  const { dictionary } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((value) => !value);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm transition hover:bg-white"
      >
        {dictionary.wallet.connect}
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-600 shadow-xl">
          <p className="mb-2 font-semibold text-slate-700">{dictionary.wallet.unavailable}</p>
          <p className="text-xs leading-relaxed text-slate-500">
            Wallet connectivity has been disabled in this build. Please reach out to the team if you need blockchain features.
          </p>
        </div>
      ) : null}
    </div>
  );
}
