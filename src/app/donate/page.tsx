"use client";

import { useState } from "react";
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

  const donateAddress = env.peaceFund as Address;

  const resolveMethod = async (value: bigint, account: Address) => {
    if (!publicClient) throw new Error("Public client unavailable");
    const methods = Array.from(new Set([env.donateMethod, ...FALLBACK_METHODS]));
    for (const method of methods) {
      if (!method) continue;
      try {
        await publicClient.simulateContract({
          account,
          address: donateAddress,
          abi: peaceFundAbi,
          functionName: method as typeof FALLBACK_METHODS[number],
          args: [beneficiary as Address],
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
    if (!isConnected || !address) {
      toast.error("Connect your wallet to donate");
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(`Switch to ${DEFAULT_CHAIN.name} to donate`);
      return;
    }
    if (!donateAddress || donateAddress === "0x0000000000000000000000000000000000000000") {
      toast.error("PeaceFund contract address is not configured");
      return;
    }
    if (!isAddress(beneficiary)) {
      toast.error("Enter a valid beneficiary address");
      return;
    }
    const value = toWei(amount || "0");
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
      toast.loading("Resolving donation method...", { id: "donate" });
      const method = await resolveMethod(value, address as Address);
      setResolvedMethod(method);
      toast.loading("Sending donation...", { id: "donate" });
      const txHash = await walletClient.writeContract({
        address: donateAddress,
        abi: peaceFundAbi,
        functionName: method as typeof FALLBACK_METHODS[number],
        args: [beneficiary as Address],
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
      toast.error(error?.shortMessage ?? error?.message ?? "Donation failed", { id: "donate" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Donate BNB</h1>
        <p className="mt-2 text-sm text-slate-300">
          90% of every donation is streamed directly to the beneficiary while 10% sustains PeaceDAO operations.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            disabled={isSubmitting}
            className="w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light"
          >
            {isSubmitting ? "Processing..." : "Donate Now"}
          </button>
        </form>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
        <p>
          PeaceFund Contract: <span className="font-mono text-slate-100">{env.peaceFund}</span>
        </p>
        <p className="mt-2">
          Keep at least 0.01 BNB for gas fees. Donations are executed on {DEFAULT_CHAIN.name}.
        </p>
      </div>
    </div>
  );
}
