"use client";

import clsx from "clsx";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/locales";

const OPTIONS: Array<{ code: Locale; label: string }> = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" }
];

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 p-1 text-xs text-slate-200">
      {OPTIONS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={clsx(
            "rounded-full px-2 py-1 transition",
            locale === code ? "bg-brand text-white" : "hover:text-white"
          )}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
