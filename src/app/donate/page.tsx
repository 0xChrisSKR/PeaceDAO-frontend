"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, usePublicClient, useWalletClient, useChainId } from "wagmi";
import type { Address } from "viem";
import { isAddress } from "viem";
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
    if (!publicClient) throw new Error("Public client unavailable");
    if (!donateAddress) throw new Error("PeaceFund contract is not configured");
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
    throw new Error("No donate method matched on PeaceFund contract");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedBeneficiary = beneficiary.trim() as Address;
    if (!isConnected || !address) {
      toast.error("Connect your wallet to donate");
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(`Switch to ${DEFAULT_CHAIN.name} to donate`);
      return;
    }
    if (!donateAddress) {
      toast.error("PeaceFund contract address is not configured");
      return;
    }
    if (!isAddress(normalizedBeneficiary)) {
      toast.error("Enter a valid beneficiary address");
      return;
    }
    const value = toWei((amount || "0").trim());
    if (value <= 0n) {
      toast.error("Enter an amount greater than zero");
      return;
    }
    if (!walletClient) {
      toast.error("Wallet client unavailable");
      return;
    }

    try {
      setSubmitting(true);
      setResolvedMethod(null);
      toast.loading("Resolving donation method...", { id: "donate" });
      const method = await resolveMethod(value, address as Address, normalizedBeneficiary);
      setResolvedMethod(method);
      toast.loading("Sending donation...", { id: "donate" });
      const txHash = await walletClient.writeContract({
        address: donateAddress,
        abi: peaceFundAbi,
        functionName: method as typeof FALLBACK_METHODS[number],
        args: [normalizedBeneficiary],
        value,
        account: address as Address
      });
      toast.success(`Transaction sent: ${txHash.slice(0, 10)}…`, { id: "donate" });
      await publicClient?.waitForTransactionReceipt({ hash: txHash });
      toast.success("Donation confirmed", { id: "donate" });
      setAmount("");
      setBeneficiary("");
    } catch (error: any) {
      console.error(error);
      const message =
        error?.shortMessage ?? error?.message ?? error?.cause?.shortMessage ?? "Donation failed";
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
        <h1 className="text-3xl font-bold text-white">Donate BNB</h1>
        <p className="mt-2 text-sm text-slate-300">
          90% of every donation is streamed directly to the beneficiary while 10% sustains PeaceDAO operations.
        </p>
      </div>
      {!isPeaceFundConfigured && (
        <div className="rounded-lg border border-amber-500 bg-amber-500/20 p-4 text-sm text-amber-100">
          PeaceFund is not configured. Set <span className="font-semibold">NEXT_PUBLIC_PEACE_FUND</span> in your
          <code className="mx-1 rounded bg-amber-500/20 px-1 py-0.5 text-xs text-amber-200">.env.local</code> to enable donations.
        </div>
      )}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <fieldset className="space-y-4" disabled={!isPeaceFundConfigured || isSubmitting}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200">Beneficiary Address</label>
              <input
                type="text"
                required
                value={beneficiary}
                onChange={(event) => setBeneficiary(event.target.value)}
                placeholder="0x..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200">Amount (BNB)</label>
              <input
                type="number"
                min="0"
                step="0.0001"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.5"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
              />
            </div>
            {resolvedMethod && (
              <p className="text-xs text-emerald-400">
                Using PeaceFund method <span className="font-semibold">{resolvedMethod}</span>
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !isPeaceFundConfigured}
              className="w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Processing..." : "Donate Now"}
            </button>
          </fieldset>
        </form>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
        {isPeaceFundConfigured ? (
          <>
            <p>
              PeaceFund Contract: <span className="font-mono text-slate-100">{env.peaceFund}</span>
            </p>
            <p className="mt-2">Keep at least 0.01 BNB for gas fees. Donations are executed on {DEFAULT_CHAIN.name}.</p>
          </>
        ) : (
          <p className="text-amber-200">Configure your PeaceFund address to enable donations on {DEFAULT_CHAIN.name}.</p>
        )}
      </div>
    </div>
  );
}
