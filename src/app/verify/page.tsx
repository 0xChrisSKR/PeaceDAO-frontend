import Link from "next/link";
import clsx from "clsx";
import env from "@/config/env";
import { VerifiedTGButton } from "@/components/VerifiedTGButton";

export default function VerifyPage() {
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
      <h1 className="text-3xl font-bold text-white">Verify Access</h1>
      <p className="text-sm text-slate-300">
        Hold PEACE tokens and complete the Guild.xyz quest to unlock verified Telegram access. Collab.Land quests will continue
        to roll out for additional mission roles.
      </p>

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
          Verify with Guild.xyz
        </a>
        <p className="text-xs text-slate-400">
          Need help? Ensure your wallet holds at least 100 $PEACE before attempting verification.
        </p>
        <VerifiedTGButton requiredBalance={100} />
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
