"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface ProposalDonatePreviewProps {
  proposalId: number;
  amountLabel: string;
  amountPlaceholder: string;
  submitLabel: string;
  toastMessage: string;
}

export function ProposalDonatePreview({
  proposalId,
  amountLabel,
  amountPlaceholder,
  submitLabel,
  toastMessage
}: ProposalDonatePreviewProps) {
  const [amount, setAmount] = useState("1");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const record = { proposalId, amount, createdAt: Date.now() };
      const existing = typeof window !== "undefined" ? localStorage.getItem("peace-demo-proposal-support") : null;
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(record);
      localStorage.setItem("peace-demo-proposal-support", JSON.stringify(parsed));
    } catch (error) {
      console.error("Failed to persist local proposal support", error);
    }
    toast.success(toastMessage);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="proposal-amount" className="text-sm font-semibold text-emerald-100">
          {amountLabel}
        </label>
        <input
          id="proposal-amount"
          type="number"
          min={0.01}
          step={0.01}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="w-full rounded-2xl border border-emerald-400/40 bg-slate-900/60 px-4 py-3 text-base text-white shadow-inner focus:border-emerald-300 focus:outline-none"
          placeholder={amountPlaceholder}
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-400"
      >
        {submitLabel}
      </button>
    </form>
  );
}
