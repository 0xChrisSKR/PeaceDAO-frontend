"use client";

import Link from "next/link";
import ConnectButton from "@/components/ConnectButton";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/swap", label: "Swap" },
  { href: "/donate", label: "Donate" },
  { href: "/treasury", label: "Treasury" },
  { href: "/verify", label: "Verify" },
  { href: "/whitepaper", label: "Whitepaper" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="World Peace DAO Logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-amber-400/40"
          />
          <span className="text-lg font-semibold text-white">World Peace DAO</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden gap-6 md:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-zinc-200 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <ConnectButton />
        </div>
      </div>

      <nav className="flex flex-wrap gap-3 px-4 pb-4 md:hidden">
        {navigation.map((item) => (
          <Link
            key={`mobile-${item.href}`}
            href={item.href}
            className="rounded-full border border-amber-400/30 px-3 py-1 text-xs text-amber-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
