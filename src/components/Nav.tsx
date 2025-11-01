"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const tabs = [
  { href: "/", label: "首頁" },
  { href: "/governance", label: "治理" },
  { href: "/swap", label: "Swap(展示)" },
  { href: "/donate", label: "捐贈" },
  { href: "/docs", label: "Docs" },
  { href: "/debug", label: "Debug" },
];
export default function Nav() {
  const path = usePathname();
  return (
    <nav style={{display:"flex",gap:12,flexWrap:"wrap",padding:"12px 16px",borderBottom:"1px solid #333"}}>
      {tabs.map(t=>{
        const active = path===t.href;
        return (
          <Link key={t.href} href={t.href} style={{
            padding:"8px 12px",
            borderRadius:8,
            border:"1px solid #444",
            background: active ? "#111" : "transparent",
            fontWeight:600,
            textDecoration:"none"
          }}>{t.label}</Link>
        );
      })}
    </nav>
  );
}
