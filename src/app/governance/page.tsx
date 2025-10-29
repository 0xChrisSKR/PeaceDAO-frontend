"use client";

import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";

const WHITEPAPER_URL = "https://github.com/PeaceDAO/PeaceDAO-frontend/blob/main/docs/WHITEPAPER.md";
const FRONTEND_REPO = "https://github.com/PeaceDAO/PeaceDAO-frontend";
const CONTRACTS_REPO = "https://github.com/PeaceDAO/PeaceDAO-contracts";

export default function GovernancePage() {
  const { dictionary } = useLanguage();

  return (
    <div className="space-y-8">
      <PageTitle title={dictionary.governance.title} subtitle={dictionary.governance.subtitle} />

      <Card className="bg-white/80">
        <h2 className="text-lg font-semibold text-slate-800">{dictionary.governance.thresholdsTitle}</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-emerald-700">
            {dictionary.governance.chat}
          </li>
          <li className="rounded-2xl border border-sky-200 bg-sky-50/70 px-4 py-3 text-sky-700">
            {dictionary.governance.vote}
          </li>
          <li className="rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-amber-700">
            {dictionary.governance.propose}
          </li>
        </ul>
      </Card>

      <Card className="bg-white/80">
        <h2 className="text-lg font-semibold text-slate-800">{dictionary.governance.resourcesTitle}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a
            href={WHITEPAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            {dictionary.governance.whitepaper}
          </a>
          <a
            href={FRONTEND_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {dictionary.governance.frontendRepo}
          </a>
          <a
            href={CONTRACTS_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {dictionary.governance.contractsRepo}
          </a>
        </div>
      </Card>
    </div>
  );
}
