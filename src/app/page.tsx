"use client";

import Link from "next/link";
import type { Route } from "next";
import env from "@/config/env";
import { VerifiedTGButton } from "@/components/VerifiedTGButton";
import { useT } from "@/lib/useT";

const CTA_CARDS = [
  {
    title: "Donate to PeaceFund",
    description: "Support frontline peacemakers with a direct BNB donation.",
    href: "/donate"
  },
  {
    title: "Swap on PeaceSwap",
    description: "Trade with the PeaceDAO router and fund the movement.",
    href: "/swap"
  },
  {
    title: "Proposals",
    description: "Community-driven decisions (coming soon).",
    href: "/proposals"
  },
  {
    title: "Verify",
    description: "Earn access to gated spaces (coming soon).",
    href: "/verify"
  }
] satisfies Array<{
  title: string;
  description: string;
  href: Route;
}>;

export default function HomePage() {
  const t = useT();

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-brand-dark to-slate-900 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold sm:text-4xl">
          {t("title", "PeaceDAO Operations Console")}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-200">
          {t(
            "subtitle",
            "Connect your wallet to donate BNB, execute swaps, and unlock community access. PeaceDAO routes 90% of donations to beneficiaries while sustaining the movement."
          )}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/donate"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-dark transition hover:bg-slate-100"
          >
            {t("cta_donate", "Donate to PeaceFund")}
          </Link>
          <Link
            href="/swap"
            className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            {t("cta_treasury", "Swap on PeaceSwap")}
          </Link>
          <Link
            href="/verify"
            className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            {t("cta_verify", "Verify (Guild)")}
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {CTA_CARDS.map((card) => (
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
          <h3 className="text-lg font-semibold text-white">Join the global chat</h3>
          <p className="mt-2 text-sm text-slate-300">
            Our public Telegram keeps everyone aligned with the mission.
          </p>
          <a
            href={env.tgPublic || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full justify-center rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light"
          >
            Open Public Telegram
          </a>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white">Unlock verified access</h3>
          <p className="mt-2 text-sm text-slate-300">
            Hold PEACE tokens to enter the verified coordination hub.
          </p>
          <VerifiedTGButton requiredBalance={100} />
        </div>
      </section>
    </div>
  );
}
