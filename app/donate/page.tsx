"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { usePeaceFundAddress } from "@/hooks/usePeaceFundAddress";

export default function DonatePage() {
  const { address: user } = useAccount();
  const { peaceFund } = usePeaceFundAddress();
  const [amount, setAmount] = useState("0.01");
  const { data: myBal } = useBalance({ address: user });
  const sendTx = useSendTransaction();

  const normalizedAmount = amount.trim();
  const numericAmount = Number(normalizedAmount);
  const isAmountValid = Number.isFinite(numericAmount) && numericAmount > 0;
  const disabled = !peaceFund || !user || !isAmountValid || sendTx.isPending;

  return (
    <div className="space-y-8">
      <Section className="rounded-3xl bg-zinc-900/70 p-8 ring-1 ring-white/10">
        <div
          className="mb-6 h-36 w-full rounded-2xl bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/assets/ui/donate-bg.svg')" }}
        />
        <h1 className="text-3xl font-semibold text-white">Donate</h1>
        <p className="mt-2 text-zinc-300">
          你的 BNB 將直接進入合約金庫地址，任何轉出都必須經由治理提案表決後才能執行。
        </p>

        <Card className="mt-6 bg-black/40 p-4 ring-1 ring-white/10">
          <p className="text-sm text-zinc-300">
            To: <span className="font-mono">{peaceFund ?? "—"}</span>
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.01"
              className="w-full rounded-xl bg-black/40 px-3 py-2 text-zinc-100 outline-none ring-1 ring-white/10 focus:ring-amber-400 sm:w-40"
            />
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                if (!isAmountValid || !peaceFund) return;
                sendTx.sendTransaction({
                  to: peaceFund as `0x${string}`,
                  value: parseEther(normalizedAmount)
                });
              }}
              className="rounded-xl bg-amber-500 px-5 py-2 font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sendTx.isPending ? "Sending…" : "Donate"}
            </button>
          </div>

          <p className="mt-3 text-xs text-zinc-400">
            你的餘額：{myBal ? `${parseFloat(myBal.formatted).toFixed(4)} ${myBal.symbol}` : "—"}
          </p>
          {sendTx.error && (
            <p className="mt-2 text-xs text-red-300">{sendTx.error.message}</p>
          )}
          {sendTx.data && (
            <a
              href={`https://bscscan.com/tx/${sendTx.data}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-xs text-amber-300 hover:text-amber-200"
            >
              查看交易紀錄 ↗
            </a>
          )}
        </Card>
      </Section>
    </div>
  );
}
