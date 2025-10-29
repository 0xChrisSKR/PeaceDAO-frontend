"use client";

import { useEffect, useMemo, useState } from "react";
import { isAddress } from "viem";
import type { Address } from "viem";
import { usePublicClient } from "wagmi";

import env from "@/config/env";
import { fromWei, formatNumber } from "@/lib/format";
import { useT } from "@/hooks/useT";

export default function TreasuryPage() {
  const t = useT("treasury");
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const treasuryAddress = useMemo(() => {
    if (!env.peaceFund) return undefined;
    return isAddress(env.peaceFund) ? (env.peaceFund as Address) : undefined;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchBalance = async () => {
      if (!publicClient || !treasuryAddress) {
        setBalance(null);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const value = await publicClient.getBalance({ address: treasuryAddress });
        if (!cancelled) {
          setBalance(fromWei(value));
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchBalance();

    return () => {
      cancelled = true;
    };
  }, [publicClient, treasuryAddress]);

  const formattedBalance = balance ? `${formatNumber(balance, 4)} BNB` : "0 BNB";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
        <p className="mt-2 text-sm text-slate-300">{t("subtitle")}</p>
      </div>

      {!treasuryAddress && (
        <div className="rounded-lg border border-amber-500 bg-amber-500/20 p-4 text-sm text-amber-100">
          PeaceFund is not configured. Set <span className="font-semibold">NEXT_PUBLIC_PEACE_FUND</span> in your
          <code className="mx-1 rounded bg-amber-500/20 px-1 py-0.5 text-xs text-amber-200">.env.local</code> to enable the
          treasury view.
        </div>
      )}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-white">{t("balance_label")}</h2>
        <p className="mt-3 text-3xl font-bold text-brand-light">
          {treasuryAddress ? (isLoading ? "…" : error ? "—" : formattedBalance) : "—"}
        </p>
        {error && treasuryAddress && (
          <p className="mt-2 text-xs text-amber-200">Unable to fetch the current balance. Please try again shortly.</p>
        )}
        {treasuryAddress && (
          <p className="mt-4 break-all text-xs text-slate-400">PeaceFund Contract: {env.peaceFund}</p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">{t("recent_donations")}</h2>
        <p className="mt-2 text-sm text-slate-300">On-chain donation activity will appear here in a future update.</p>
      </div>
    </div>
  );
}
