import Link from "next/link";
import env from "@/config/env";

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Community</h1>
      <p className="text-sm text-slate-300">
        Join the movement across our public and token-gated communities. Verification is powered by Guild.xyz and Collab.Land.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">Public Telegram</h2>
          <p className="mt-2 text-sm text-slate-300">Stay up-to-date with mission updates and call-to-actions.</p>
          <a
            href={env.tgPublic || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full justify-center rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light"
          >
            Join Public Chat
          </a>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">Verified Telegram</h2>
          <p className="mt-2 text-sm text-slate-300">
            Token holders coordinate here for verified missions. Hold PEACE tokens and verify through Guild.xyz / Collab.Land to
            gain access.
          </p>
          <Link
            href="/verify"
            className="mt-4 inline-flex w-full justify-center rounded-lg border border-brand px-4 py-3 text-sm font-semibold text-brand transition hover:bg-brand/20"
          >
            View Verification Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
