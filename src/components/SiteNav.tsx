"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { PeaceIcon } from "@/components/PeaceIcon";
import { WalletControls } from "@/components/WalletControls";
import { useLanguage } from "@/components/LanguageProvider";
import { SHORT_BRAND_NAME } from "@/lib/branding";
import type { Dictionary } from "@/lib/i18n";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/donate", key: "donate" },
  { href: "/swap", key: "swap" },
  { href: "/treasury", key: "treasury" },
  { href: "/governance", key: "governance" },
  { href: "/verify", key: "verify" },
  { href: "/about", key: "about" }
] satisfies Array<{ href: Route; key: keyof Dictionary["nav"] }>;

function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-emerald-200 bg-white/70 p-1 shadow-sm">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={clsx(
          "px-3 py-1 text-xs font-semibold uppercase tracking-wide transition",
          locale === "en" ? "rounded-full bg-emerald-500 text-white" : "text-emerald-600"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={clsx(
          "px-3 py-1 text-xs font-semibold uppercase tracking-wide transition",
          locale === "zh" ? "rounded-full bg-emerald-500 text-white" : "text-emerald-600"
        )}
      >
        ZH
      </button>
    </div>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const { dictionary } = useLanguage();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-full px-2 py-1 text-slate-700 transition hover:text-slate-900">
          <PeaceIcon className="h-10 w-10" />
          <span className="text-base font-semibold sm:text-lg">{SHORT_BRAND_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.key}
                href={link.href}
                className={clsx(
                  "rounded-full px-4 py-2 transition",
                  isActive ? "bg-emerald-500 text-white shadow" : "hover:bg-emerald-50"
                )}
              >
                {dictionary.nav[link.key]}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <WalletControls />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-3 py-2 text-sm font-semibold text-emerald-600 shadow-sm transition hover:bg-white lg:hidden"
          aria-label={dictionary.nav.openMenu}
        >
          ☰
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/30" onClick={close} />
          <div className="ml-auto flex h-full w-72 flex-col gap-6 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-slate-700">{SHORT_BRAND_NAME}</span>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600"
                aria-label={dictionary.nav.closeMenu}
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={close}
                  className={clsx(
                    "rounded-xl px-4 py-3 transition",
                    pathname === link.href ? "bg-emerald-100 text-emerald-700" : "hover:bg-emerald-50"
                  )}
                >
                  {dictionary.nav[link.key]}
                </Link>
              ))}
            </nav>
            <LanguageToggle />
            <WalletControls />
          </div>
        </div>
      ) : null}
    </header>
  );
}
