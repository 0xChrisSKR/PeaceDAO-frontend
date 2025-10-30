import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import { DEFAULT_CHAIN } from "@/config/chains";
import { usePeaceDAO, VOTE_THRESHOLD } from "@/hooks/usePeaceDAO";
import { formatNumber, fromWei } from "@/lib/format";

export default function ProposalDetailPage() {
  const { dictionary } = useLanguage();
  const t = dictionary.proposals;
  const router = useRouter();
  const { query, isReady } = router;
  const proposalId = useMemo(() => {
    if (!isReady) return "";
    const value = query.id;
    if (!value) return "";
    return Array.isArray(value) ? value[0] ?? "" : value;
  }, [isReady, query.id]);

  const [support, setSupport] = useState<"for" | "against">("for");
  const [reason, setReason] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [voteHash, setVoteHash] = useState<string | null>(null);
  const [finalizeHash, setFinalizeHash] = useState<string | null>(null);
  const [executeHash, setExecuteHash] = useState<string | null>(null);

  const {
    vote,
    finalize,
    executeDonation,
    formattedBalance,
    canVote,
    isConfigured,
    isConnected,
    isCorrectNetwork
  } = usePeaceDAO();

  const explorerUrl = DEFAULT_CHAIN.blockExplorers?.default.url;
  const thresholdLabel = useMemo(() => formatNumber(fromWei(VOTE_THRESHOLD)), []);
  const requirementText = useMemo(
    () => t.common.voteRequirement.replace("{amount}", thresholdLabel),
    [t.common.voteRequirement, thresholdLabel]
  );

  const statusMessages = useMemo(() => {
    const messages: string[] = [];
    if (!isConfigured) {
      messages.push(t.common.contractMissing);
      return messages;
    }
    if (!isConnected) {
      messages.push(t.common.notConnected);
    }
    if (isConnected && !isCorrectNetwork) {
      messages.push(t.common.wrongNetwork);
    }
    if (isConnected && isCorrectNetwork && !canVote) {
      messages.push(requirementText);
    }
    return messages;
  }, [canVote, isConfigured, isConnected, isCorrectNetwork, requirementText, t.common.contractMissing, t.common.notConnected, t.common.wrongNetwork]);

  const disableVote =
    !proposalId || isVoting || !isConfigured || !isConnected || !isCorrectNetwork || !canVote;
  const disableFinalize = !proposalId || isFinalizing || !isConfigured || !isConnected || !isCorrectNetwork;
  const disableExecute = !proposalId || isExecuting || !isConfigured || !isConnected || !isCorrectNetwork;

  const handleVote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disableVote || !proposalId) return;
    setIsVoting(true);
    try {
      const hash = await vote(proposalId, support === "for", reason);
      setVoteHash(hash);
      toast.success(t.detail.success);
      setReason("");
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to submit vote";
      toast.error(message);
    } finally {
      setIsVoting(false);
    }
  };

  const handleFinalize = async () => {
    if (disableFinalize || !proposalId) return;
    setIsFinalizing(true);
    try {
      const hash = await finalize(proposalId);
      setFinalizeHash(hash);
      toast.success(t.detail.finalizeSuccess);
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to finalize";
      toast.error(message);
    } finally {
      setIsFinalizing(false);
    }
  };

  const handleExecute = async () => {
    if (disableExecute || !proposalId) return;
    setIsExecuting(true);
    try {
      const hash = await executeDonation(proposalId);
      setExecuteHash(hash);
      toast.success(t.detail.executeSuccess);
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to execute donation";
      toast.error(message);
    } finally {
      setIsExecuting(false);
    }
  };

  const title = proposalId ? `${t.detail.title} #${proposalId}` : t.detail.title;

  return (
    <div className="space-y-8">
      <PageTitle title={title} subtitle={t.detail.subtitle} />

      <Card className="bg-white/80">
        <h2 className="text-lg font-semibold text-slate-800">{t.common.accessTitle}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-700">
            <p className="font-semibold text-emerald-800">{t.common.balanceLabel}</p>
            <p className="mt-1 font-mono text-xs">{formatNumber(formattedBalance)}</p>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-sky-50/70 px-4 py-3 text-sm text-sky-700">
            {requirementText}
          </div>
        </div>
        {statusMessages.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {statusMessages.map((message) => (
              <li
                key={message}
                className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700"
              >
                {message}
              </li>
            ))}
          </ul>
        ) : null}
      </Card>

      <Card className="bg-white/90">
        <h2 className="text-lg font-semibold text-slate-800">{t.detail.voteTitle}</h2>
        <p className="mt-1 text-sm text-slate-600">{t.detail.voteHelper}</p>
        <form className="mt-4 space-y-5" onSubmit={handleVote}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="support">
              {t.detail.supportLabel}
            </label>
            <select
              id="support"
              name="support"
              value={support}
              onChange={(event) => setSupport(event.target.value as "for" | "against")}
              className="w-full rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
              disabled={disableVote}
            >
              <option value="for">{t.detail.supportFor}</option>
              <option value="against">{t.detail.supportAgainst}</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="reason">
              {t.detail.reasonLabel}
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder={t.detail.reasonPlaceholder}
              className="w-full rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
              disabled={disableVote}
            />
          </div>
          <button
            type="submit"
            disabled={disableVote}
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isVoting ? dictionary.common.loading : t.detail.submit}
          </button>
        </form>
        {voteHash ? (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-xs text-emerald-700">
            <p className="font-semibold text-emerald-800">{t.common.txLabel}</p>
            <p className="mt-1 break-all font-mono">{voteHash}</p>
            {explorerUrl ? (
              <a
                href={`${explorerUrl}/tx/${voteHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center rounded-full border border-emerald-300 px-3 py-1 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                {t.common.viewOnExplorer}
              </a>
            ) : null}
          </div>
        ) : null}
      </Card>

      <Card className="bg-white/90">
        <h2 className="text-lg font-semibold text-slate-800">{t.detail.finalizeTitle}</h2>
        <p className="mt-1 text-sm text-slate-600">{t.detail.finalizeHelper}</p>
        <button
          type="button"
          onClick={handleFinalize}
          disabled={disableFinalize}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFinalizing ? dictionary.common.loading : t.detail.finalizeCta}
        </button>
        {finalizeHash ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
            <p className="font-semibold text-slate-800">{t.common.txLabel}</p>
            <p className="mt-1 break-all font-mono">{finalizeHash}</p>
            {explorerUrl ? (
              <a
                href={`${explorerUrl}/tx/${finalizeHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {t.common.viewOnExplorer}
              </a>
            ) : null}
          </div>
        ) : null}
      </Card>

      <Card className="bg-white/90">
        <h2 className="text-lg font-semibold text-slate-800">{t.detail.executeTitle}</h2>
        <p className="mt-1 text-sm text-slate-600">{t.detail.executeHelper}</p>
        <button
          type="button"
          onClick={handleExecute}
          disabled={disableExecute}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isExecuting ? dictionary.common.loading : t.detail.executeCta}
        </button>
        {executeHash ? (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-xs text-emerald-700">
            <p className="font-semibold text-emerald-800">{t.common.txLabel}</p>
            <p className="mt-1 break-all font-mono">{executeHash}</p>
            {explorerUrl ? (
              <a
                href={`${explorerUrl}/tx/${executeHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center rounded-full border border-emerald-300 px-3 py-1 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                {t.common.viewOnExplorer}
              </a>
            ) : null}
          </div>
        ) : null}
      </Card>
    </div>
  );
}
