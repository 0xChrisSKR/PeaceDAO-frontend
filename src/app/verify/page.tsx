"use client";

import Link from "next/link";
import clsx from "clsx";
import env from "@/config/env";
import { VerifiedTGButton } from "@/components/VerifiedTGButton";
import { useT } from "@/hooks/useT";

export default function VerifyPage() {
  const t = useT("verify");
  const hasGuildLink = Boolean(env.guildLink);
  const guildButtonClassName = clsx(
    "inline-flex w-full justify-center rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition",
    {
      "hover:bg-brand-light": hasGuildLink,
      "pointer-events-none opacity-60": !hasGuildLink
    }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
        <p className="text-sm text-slate-300">{t("subtitle")}</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <a
          href={hasGuildLink ? env.guildLink : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={guildButtonClassName}
          aria-disabled={!hasGuildLink}
          onClick={(event) => {
            if (!hasGuildLink) {
              event.preventDefault();
            }
          }}
        >
          {t("verify_btn")}
        </a>
        <p className="text-xs text-slate-400">
          Need help? Ensure your wallet holds at least 100 $PEACE before attempting verification.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">{t("tg_public")}</h2>
          <p className="mt-2 text-sm text-slate-300">Join the open Telegram hub for mission updates.</p>
          <a
            href={env.tgPublic || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full justify-center rounded-lg border border-brand px-4 py-3 text-sm font-semibold text-brand transition hover:bg-brand/10"
          >
            Open Public Telegram
          </a>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">{t("tg_verified")}</h2>
          <p className="mt-2 text-sm text-slate-300">
            Token holders unlock the coordination space after verifying their wallet balance.
          </p>
          <VerifiedTGButton requiredBalance={100} />
        </div>
      </div>

      <Link
        href="/community"
        className="inline-flex w-full justify-center rounded-lg border border-brand px-4 py-3 text-sm font-semibold text-brand transition hover:bg-brand/10"
      >
        Back to Community
      </Link>
    </div>
  );
}
