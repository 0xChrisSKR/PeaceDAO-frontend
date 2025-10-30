"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";

const quickLinks = [
  { href: "/donate", label: "Donate to the Treasury" },
  { href: "/treasury", label: "View Treasury" },
  { href: "/verify", label: "Verify Holder Status" }
];

export default function Home() {
  return (
    <div className="space-y-8">
      <Section className="overflow-hidden rounded-3xl bg-zinc-900/70 p-10 ring-1 ring-white/10">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-zinc-900 to-black p-10">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[url('/assets/ui/hero-banner.svg')] bg-cover bg-center opacity-20"
            aria-hidden="true"
          />
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex rounded-full border border-amber-400/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
              PeaceDAO
            </span>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">World Peace DAO</h1>
            <p className="text-lg text-zinc-300">
              社群治理的世界和平基金，透過捐贈、提案與投票讓資金透明地流向最需要的地方。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
              >
                捐贈金庫
              </Link>
              <Link
                href="/whitepaper"
                className="inline-flex items-center justify-center rounded-full border border-amber-300/50 px-6 py-2 text-sm text-amber-200 transition hover:bg-amber-300/10"
              >
                檢視白皮書
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="grid gap-6 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Card key={link.href} className="bg-black/40 p-6 ring-1 ring-white/10">
            <h2 className="text-lg font-semibold text-white">{link.label}</h2>
            <Link href={link.href} className="mt-3 inline-flex text-sm text-amber-300 transition hover:text-amber-200">
              前往 ↗
            </Link>
          </Card>
        ))}
      </Section>
    </div>
  );
}
