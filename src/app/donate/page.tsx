"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, usePublicClient, useWalletClient, useChainId } from "wagmi";
import type { Address } from "viem";
import { isAddress } from "viem";
import { Trans, useTranslation } from "next-i18next";

import env from "@/config/env";
import peaceFundAbi from "@/abi/peaceFund.json";
import { DEFAULT_CHAIN } from "@/config/chains";
import { toWei } from "@/lib/format";

const FALLBACK_METHODS = ["donate", "donateBNB", "donateTo", "executeDonation"];

export default function DonatePage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient();
  const { t } = useTranslation();

  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [resolvedMethod, setResolvedMethod] = useState<string | null>(null);

  const donateAddress = useMemo(() => {
    if (!env.peaceFund) return undefined;
    return isAddress(env.peaceFund) ? (env.peaceFund as Address) : undefined;
  }, []);

  const isPeaceFundConfigured = Boolean(donateAddress);

  const resolveMethod = async (value: bigint, account: Address, beneficiaryAddress: Address) => {
    if (!publicClient) throw new Error(t("common.errors.publicClientUnavailable"));
    if (!donateAddress) throw new Error(t("donate.errors.contractMissing"));
    const methods = Array.from(new Set([env.donateMethod, ...FALLBACK_METHODS]));
    for (const method of methods) {
      if (!method) continue;
      try {
        await publicClient.simulateContract({
          account,
          address: donateAddress,
          abi: peaceFundAbi,
          functionName: method as typeof FALLBACK_METHODS[number],
          args: [beneficiaryAddress],
          value
        });
        return method;
      } catch (error) {
        continue;
      }
    }
    throw new Error(t("donate.errors.methodNotFound"));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedBeneficiary = beneficiary.trim() as Address;
    if (!isConnected || !address) {
      toast.error(t("donate.toast.connectWallet"));
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(t("donate.toast.switchNetwork", { chain: DEFAULT_CHAIN.name }));
      return;
    }
    if (!donateAddress) {
      toast.error(t("donate.toast.contractMissing"));
      return;
    }
    if (!isAddress(normalizedBeneficiary)) {
      toast.error(t("donate.toast.invalidBeneficiary"));
      return;
    }
    const value = toWei((amount || "0").trim());
    if (value <= 0n) {
      toast.error(t("common.errors.amountGreaterThanZero"));
      return;
    }
    if (!walletClient) {
      toast.error(t("common.errors.walletClientUnavailable"));
      return;
    }

    try {
      setSubmitting(true);
      setResolvedMethod(null);
      toast.loading(t("donate.toast.resolving"), { id: "donate" });
      const method = await resolveMethod(value, address as Address, normalizedBeneficiary);
      setResolvedMethod(method);
      toast.loading(t("donate.toast.sending"), { id: "donate" });
      const txHash = await walletClient.writeContract({
        address: donateAddress,
        abi: peaceFundAbi,
        functionName: method as typeof FALLBACK_METHODS[number],
        args: [normalizedBeneficiary],
        value,
        account: address as Address
      });
      toast.success(t("donate.toast.txSent", { hash: `${txHash.slice(0, 10)}…` }), { id: "donate" });
      await publicClient?.waitForTransactionReceipt({ hash: txHash });
      toast.success(t("donate.toast.confirmed"), { id: "donate" });
      setAmount("");
      setBeneficiary("");
    } catch (error: any) {
      console.error(error);
      const fallbackMessage = t("donate.toast.failed");
      const message =
        error?.shortMessage ?? error?.message ?? error?.cause?.shortMessage ?? fallbackMessage;
      toast.error(message, { id: "donate" });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setResolvedMethod(null);
  }, [beneficiary, amount]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{t("donate.title")}</h1>
        <p className="mt-2 text-sm text-slate-300">{t("donate.description")}</p>
      </div>
      {!isPeaceFundConfigured && (
        <div className="rounded-lg border border-amber-500 bg-amber-500/20 p-4 text-sm text-amber-100">
          <Trans
            i18nKey="donate.alert.notConfigured"
            components={{
              strong: <span className="font-semibold" />,
              code: (
                <code className="mx-1 rounded bg-amber-500/20 px-1 py-0.5 text-xs text-amber-200">.env.local</code>
              )
            }}
          />
        </div>
      )}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <fieldset className="space-y-4" disabled={!isPeaceFundConfigured || isSubmitting}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200" htmlFor="beneficiary">
                {t("donate.form.beneficiaryLabel")}
              </label>
              <input
                id="beneficiary"
                type="text"
                required
                value={beneficiary}
                onChange={(event) => setBeneficiary(event.target.value)}
                placeholder={t("donate.form.beneficiaryPlaceholder")}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200" htmlFor="amount">
                {t("donate.form.amountLabel")}
              </label>
              <input
                id="amount"
                type="number"
                min="0"
                step="0.0001"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder={t("donate.form.amountPlaceholder")}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
              />
            </div>
            {resolvedMethod && (
              <p className="text-xs text-emerald-400">
                <Trans
                  i18nKey="donate.form.methodResolved"
                  values={{ method: resolvedMethod }}
                  components={{ strong: <span className="font-semibold" /> }}
                />
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !isPeaceFundConfigured}
              className="w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t("donate.form.submitLoading") : t("donate.form.submit")}
            </button>
          </fieldset>
        </form>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
        {isPeaceFundConfigured ? (
          <>
            <p>
              {t("donate.contract.label")}: <span className="font-mono text-slate-100">{env.peaceFund}</span>
            </p>
            <p className="mt-2">{t("donate.contract.gasNotice", { chain: DEFAULT_CHAIN.name })}</p>
          </>
        ) : (
          <p className="text-amber-200">{t("donate.contract.configure", { chain: DEFAULT_CHAIN.name })}</p>
        )}
      </div>
    </div>
  );
}
