import { FormEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import { DEFAULT_CHAIN } from "@/config/chains";
import { usePeaceDAO, PROPOSAL_THRESHOLD } from "@/hooks/usePeaceDAO";
import { formatNumber, fromWei } from "@/lib/format";

export default function NewProposalPage() {
  const { dictionary } = useLanguage();
  const t = dictionary.proposals;
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("7");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const {
    createProposal,
    formattedBalance,
    canCreate,
    isConfigured,
    isConnected,
    isCorrectNetwork
  } = usePeaceDAO();

  const thresholdLabel = useMemo(() => formatNumber(fromWei(PROPOSAL_THRESHOLD)), []);
  const explorerUrl = DEFAULT_CHAIN.blockExplorers?.default.url;
  const requirementText = useMemo(
    () => t.common.createRequirement.replace("{amount}", thresholdLabel),
    [t.common.createRequirement, thresholdLabel]
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
    if (isConnected && isCorrectNetwork && !canCreate) {
      messages.push(requirementText);
    }
    return messages;
  }, [canCreate, isConfigured, isConnected, isCorrectNetwork, requirementText, t.common.contractMissing, t.common.notConnected, t.common.wrongNetwork]);

  const disableSubmit =
    isSubmitting || !isConfigured || !isConnected || !isCorrectNetwork || !canCreate;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disableSubmit) return;
    setIsSubmitting(true);
    try {
      const hash = await createProposal(recipient, title, description, Number(period));
      setTxHash(hash);
      toast.success(t.new.success);
      setRecipient("");
      setTitle("");
      setDescription("");
      setPeriod("7");
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to create proposal";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle title={t.new.title} subtitle={t.new.subtitle} />

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

      <Card className="bg-white/90">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="recipient">
              {t.new.recipientLabel}
            </label>
            <input
              id="recipient"
              name="recipient"
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              className="w-full rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
              placeholder="0x..."
              disabled={disableSubmit}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="title">
              {t.new.titleLabel}
            </label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
              disabled={disableSubmit}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="description">
              {t.new.descriptionLabel}
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
              disabled={disableSubmit}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="period">
              {t.new.periodLabel}
            </label>
            <input
              id="period"
              name="period"
              type="number"
              min={1}
              step={1}
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="w-full rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
              disabled={disableSubmit}
            />
            <p className="text-xs text-slate-500">{t.new.periodHelper}</p>
          </div>
          <button
            type="submit"
            disabled={disableSubmit}
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? dictionary.common.loading : t.new.submit}
          </button>
        </form>
      </Card>

      {txHash ? (
        <Card className="bg-white/80 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">{t.common.txLabel}</p>
          <p className="mt-1 break-all font-mono text-xs text-slate-600">{txHash}</p>
          {explorerUrl ? (
            <a
              href={`${explorerUrl}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center rounded-full border border-emerald-300 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              {t.common.viewOnExplorer}
            </a>
          ) : null}
        </Card>
      ) : null}
    </div>
  );
}
