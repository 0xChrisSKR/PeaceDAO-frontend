"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useBalance, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import env from "@/config/env";
import { DEFAULT_CHAIN } from "@/config/chains";
import treasuryAbi from "@/lib/contracts/treasuryAbi";
import { formatNumber } from "@/lib/format";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";

export default function TreasuryPage() {
  const { dictionary } = useLanguage();
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const treasuryAddress = env.treasury;
  const isConfigured = useMemo(
    () => typeof treasuryAddress === "string" && treasuryAddress.startsWith("0x") && treasuryAddress.length === 42,
    [treasuryAddress]
  );

  const { data: balanceData, status: balanceStatus } = useBalance({
    address: isConfigured ? (treasuryAddress as `0x${string}`) : undefined,
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: isConfigured,
      refetchInterval: 30_000
    }
  });

  const { writeContractAsync, isPending } = useWriteContract();
  const [proposalId, setProposalId] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: DEFAULT_CHAIN.id
  });

  const explorerUrl = DEFAULT_CHAIN.blockExplorers?.default.url ?? "https://bscscan.com";

  const balanceFormatted = balanceData?.formatted
    ? `${formatNumber(balanceData.formatted)} ${balanceData.symbol}`
    : "-";

  const statusMessage = !isConnected
    ? dictionary.treasury.notConnected
    : chainId !== DEFAULT_CHAIN.id
      ? dictionary.treasury.wrongNetwork
      : "";

  const handleExecute = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConfigured || !treasuryAddress) {
      toast.error(dictionary.treasury.missing);
      return;
    }
    if (!isConnected) {
      toast.error(dictionary.treasury.notConnected);
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(dictionary.treasury.wrongNetwork);
      return;
    }
    const trimmed = proposalId.trim();
    let id: bigint;
    try {
      if (!trimmed) throw new Error("empty");
      id = BigInt(trimmed);
      if (id < 0n) throw new Error("negative");
    } catch {
      toast.error(dictionary.treasury.invalidId);
      return;
    }

    try {
      const hash = await writeContractAsync({
        address: treasuryAddress as `0x${string}`,
        abi: treasuryAbi,
        functionName: "executePayout",
        args: [id],
        chainId: DEFAULT_CHAIN.id
      });
      setTxHash(hash);
      toast.success(dictionary.treasury.executeSuccess);
      setProposalId("");
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to execute payout";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle title={dictionary.treasury.title} subtitle={dictionary.treasury.subtitle} />

      {!isConfigured ? (
        <Card className="bg-amber-50/80 text-sm text-amber-700">{dictionary.treasury.missing}</Card>
      ) : null}

      <Card className="bg-white/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-600">{dictionary.treasury.balanceLabel}</p>
            <p className="mt-2 text-4xl font-semibold text-slate-900">{balanceFormatted}</p>
          </div>
          <div className="text-xs text-slate-500">
            {balanceStatus === "pending" ? dictionary.treasury.loading : `${dictionary.treasury.updated} ${new Date().toLocaleTimeString()}`}
          </div>
        </div>
      </Card>

      <Card className="bg-white/80">
        <form className="space-y-4" onSubmit={handleExecute}>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">{dictionary.treasury.executeTitle}</h2>
            <p className="text-sm text-slate-600">{dictionary.treasury.executeDescription}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="proposalId">
              {dictionary.treasury.proposalIdLabel}
            </label>
            <input
              id="proposalId"
              name="proposalId"
              type="number"
              min={0}
              step={1}
              value={proposalId}
              onChange={(event) => setProposalId(event.target.value)}
              placeholder={dictionary.treasury.proposalIdPlaceholder}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
              disabled={!isConfigured || isPending || isConfirming}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!isConfigured || isPending || isConfirming}
          >
            {isPending || isConfirming ? dictionary.common.loading : dictionary.treasury.executeCta}
          </button>
          {statusMessage ? <p className="text-xs text-slate-500">{statusMessage}</p> : null}
        </form>
      </Card>

      {txHash ? (
        <Card className="bg-white/70 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">{dictionary.treasury.executeSuccess}</p>
          <p className="mt-1 break-all font-mono text-xs text-slate-500">{txHash}</p>
          <a
            href={`${explorerUrl}/tx/${txHash}`}
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
