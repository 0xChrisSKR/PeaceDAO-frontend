"use client";

import { useEffect, useMemo, useState } from "react";
import { parseAbiItem } from "viem";
import { usePublicClient, useReadContract } from "wagmi";
import peaceFundAbi from "@/abi/peaceFund.json";
import { DEFAULT_CHAIN } from "@/config/chains";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import { fromWei } from "@/lib/format";
import { usePeaceFundAddress } from "@/hooks/usePeaceFundAddress";

interface DonationEvent {
  hash: `0x${string}`;
  donor?: string;
  amount: bigint;
  note?: string;
  timestamp?: Date;
}

const DONATED_EVENT = parseAbiItem("event Donated(address indexed donor,uint256 amount,string note)");

export default function TreasuryPage() {
  const { dictionary } = useLanguage();
  const { peaceFund, isLoading: peaceFundLoading } = usePeaceFundAddress();
  const isConfigured = useMemo(() => peaceFund.startsWith("0x") && peaceFund.length === 42, [peaceFund]);
  const canQuery = isConfigured && !peaceFundLoading;

  const publicClient = usePublicClient({ chainId: DEFAULT_CHAIN.id });
  const { data: balanceData, status } = useReadContract({
    address: canQuery ? (peaceFund as `0x${string}`) : undefined,
    abi: peaceFundAbi,
    functionName: "balance",
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: canQuery,
      refetchInterval: 15_000
    }
  });

  const [events, setEvents] = useState<DonationEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    if (!canQuery || !publicClient) {
      setEvents([]);
      setEventsError(null);
      setEventsLoading(Boolean(peaceFundLoading));
      return;
    }
    let cancelled = false;

    const fetchEvents = async () => {
      setEventsLoading(true);
      try {
        const latest = await publicClient.getBlockNumber();
        const fromBlock = latest > 50_000n ? latest - 50_000n : 0n;
        const logs = await publicClient.getLogs({
          address: peaceFund as `0x${string}`,
          event: DONATED_EVENT,
          fromBlock,
          toBlock: latest
        });
        const limited = logs.slice(-10).reverse();
        const enriched = await Promise.all(
          limited.map(async (log) => {
            let timestamp: Date | undefined;
            if (log.blockHash) {
              try {
                const block = await publicClient.getBlock({ blockHash: log.blockHash });
                timestamp = new Date(Number(block.timestamp) * 1000);
              } catch {
                timestamp = undefined;
              }
            }
            return {
              hash: (log.transactionHash ?? "0x") as `0x${string}`,
              donor: log.args?.donor as string | undefined,
              amount: (log.args?.amount as bigint) ?? 0n,
              note: log.args?.note as string | undefined,
              timestamp
            } satisfies DonationEvent;
          })
        );
        if (!cancelled) {
          setEvents(enriched);
          setEventsError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setEvents([]);
          setEventsError(dictionary.treasury.fallback);
        }
      } finally {
        if (!cancelled) {
          setEventsLoading(false);
        }
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 15_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [dictionary.treasury.fallback, canQuery, peaceFund, publicClient, peaceFundLoading]);

  const balanceValue = typeof balanceData === "bigint" ? balanceData : 0n;
  const balance = Number(fromWei(balanceValue));

  return (
    <div className="space-y-8">
      <PageTitle title={dictionary.treasury.title} subtitle={dictionary.treasury.subtitle} />

      {!canQuery ? (
        <Card className="bg-white/60">
          <p className="text-sm text-slate-600">
            {peaceFundLoading ? dictionary.common.loading : dictionary.donate.missingPeaceFund}
          </p>
        </Card>
      ) : null}

      <Card className="bg-white/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-600">{dictionary.treasury.balanceLabel}</p>
            <p className="mt-2 text-4xl font-semibold text-slate-900">
              {canQuery
                ? `${balance.toLocaleString(undefined, { maximumFractionDigits: 4 })} BNB`
                : peaceFundLoading
                ? dictionary.common.loading
                : "-"}
            </p>
          </div>
          <div className="text-xs text-slate-500">
            {status === "pending" ? dictionary.common.loading : `${dictionary.treasury.updated} ${new Date().toLocaleTimeString()}`}
          </div>
        </div>
      </Card>

      <Card className="bg-white/80">
        <h2 className="text-lg font-semibold text-slate-800">{dictionary.treasury.eventsTitle}</h2>
        <div className="mt-4 space-y-4">
          {eventsLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-16 w-full animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          ) : eventsError ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">{eventsError}</p>
          ) : events.length === 0 ? (
            <p className="text-sm text-slate-600">{dictionary.treasury.empty}</p>
          ) : (
            events.map((event) => (
              <div key={`${event.hash}-${event.donor ?? "anon"}`} className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-slate-500">
                    {event.donor ? `${event.donor.slice(0, 6)}…${event.donor.slice(-4)}` : "—"}
                  </span>
                  <span className="font-semibold text-emerald-600">
                    {Number(fromWei(event.amount)).toLocaleString(undefined, { maximumFractionDigits: 4 })} BNB
                  </span>
                </div>
                {event.note ? <p className="mt-2 text-slate-600">{event.note}</p> : null}
                {event.timestamp ? (
                  <p className="mt-2 text-xs text-slate-400">{event.timestamp.toLocaleString()}</p>
                ) : null}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
