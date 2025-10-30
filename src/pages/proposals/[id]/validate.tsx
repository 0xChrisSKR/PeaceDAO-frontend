import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import { DEFAULT_CHAIN } from "@/config/chains";
import { usePeaceDAO, VALIDATION_THRESHOLD } from "@/hooks/usePeaceDAO";
import { formatNumber, fromWei } from "@/lib/format";

export default function ValidateProposalPage() {
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

  const [pendingAction, setPendingAction] = useState<"approve" | "reject" | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const { validate, formattedBalance, canValidate, isConfigured, isConnected, isCorrectNetwork } = usePeaceDAO();

  const explorerUrl = DEFAULT_CHAIN.blockExplorers?.default.url;
  const thresholdLabel = useMemo(() => formatNumber(fromWei(VALIDATION_THRESHOLD)), []);
  const requirementText = useMemo(
    () => t.common.validateRequirement.replace("{amount}", thresholdLabel),
    [t.common.validateRequirement, thresholdLabel]
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
    if (isConnected && isCorrectNetwork && !canValidate) {
      messages.push(requirementText);
    }
    return messages;
  }, [canValidate, isConfigured, isConnected, isCorrectNetwork, requirementText, t.common.contractMissing, t.common.notConnected, t.common.wrongNetwork]);

  const isBusy = pendingAction !== null;
  const disableInteraction =
    !proposalId || !isConfigured || !isConnected || !isCorrectNetwork || !canValidate || isBusy;

  const handleValidate = async (likeIt: boolean) => {
    if (disableInteraction || !proposalId) return;
    const action = likeIt ? "approve" : "reject";
    setPendingAction(action);
    try {
      const hash = await validate(proposalId, likeIt);
      setTxHash(hash);
      toast.success(likeIt ? t.validate.successApprove : t.validate.successReject);
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to submit validation";
      toast.error(message);
    } finally {
      setPendingAction(null);
    }
  };

  const title = proposalId ? `${t.validate.title} #${proposalId}` : t.validate.title;

  return (
    <div className="space-y-8">
      <PageTitle title={title} subtitle={t.validate.subtitle} />

      <Card className="bg-white/80">
        <h2 className="text-lg font-semibold text-slate-800">{t.common.accessTitle}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-700">
            <p className="font-semibold text-emerald-800">{t.common.balanceLabel}</p>
            <p className="mt-1 font-mono text-xs">{formatNumber(formattedBalance)}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-700">
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

      <Card className="bg-white/90 space-y-4">
        <p className="text-sm text-slate-600">{t.validate.helper}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleValidate(true)}
            disabled={disableInteraction}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isBusy && pendingAction === "approve" ? dictionary.common.loading : t.validate.approve}
          </button>
          <button
            type="button"
            onClick={() => handleValidate(false)}
            disabled={disableInteraction}
            className="inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isBusy && pendingAction === "reject" ? dictionary.common.loading : t.validate.reject}
          </button>
        </div>
        {txHash ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-xs text-emerald-700">
            <p className="font-semibold text-emerald-800">{t.common.txLabel}</p>
            <p className="mt-1 break-all font-mono">{txHash}</p>
            {explorerUrl ? (
              <a
                href={`${explorerUrl}/tx/${txHash}`}
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
