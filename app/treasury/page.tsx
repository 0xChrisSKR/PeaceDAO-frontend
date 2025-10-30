"use client";

import Link from "next/link";
import { useBalance } from "wagmi";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { usePeaceFundAddress } from "@/hooks/usePeaceFundAddress";

export default function TreasuryPage() {
  const { peaceFund } = usePeaceFundAddress();
  const { data: bal, isLoading } = useBalance({
    address: peaceFund as `0x${string}`,
    query: { enabled: !!peaceFund }
  });

  return (
    <div className="space-y-8">
      <Section className="rounded-3xl bg-zinc-900/70 p-8 ring-1 ring-white/10">
        <div
          className="mb-6 h-36 w-full rounded-2xl bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/assets/ui/treasury-bg.svg')" }}
        />
        <h1 className="text-3xl font-semibold text-white">Treasury</h1>
        <p className="mt-2 text-zinc-300">
          合約持有的金庫地址，無人可私自轉出，僅能透過「提案→投票→執行」完成劃撥。
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="bg-black/40 p-5 ring-1 ring-white/10">
            <p className="text-xs text-amber-300">Treasury Address</p>
            <p className="mt-1 font-mono text-sm text-white">{peaceFund || "—"}</p>
            {peaceFund && (
              <Link
                href={`https://bscscan.com/address/${peaceFund}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-fit rounded-full border border-amber-300/50 px-3 py-1 text-xs text-amber-300 transition hover:bg-amber-300/10"
              >
                View on BscScan ↗
              </Link>
            )}
          </Card>

          <Card className="bg-black/40 p-5 ring-1 ring-white/10">
            <p className="text-xs text-emerald-300">BNB Balance</p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {isLoading ? "—" : bal ? `${parseFloat(bal.formatted).toFixed(4)} ${bal.symbol}` : "0"}
            </p>
            <p className="mt-1 text-xs text-zinc-400">含所有捐贈與收入。</p>
          </Card>
        </div>

        <Card className="mt-6 bg-black/40 p-5 ring-1 ring-white/10">
          <h2 className="text-lg font-semibold text-white">Protection / 治理保護</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-zinc-300">
            <li>出金須經通過提案；提案包含受助對象、金額、用途。</li>
            <li>提案投票結束後方可執行；所有交易上鏈可稽核。</li>
          </ul>
        </Card>
      </Section>
    </div>
  );
}
