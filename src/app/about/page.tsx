"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import env from "@/config/env";

const WHITEPAPER_URL = "https://github.com/PeaceDAO/PeaceDAO-frontend/blob/main/docs/WHITEPAPER.md";

export default function AboutPage() {
  const { dictionary } = useLanguage();

  return (
    <div className="space-y-8">
      <PageTitle title={dictionary.about.title} subtitle={dictionary.about.subtitle} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/80">
          <h2 className="text-xl font-semibold text-slate-900">{dictionary.about.missionTitle}</h2>
          <p className="mt-3 text-sm text-slate-600">{dictionary.about.missionBody}</p>
        </Card>
        <Card className="bg-white/80">
          <h2 className="text-xl font-semibold text-slate-900">{dictionary.about.fundTitle}</h2>
          <p className="mt-3 text-sm text-slate-600">{dictionary.about.fundBody}</p>
          <div className="mt-4 text-xs text-slate-500">
            <p>
              {dictionary.about.tokenLabel}: {env.peaceToken}
            </p>
            <p className="mt-1">
              {dictionary.about.twitterLabel}: {env.twitter}
            </p>
          </div>
        </Card>
      </div>

      <Card className="bg-white/80">
        <Link
          href={WHITEPAPER_URL}
          className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600"
        >
          {dictionary.about.docsCta}
        </Link>
      </Card>
    </div>
  );
}
