"use client";
import type { Route } from "next";
import Link from "next/link";
import env from "@/config/env";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { Stat } from "@/components/Stat";
import { useLanguage } from "@/components/LanguageProvider";
import ConnectButton from "@/components/ConnectButton";
import { usePeaceFundAddress } from "@/hooks/usePeaceFundAddress";

function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function HomePage() {
  const { dictionary } = useLanguage();
  const { peaceFund, isLoading: peaceFundLoading } = usePeaceFundAddress();
  const peaceToken = env.peaceToken;

  const heroCtas = [
    { href: "/donate", label: dictionary.hero.donateCta, color: "bg-amber-500 hover:bg-amber-600" },
    { href: "/treasury", label: dictionary.hero.treasuryCta, color: "bg-emerald-500 hover:bg-emerald-600" },
    { href: "/verify", label: dictionary.hero.verifyCta, color: "bg-sky-500 hover:bg-sky-600" }
  ] satisfies Array<{ href: Route; label: string; color: string }>;

  return (
    <div className="space-y-12">
      <Section className="space-y-6 rounded-3xl bg-zinc-900/70 p-8 ring-1 ring-white/10">
        <div className="flex justify-end">
          <ConnectButton />
        </div>

        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full bg-zinc-800 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-300">
            {dictionary.home.badge}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {dictionary.hero.title}
          </h1>
          <p className="max-w-2xl text-base text-zinc-300 sm:text-lg">{dictionary.hero.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {heroCtas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-black shadow-md transition ${cta.color}`}
            >
              {cta.label}
            </Link>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Stat label="BSC" value={dictionary.home.statChain} helper={dictionary.home.statChainHelper} />
          <Stat
            label={dictionary.home.statToken}
            value={peaceToken ? shortAddress(peaceToken) : "—"}
            helper={dictionary.home.statTokenHelper}
          />
          <Stat label={dictionary.home.statTelegram} value="@WorldPeace_BNB" helper={dictionary.home.statTelegramHelper} />
        </div>

        <Card className="flex flex-col gap-3 bg-zinc-800/70 text-sm text-zinc-200 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
              {dictionary.hero.peaceFundLabel}
            </p>
            <p className="font-mono text-base text-white">
              {peaceFund
                ? shortAddress(peaceFund)
                : peaceFundLoading
                ? dictionary.common.loading
                : dictionary.hero.peaceFundMissing}
            </p>
          </div>
          {peaceFund ? (
            <a
              href={`https://bscscan.com/address/${peaceFund}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-amber-300/50 px-4 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-300/10"
            >
              {dictionary.home.bscScanCta} ↗
            </a>
          ) : null}
        </Card>
      </Section>

      <Section className="grid gap-6 md:grid-cols-2">
        <Card className="bg-zinc-800/70 ring-1 ring-white/10">
          <h2 className="text-xl font-semibold text-white">{dictionary.home.impactTitle}</h2>
          <p className="mt-2 text-sm text-zinc-300">{dictionary.home.impactBody}</p>
          <Link
            href="/treasury"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black shadow-md transition hover:bg-emerald-600"
          >
            {dictionary.hero.treasuryCta}
          </Link>
        </Card>

        <Card className="bg-zinc-800/70 ring-1 ring-white/10">
          <h2 className="text-xl font-semibold text-white">{dictionary.home.joinTitle}</h2>
          <p className="mt-2 text-sm text-zinc-300">{dictionary.home.joinBody}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a
              href={env.guildLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-amber-300/50 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-300/10"
            >
              {dictionary.home.guildCta} ↗
            </a>
            <a
              href={env.tgPublic}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-sky-400/50 px-4 py-2 text-sm font-semibold text-sky-300 transition hover:bg-sky-300/10"
            >
              {dictionary.home.telegramCta} ↗
            </a>
          </div>
        </Card>
      </Section>
    </div>
  );
}
