"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { isAddress } from "viem";
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import peaceFundAbi from "@/abi/peaceFund.json";
import { DEFAULT_CHAIN } from "@/config/chains";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import { toWei } from "@/lib/format";
import { usePeaceFundAddress } from "@/hooks/usePeaceFundAddress";

export default function DonatePage() {
  const { dictionary } = useLanguage();
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { peaceFund, isLoading: peaceFundLoading } = usePeaceFundAddress();
  const isConfigured = isAddress(peaceFund || "");
  const canDonate = !peaceFundLoading && isConfigured;

  const [amount, setAmount] = useState("0.1");
  const [note, setNote] = useState("");
  const [hash, setHash] = useState<`0x${string}` | null>(null);

  const { writeContractAsync, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash: hash ?? undefined, chainId: DEFAULT_CHAIN.id });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (peaceFundLoading) {
      toast.error(dictionary.common.loading);
      return;
    }
    if (!canDonate || !peaceFund) {
      toast.error(dictionary.donate.missingPeaceFund);
      return;
    }
    if (!isConnected) {
      toast.error(dictionary.donate.notConnected);
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(dictionary.donate.networkError);
      return;
    }
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < 0.001) {
      toast.error(dictionary.donate.minError);
      return;
    }
    try {
      const value = toWei(amount);
      const txHash = await writeContractAsync({
        address: peaceFund as `0x${string}`,
        abi: peaceFundAbi,
        functionName: "donate",
        value,
        args: [note.trim()]
      });
      setHash(txHash);
      toast.success(dictionary.donate.success);
      setNote("");
      setAmount("0.1");
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Donation failed";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle title={dictionary.donate.title} subtitle={dictionary.donate.subtitle} />

      {!canDonate ? (
        <Card className="bg-white/60">
          <h2 className="text-lg font-semibold text-slate-700">{dictionary.donate.disabledTitle}</h2>
          <p className="mt-2 text-sm text-slate-600">
            {peaceFundLoading ? dictionary.common.loading : dictionary.donate.missingPeaceFund}
          </p>
        </Card>
      ) : null}

      <Card className="bg-white/80">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="amount">
              {dictionary.donate.amountLabel}
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              min={0.001}
              step="0.0001"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="w-full rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
              placeholder={dictionary.donate.amountPlaceholder}
              disabled={!canDonate || isPending || isConfirming}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="note">
              {dictionary.donate.noteLabel}
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="w-full rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
              placeholder={dictionary.donate.notePlaceholder}
              disabled={!canDonate || isPending || isConfirming}
            />
            <p className="text-xs text-slate-500">{dictionary.donate.noteHelper}</p>
          </div>
          <button
            type="submit"
            disabled={!canDonate || isPending || isConfirming}
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending || isConfirming ? dictionary.common.loading : dictionary.donate.submit}
          </button>
        </form>
      </Card>

      {hash ? (
        <Card className="bg-white/70 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">{dictionary.donate.txLabel}</p>
          <p className="mt-1 break-all font-mono text-xs text-slate-600">{hash}</p>
          <a
            href={`https://bscscan.com/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center rounded-full border border-emerald-300 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            {dictionary.donate.viewOnBscScan}
          </a>
        </Card>
      ) : null}
    </div>
  );
}
