"use client";

import clsx from "clsx";
import { useCallback } from "react";
import { useTranslation } from "next-i18next";

import { LOCALES } from "../../i18n";
import { useLocale } from "@/providers/I18nProvider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (nextLocale: (typeof LOCALES)[number]) => () => {
      setLocale(nextLocale);
    },
    [setLocale]
  );

  return (
    <div className="flex items-center gap-2 text-xs uppercase text-slate-300">
      <span className="sr-only">{t("language.switcherLabel")}</span>
      <div className="inline-flex rounded-full border border-slate-700 bg-slate-900 p-1">
        {LOCALES.map((code) => (
          <button
            key={code}
            type="button"
            onClick={handleChange(code)}
            className={clsx(
              "rounded-full px-2 py-1 font-semibold transition",
              locale === code ? "bg-brand text-white" : "text-slate-300 hover:text-white"
            )}
          >
            {code === "en" ? t("language.english") : t("language.chinese")}
          </button>
        ))}
      </div>
    </div>
  );
}
