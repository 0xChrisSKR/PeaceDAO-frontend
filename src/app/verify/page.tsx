"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { isAddress, type Address } from "viem";
import { useAccount } from "wagmi";
import env from "@/config/env";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { fromWei } from "@/lib/format";

const VERIFY_THRESHOLD = 200_000;

export default function VerifyPage() {
  const { dictionary } = useLanguage();
  const copy = dictionary.verify;
  const { isConnected } = useAccount();
  const [proposalId, setProposalId] = useState("");

  const tokenAddress = env.peaceToken;
  const isTokenConfigured = Boolean(tokenAddress && isAddress(tokenAddress as `0x${string}`));
  const { data: balance } = useTokenBalance(isTokenConfigured ? (tokenAddress as Address) : undefined, { watch: true });
  const numericBalance = balance ? Number(fromWei(balance)) : 0;
  const meetsThreshold = numericBalance >= VERIFY_THRESHOLD;

  const validatorAddress = env.peaceValidator;
  const validatorConfigured = Boolean(validatorAddress && isAddress(validatorAddress as `0x${string}`));

  const handleAction = () => {
    toast.success(copy.comingSoon);
  };

  return (
    <div className="space-y-8 text-slate-100">
      <PageTitle tone="light" title={copy.title} subtitle={copy.subtitle} />

      {!isConnected ? (
        <Card className="border-white/10 bg-slate-900/60 text-sm text-slate-200">
          <p>{copy.connectCta}</p>
        </Card>
      ) : null}

      {!meetsThreshold ? (
        <Card className="border-emerald-400/30 bg-emerald-500/10 text-sm text-emerald-100">
          <p>{copy.gateRequirement}</p>
        </Card>
      ) : null}

      {!validatorConfigured ? (
        <Card className="border-amber-400/30 bg-amber-500/10 text-sm text-amber-100">
          <p>{copy.validatorMissing}</p>
        </Card>
      ) : null}

      <Card className="space-y-4 border-white/10 bg-slate-900/60 text-slate-100">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-emerald-100" htmlFor="verify-proposal">
            {copy.proposalIdLabel}
          </label>
          <input
            id="verify-proposal"
            value={proposalId}
            onChange={(event) => setProposalId(event.target.value)}
            className="w-full rounded-2xl border border-emerald-400/40 bg-slate-900/60 px-4 py-3 text-base text-white shadow-inner focus:border-emerald-300 focus:outline-none"
            placeholder="12"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAction}
            disabled={!isConnected || !meetsThreshold || !validatorConfigured}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {copy.likeCta}
          </button>
          <button
            type="button"
            onClick={handleAction}
            disabled={!isConnected || !meetsThreshold || !validatorConfigured}
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {copy.claimCta}
          </button>
        </div>
        <p className="text-xs text-slate-300">{copy.comingSoon}</p>
      </Card>

      <Card className="bg-slate-900/60">
        <a
          href={env.guildLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full max-w-xs justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-400"
        >
          {copy.guildCta}
        </a>
        <p className="mt-3 text-xs text-slate-400">{copy.helper}</p>
      </Card>

      <Card className="bg-slate-900/60">
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={env.tgPublic}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-sky-300/40 bg-sky-500/10 px-4 py-3 text-center text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20"
          >
            {copy.public}
          </a>
          <a
            href={env.tgVerified}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-center text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
          >
            {copy.verified}
          </a>
        </div>
      </Card>
    </div>
  );
}
