"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { isAddress, type Address } from "viem";
import { useAccount } from "wagmi";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import env from "@/config/env";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { fromWei } from "@/lib/format";

const PROPOSE_THRESHOLD = 1_000_000;

export default function ProposePage() {
  const { dictionary } = useLanguage();
  const copy = dictionary.proposePage;
  const { isConnected } = useAccount();

  const tokenAddress = env.peaceToken;
  const isTokenConfigured = Boolean(tokenAddress && isAddress(tokenAddress as `0x${string}`));
  const { data: balance } = useTokenBalance(isTokenConfigured ? (tokenAddress as Address) : undefined, { watch: true });
  const numericBalance = balance ? Number(fromWei(balance)) : 0;
  const meetsThreshold = numericBalance >= PROPOSE_THRESHOLD;

  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [org, setOrg] = useState("");
  const [goal, setGoal] = useState("50");
  const [receiver, setReceiver] = useState("0x");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConnected) {
      toast.error(copy.connectCta);
      return;
    }
    if (!isAddress(receiver as `0x${string}`)) {
      toast.error(copy.addressError);
      return;
    }
    const goalValue = Number(goal);
    if (!Number.isFinite(goalValue) || goalValue <= 0) {
      toast.error(copy.goalError);
      return;
    }

    try {
      const record = {
        title,
        region,
        org,
        goal: goalValue,
        receiver,
        description,
        createdAt: Date.now()
      };
      const existing = typeof window !== "undefined" ? localStorage.getItem("peace-demo-proposals") : null;
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(record);
      localStorage.setItem("peace-demo-proposals", JSON.stringify(parsed));
      toast.success(copy.toast);
      setTitle("");
      setRegion("");
      setOrg("");
      setGoal("50");
      setReceiver("0x");
      setDescription("");
    } catch (error) {
      console.error("Failed to persist proposal draft", error);
      toast.success(copy.toast);
    }
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
        <Card className="space-y-3 border-emerald-400/30 bg-emerald-500/10 text-sm text-emerald-100">
          <h2 className="text-base font-semibold text-white">{copy.gateTitle}</h2>
          <p>{copy.gateRequirement}</p>
          <p className="text-xs text-emerald-100/80">{copy.gateDescription}</p>
        </Card>
      ) : null}

      {isConnected && meetsThreshold ? (
        <Card className="space-y-6 border-white/10 bg-slate-900/60 text-slate-100">
          <h2 className="text-lg font-semibold text-white">{copy.formTitle}</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-emerald-100" htmlFor="proposal-title">
                {copy.titleLabel}
              </label>
              <input
                id="proposal-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-emerald-400/40 bg-slate-900/60 px-4 py-3 text-base text-white shadow-inner focus:border-emerald-300 focus:outline-none"
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-emerald-100" htmlFor="proposal-region">
                  {copy.regionLabel}
                </label>
                <input
                  id="proposal-region"
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  className="w-full rounded-2xl border border-emerald-400/40 bg-slate-900/60 px-4 py-3 text-base text-white shadow-inner focus:border-emerald-300 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-emerald-100" htmlFor="proposal-org">
                  {copy.orgLabel}
                </label>
                <input
                  id="proposal-org"
                  value={org}
                  onChange={(event) => setOrg(event.target.value)}
                  className="w-full rounded-2xl border border-emerald-400/40 bg-slate-900/60 px-4 py-3 text-base text-white shadow-inner focus:border-emerald-300 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-emerald-100" htmlFor="proposal-goal">
                  {copy.goalLabel}
                </label>
                <input
                  id="proposal-goal"
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  className="w-full rounded-2xl border border-emerald-400/40 bg-slate-900/60 px-4 py-3 text-base text-white shadow-inner focus:border-emerald-300 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-emerald-100" htmlFor="proposal-receiver">
                  {copy.receiverLabel}
                </label>
                <input
                  id="proposal-receiver"
                  value={receiver}
                  onChange={(event) => setReceiver(event.target.value)}
                  className="w-full rounded-2xl border border-emerald-400/40 bg-slate-900/60 px-4 py-3 text-base text-white shadow-inner focus:border-emerald-300 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-emerald-100" htmlFor="proposal-description">
                {copy.descriptionLabel}
              </label>
              <textarea
                id="proposal-description"
                rows={6}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-2xl border border-emerald-400/40 bg-slate-900/60 px-4 py-3 text-base text-white shadow-inner focus:border-emerald-300 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-400"
            >
              {copy.submitLabel}
            </button>
          </form>
        </Card>
      ) : null}
    </div>
  );
}
