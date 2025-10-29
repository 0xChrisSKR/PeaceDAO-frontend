"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ConnectButton } from "@/components/ConnectButton";
import { NetworkPill } from "@/components/NetworkPill";
import { TwitterLink } from "@/components/TwitterLink";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/donate", label: "Donate" },
  { href: "/swap", label: "Swap" },
  { href: "/proposals", label: "Proposals" },
  { href: "/verify", label: "Verify" },
  { href: "/community", label: "Community" }
] satisfies Array<{ href: Route; label: string }>;

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-slate-800 p-2 text-slate-300 transition hover:border-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand sm:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className="hidden flex-1 flex-wrap items-center justify-center gap-3 text-sm uppercase tracking-wide text-slate-300 sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-full px-3 py-2 transition",
                pathname === item.href ? "bg-brand/20 text-white" : "hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <TwitterLink className="rounded-full bg-slate-900/40 px-3 py-2 font-semibold normal-case hover:bg-slate-900/60" />
        </nav>
        <div className="flex items-center justify-end gap-3">
          <div className="sm:hidden">
            <NetworkPill />
          </div>
          <ConnectButton />
        </div>
      </div>
      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 px-6 py-8 text-slate-100 sm:hidden">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-brand-light"
              onClick={() => setIsMenuOpen(false)}
            >
              PeaceDAO
            </Link>
            <button
              type="button"
              className="rounded-md border border-slate-800 p-2 text-slate-300 transition hover:border-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-4 text-lg font-semibold">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-lg border border-slate-800/60 px-4 py-3 transition",
                  pathname === item.href ? "bg-brand/20 text-white" : "hover:border-slate-700 hover:bg-slate-900"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <TwitterLink className="rounded-lg border border-slate-800/60 px-4 py-3 font-semibold text-slate-200 hover:border-slate-700 hover:bg-slate-900" />
          </nav>
          <div className="mt-6 flex flex-col gap-4">
            <NetworkPill />
            <ConnectButton />
          </div>
        </div>
      ) : null}
    </header>
  );
}
