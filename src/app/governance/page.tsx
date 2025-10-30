"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import type { GovernanceProposalSummary } from "@/lib/governance";

const WHITEPAPER_URL = "https://github.com/PeaceDAO/PeaceDAO-frontend/blob/main/docs/WHITEPAPER.md";
const FRONTEND_REPO = "https://github.com/PeaceDAO/PeaceDAO-frontend";
const CONTRACTS_REPO = "https://github.com/PeaceDAO/PeaceDAO-contracts";

interface ProposalsApiResponse {
  ok: boolean;
  proposals?: GovernanceProposalSummary[];
  error?: string;
}

export default function GovernancePage() {
  const { dictionary, locale } = useLanguage();

  const { data, isLoading, isFetching, error, refetch } = useQuery<ProposalsApiResponse>({
    queryKey: ["governance-proposals"],
    queryFn: async () => {
      const response = await fetch("/api/governance/proposals", { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json?.error ?? "Failed to load proposals");
      }
      return json as ProposalsApiResponse;
    },
    refetchInterval: 60_000,
    refetchOnWindowFocus: false
  });

  const proposals = data?.proposals ?? [];
  const fetchError = error as Error | null;

  function formatStatus(status?: string) {
    if (!status) return null;
    const key = status.toLowerCase() as keyof typeof dictionary.proposals.status;
    return dictionary.proposals.status[key] ?? status;
  }

  function formatDate(value?: string) {
    if (!value) return null;
    try {
      return new Date(value).toLocaleDateString(locale, { month: "short", day: "numeric" });
    } catch {
      return value;
    }
  }

  return (
    <div className="space-y-8">
      <PageTitle title={dictionary.governance.title} subtitle={dictionary.governance.subtitle} />

      <Card className="bg-white/80">
        <h2 className="text-lg font-semibold text-slate-800">{dictionary.governance.thresholdsTitle}</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-emerald-700">
            {dictionary.governance.chat}
          </li>
          <li className="rounded-2xl border border-sky-200 bg-sky-50/70 px-4 py-3 text-sky-700">
            {dictionary.governance.vote}
          </li>
          <li className="rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-amber-700">
            {dictionary.governance.propose}
          </li>
        </ul>
      </Card>

      <Card className="bg-white/80">
        <h2 className="text-lg font-semibold text-slate-800">{dictionary.governance.resourcesTitle}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a
            href={WHITEPAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            {dictionary.governance.whitepaper}
          </a>
          <a
            href={FRONTEND_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {dictionary.governance.frontendRepo}
          </a>
          <a
            href={CONTRACTS_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {dictionary.governance.contractsRepo}
          </a>
        </div>
      </Card>

      <Card className="bg-white/80">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-slate-800">{dictionary.proposals.listTitle}</h2>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center rounded-full border border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-60"
          >
            {isFetching ? dictionary.common.loading : dictionary.common.retry}
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-20 w-full animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          ) : fetchError ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {fetchError.message ?? dictionary.proposals.listError}
            </p>
          ) : proposals.length === 0 ? (
            <p className="text-sm text-slate-600">{dictionary.proposals.listEmpty}</p>
          ) : (
            proposals.map((proposal) => {
              const statusLabel = formatStatus(proposal.status);
              const updated = formatDate(proposal.updatedAt ?? proposal.createdAt);
              return (
                <Link
                  key={proposal.id}
                  href={`/proposals/${proposal.id}`}
                  className="block rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-700 transition hover:border-emerald-300 hover:shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-slate-800">{proposal.title}</h3>
                      {statusLabel ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                          {statusLabel}
                        </span>
                      ) : null}
                    </div>
                    {proposal.summary ? <p className="text-sm text-slate-600">{proposal.summary}</p> : null}
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      {proposal.totalLikes != null ? <span>❤️ {proposal.totalLikes}</span> : null}
                      {proposal.totalBackers != null ? (
                        <span>
                          {proposal.totalBackers} {dictionary.proposalLikes.supportersLabel}
                        </span>
                      ) : null}
                      {updated ? <span>{dictionary.proposals.lastUpdated}: {updated}</span> : null}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
