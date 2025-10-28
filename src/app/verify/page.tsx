import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">Verify Access</h1>
      <p className="text-sm text-slate-300">
        Token-gated verification is coming soon. In the meantime, hold PEACE tokens and follow announcements for Guild.xyz and
        Collab.Land quests to unlock special roles.
      </p>
      <Link
        href="/community"
        className="inline-flex w-full justify-center rounded-lg border border-brand px-4 py-3 text-sm font-semibold text-brand transition hover:bg-brand/10"
      >
        Back to Community
      </Link>
    </div>
  );
}
