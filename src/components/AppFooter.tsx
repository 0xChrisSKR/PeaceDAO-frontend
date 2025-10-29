"use client";

import { useT } from "@/lib/useT";

export function AppFooter() {
  const t = useT();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/60 py-6 text-center text-sm text-slate-400">
      {t("footer_rights", "Built with love by PeaceDAO contributors.")}
    </footer>
  );
}
