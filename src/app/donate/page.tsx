"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { isAddress } from "viem";
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import peaceFundAbi from "@/abi/peaceFund.json";
import env from "@/config/env";
import { DEFAULT_CHAIN } from "@/config/chains";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { TokenLogo } from "@/components/TokenLogo";
import tokenListData from "@/data/tokenlist.json";
import { useLanguage } from "@/components/LanguageProvider";
import { toWei } from "@/lib/format";
import type { TokenInfo, TokenList } from "@/types/token";

const TokenSelector = dynamic(() => import("@/components/TokenSelector").then((mod) => mod.TokenSelector), {
  ssr: false
});

const tokenList = tokenListData as TokenList;

export default function DonatePage() {
  const { dictionary } = useLanguage();
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const peaceFund = env.peaceFund;
  const isConfigured = isAddress(peaceFund || "");

  const tokens = useMemo(
    () => (tokenList.tokens ?? []).filter((token) => token.chainId === env.chainId),
    []
  );
  const donationOptions = useMemo(() => {
    const preferredSymbols = new Set(["BNB", "USDT", "世界和平"]);
    const preferred = tokens.filter((token) => preferredSymbols.has(token.symbol));
    return preferred.length > 0 ? preferred : tokens;
  }, [tokens]);
  const defaultDonationToken = useMemo(() => {
    if (donationOptions.length === 0) return null;
    return donationOptions.find((token) => token.symbol === "BNB") ?? donationOptions[0];
  }, [donationOptions]);

  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(defaultDonationToken);
  const [isSelectorOpen, setSelectorOpen] = useState(false);

  useEffect(() => {
    if (!selectedToken && defaultDonationToken) {
      setSelectedToken(defaultDonationToken);
    }
  }, [defaultDonationToken, selectedToken]);

  const [amount, setAmount] = useState("0.1");
  const [note, setNote] = useState("");
  const [hash, setHash] = useState<`0x${string}` | null>(null);

  const isTokenSupported = selectedToken?.symbol === "BNB";
  const unsupportedMessage =
    selectedToken && !isTokenSupported
      ? dictionary.donate.unsupportedToken.replace("{token}", selectedToken.symbol)
      : null;
  const isSubmitDisabled =
    !isConfigured || isPending || isConfirming || !selectedToken || !isTokenSupported;
  const submitTitle = !isConfigured
    ? dictionary.donate.disabledTitle
    : !isTokenSupported
      ? unsupportedMessage ?? undefined
      : undefined;

  const { writeContractAsync, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash: hash ?? undefined, chainId: DEFAULT_CHAIN.id });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConfigured || !peaceFund) {
      toast.error(dictionary.donate.missingPeaceFund);
      return;
    }
    if (!isConnected) {
      toast.error(dictionary.donate.notConnected);
      return;
    }
    if (!selectedToken) {
      toast.error("No donation token configured.");
      return;
    }
    if (!isTokenSupported) {
      toast.error(dictionary.donate.unsupportedToken.replace("{token}", selectedToken.symbol));
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

      {!isConfigured ? (
        <Card className="bg-white/60">
          <h2 className="text-lg font-semibold text-slate-700">{dictionary.donate.disabledTitle}</h2>
          <p className="mt-2 text-sm text-slate-600">{dictionary.donate.missingPeaceFund}</p>
        </Card>
      ) : null}

        <Card className="bg-white/80">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="amount">
                {dictionary.donate.amountLabel}
                {selectedToken ? (
                  <span className="ml-2 text-xs font-medium text-slate-500">({selectedToken.symbol})</span>
                ) : null}
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min={0.001}
                  step="0.0001"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="flex-1 rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
                  placeholder={dictionary.donate.amountPlaceholder}
                  disabled={!isConfigured || isPending || isConfirming}
                />
                <button
                  type="button"
                  onClick={() => setSelectorOpen(true)}
                  disabled={donationOptions.length === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {selectedToken ? (
                    <>
                      <TokenLogo token={selectedToken} size={28} />
                      <span>{selectedToken.symbol}</span>
                    </>
                  ) : (
                    <span>{dictionary.donate.selectToken}</span>
                  )}
                  <span className="text-xs text-slate-400">▾</span>
                </button>
              </div>
              {unsupportedMessage ? (
                <p className="text-xs text-amber-600">{unsupportedMessage}</p>
              ) : null}
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
                disabled={!isConfigured || isPending || isConfirming}
              />
              <p className="text-xs text-slate-500">{dictionary.donate.noteHelper}</p>
            </div>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              title={submitTitle ?? undefined}
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending || isConfirming ? dictionary.common.loading : dictionary.donate.submit}
            </button>
          </form>
        </Card>

      <TokenSelector
        isOpen={isSelectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={(token) => {
          setSelectedToken(token);
        }}
        tokens={donationOptions}
        title={dictionary.donate.selectToken}
      />

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
