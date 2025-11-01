"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/markets", label: "Markets" },
  { href: "/trade", label: "Trade" },
  { href: "/swap", label: "Swap" },
  { href: "/governance", label: "Governance" },
  { href: "/donate", label: "Donate" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
];

export default function TopNav() {
  const pathname = usePathname();
  return (
    <div className="w-full sticky top-0 z-30 bg-black/80 backdrop-blur border-b border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-wide">
          WorldPeace DAO
        </Link>
        <nav className="flex gap-3 overflow-x-auto">
          {tabs.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
                  active
                    ? "bg-yellow-500 text-black font-semibold"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
