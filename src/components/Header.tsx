"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ConnectButton } from "@/components/ConnectButton";
import { NetworkPill } from "@/components/NetworkPill";
import LanguageToggle from "@/components/LanguageToggle";
import { useT } from "@/lib/useT";

const NAV_ITEMS = [
  { href: "/", labelKey: "nav_home", fallback: "Home" },
  { href: "/donate", labelKey: "nav_donate", fallback: "Donate" },
  { href: "/swap", labelKey: "nav_swap", fallback: "Swap" },
  { href: "/proposals", labelKey: "nav_proposals", fallback: "Proposals" },
  { href: "/verify", labelKey: "nav_verify", fallback: "Verify" },
  { href: "/community", labelKey: "nav_community", fallback: "Community" }
] satisfies Array<{ href: Route; labelKey: string; fallback: string }>;

export function Header() {
  const pathname = usePathname();
  const t = useT();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-xl font-bold text-brand-light">
            PeaceDAO
          </Link>
          <div className="hidden gap-2 sm:flex">
            <NetworkPill />
          </div>
        </div>
        <nav className="flex flex-1 flex-wrap items-center justify-center gap-3 text-sm uppercase tracking-wide text-slate-300">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-full px-3 py-2 transition",
                pathname === item.href ? "bg-brand/20 text-white" : "hover:text-white"
              )}
            >
              {t(item.labelKey, item.fallback)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3">
          <div className="sm:hidden">
            <NetworkPill />
          </div>
          <LanguageToggle />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
