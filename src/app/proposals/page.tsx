"use client";

import { useTranslation } from "next-i18next";

export default function ProposalsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">{t("governance.title")}</h1>
      <p className="text-sm text-slate-300">{t("governance.description")}</p>
    </div>
  );
}
