"use client";

import Link from "next/link";
import type { Route } from "next";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";

import env from "@/config/env";
import { VerifiedTGButton } from "@/components/VerifiedTGButton";

export default function HomePage() {
  const { t } = useTranslation();

  const ctaCards = useMemo(() => {
    const cards: Array<{ title: string; description: string; href: Route }> = [
      {
        title: t("home.cta.donate.title"),
        description: t("home.cta.donate.description"),
        href: "/donate"
      },
      {
        title: t("home.cta.swap.title"),
        description: t("home.cta.swap.description"),
        href: "/swap"
      },
      {
        title: t("home.cta.governance.title"),
        description: t("home.cta.governance.description"),
        href: "/proposals"
      },
      {
        title: t("home.cta.verify.title"),
        description: t("home.cta.verify.description"),
        href: "/verify"
      }
    ];
    return cards;
  }, [t]);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-brand-dark to-slate-900 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold sm:text-4xl">{t("home.hero.title")}</h1>
        <p className="mt-3 max-w-2xl text-base text-slate-200">{t("home.hero.subtitle")}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ctaCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-white/10 bg-white/10 p-5 transition hover:border-white/20 hover:bg-white/15"
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-100/80">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white">{t("home.join.title")}</h3>
          <p className="mt-2 text-sm text-slate-300">{t("home.join.description")}</p>
          <a
            href={env.tgPublic || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full justify-center rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light"
          >
            {t("home.join.action")}
          </a>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white">{t("home.unlock.title")}</h3>
          <p className="mt-2 text-sm text-slate-300">{t("home.unlock.description")}</p>
          <VerifiedTGButton requiredBalance={100} />
        </div>
      </section>
    </div>
  );
}
