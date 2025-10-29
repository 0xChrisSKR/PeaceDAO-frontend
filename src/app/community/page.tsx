"use client";

import Link from "next/link";
import { useTranslation } from "next-i18next";

import env from "@/config/env";

export default function CommunityPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{t("community.title")}</h1>
      <p className="text-sm text-slate-300">{t("community.description")}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">{t("community.public.title")}</h2>
          <p className="mt-2 text-sm text-slate-300">{t("community.public.description")}</p>
          <a
            href={env.tgPublic || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full justify-center rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light"
          >
            {t("community.public.action")}
          </a>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">{t("community.verified.title")}</h2>
          <p className="mt-2 text-sm text-slate-300">{t("community.verified.description")}</p>
          <Link
            href="/verify"
            className="mt-4 inline-flex w-full justify-center rounded-lg border border-brand px-4 py-3 text-sm font-semibold text-brand transition hover:bg-brand/20"
          >
            {t("community.verified.action")}
          </Link>
        </div>
      </div>
    </div>
  );
}
