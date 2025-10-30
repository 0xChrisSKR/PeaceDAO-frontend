"use client";

import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import env from "@/config/env";
import { useTokenBalance } from "@/hooks/useTokenBalance";

const THRESHOLD = Number(process.env.NEXT_PUBLIC_VERIFY_THRESHOLD ?? 15000);

export default function VerifyPage() {
  const token = env.peaceToken as `0x${string}` | undefined;
  const { address, value, isLoading, isConnected } = useTokenBalance(token);

  const ok = (value ?? 0) >= THRESHOLD;
  const targetLink = env.tgPrivate || env.tgVerified || env.tgPublic;

  return (
    <div className="space-y-8">
      <Section className="rounded-3xl bg-zinc-900/70 p-8 ring-1 ring-white/10">
        <div
          className="mb-6 h-36 w-full rounded-2xl bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/assets/ui/verify-bg.svg')" }}
        />
        <h1 className="text-3xl font-semibold text-white">Verify</h1>
        <p className="mt-2 text-zinc-300">
          連接你的錢包，若持有 <b>{THRESHOLD.toLocaleString()}</b> 枚 $世界和平（{token ?? "—"}）以上，
          即顯示驗證通過並提供 Telegram 連結。
        </p>

        <Card className="mt-6 bg-black/40 p-5 ring-1 ring-white/10">
          <p className="text-sm text-zinc-300">
            Wallet: <span className="font-mono">{address ?? "—"}</span>
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Balance: {isLoading ? "—" : value?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? 0}
          </p>

          <div className="mt-4">
            {isConnected ? (
              ok ? (
                targetLink ? (
                  <a
                    href={targetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-emerald-500 px-5 py-2 font-semibold text-black transition hover:bg-emerald-400"
                  >
                    ✅ 驗證通過，前往 Telegram
                  </a>
                ) : (
                  <span className="text-emerald-300">驗證通過，但尚未設定 Telegram 連結。</span>
                )
              ) : (
                <span className="text-amber-300">
                  尚未達到門檻（需要 ≥ {THRESHOLD.toLocaleString()}）。
                </span>
              )
            ) : (
              <span className="text-amber-300">請先點右上角 Connect 連接錢包。</span>
            )}
          </div>
        </Card>
      </Section>
    </div>
  );
}
