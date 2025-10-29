"use client";

import env from "@/config/env";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";

export default function VerifyPage() {
  const { dictionary } = useLanguage();

  return (
    <div className="space-y-8">
      <PageTitle title={dictionary.verify.title} subtitle={dictionary.verify.subtitle} />

      <Card className="bg-white/80 text-center">
        <a
          href={env.guildLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full max-w-xs justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600"
        >
          {dictionary.verify.guildCta}
        </a>
        <p className="mt-3 text-xs text-slate-500">{dictionary.verify.helper}</p>
      </Card>

      <Card className="bg-white/80">
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={env.tgPublic}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-sky-200 bg-sky-50/80 px-4 py-3 text-center text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
          >
            {dictionary.verify.public}
          </a>
          <a
            href={env.tgVerified}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            {dictionary.verify.verified}
          </a>
        </div>
      </Card>
    </div>
  );
}
