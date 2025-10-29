"use client";

import { useTranslation } from "next-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/60 py-6 text-center text-sm text-slate-400">
      {t("footer.credit")}
    </footer>
  );
}
