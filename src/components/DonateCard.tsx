"use client";
import { useState } from "react";

export default function DonateCard() {
  const [amount, setAmount] = useState("0.01");
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Donate</h3>
      <p className="mt-2 text-sm text-slate-500">
        On-chain donations are temporarily disabled while the wallet integration is being rebuilt.
      </p>
      <div className="mt-4 flex gap-3">
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Amount (BNB)"
          aria-label="Donation amount"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-600"
        >
          Donate
        </button>
      </div>
      {open ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          Thank you for your interest! Please contact the core team to arrange an off-chain contribution while we finish the new
          wallet flow.
        </div>
      ) : null}
    </div>
  );
}
