"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import LikeSection from "./LikeSection";
import type { GovernanceProposalDetail } from "@/lib/governance";

interface ProposalApiResponse {
  ok: boolean;
  proposal?: GovernanceProposalDetail;
  error?: string;
}

function formatTimestamp(value?: string, locale?: string) {
  if (!value) return null;
  try {
    return new Date(value).toLocaleString(locale ?? undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return value;
  }
}

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  const proposalId = params.id;
  const { dictionary, locale } = useLanguage();

  const { data, isLoading, isFetching, error, refetch } = useQuery<ProposalApiResponse>({
    queryKey: ["governance-proposal", proposalId],
    queryFn: async () => {
      const response = await fetch(`/api/governance/proposals/${encodeURIComponent(proposalId)}`, { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json?.error ?? "Failed to load proposal");
      }
      return json as ProposalApiResponse;
    },
    refetchOnWindowFocus: false,
    staleTime: 60_000
  });

  const proposal = data?.proposal;
  const reactionsEnabled = Boolean(data?.ok && proposal?.likeSnapshot);
  const formattedUpdated = useMemo(() => formatTimestamp(proposal?.updatedAt ?? proposal?.createdAt, locale), [proposal?.createdAt, proposal?.updatedAt, locale]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <div className="space-y-4">
          <div className="h-12 w-3/4 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-4 w-1/2 animate-pulse rounded-xl bg-slate-100" />
        </div>
        <Card className="bg-white/80 p-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-4 w-full animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (!proposal) {
    const message = (error as Error | undefined)?.message ?? data?.error ?? dictionary.proposals.detailError;
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <PageTitle title={`#${proposalId}`} subtitle={dictionary.proposals.detailError} />
        <Card className="bg-white/80 p-6">
          <p className="text-sm text-slate-600">{message}</p>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-4 inline-flex items-center rounded-full border border-emerald-300 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-60"
          >
            {isFetching ? dictionary.common.loading : dictionary.common.retry}
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <PageTitle title={proposal.title} subtitle={proposal.summary ?? ""} />

      <Card className="bg-white/80 p-6 space-y-4">
        {formattedUpdated ? (
          <p className="text-xs text-slate-500">{dictionary.proposals.lastUpdated}: {formattedUpdated}</p>
        ) : null}

        {proposal.author ? (
          <p className="text-sm text-slate-600">{proposal.author}</p>
        ) : null}

        {proposal.html ? (
          <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: proposal.html }} />
        ) : proposal.content ? (
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{proposal.content}</div>
        ) : null}

        {proposal.links?.length ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {proposal.links.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-emerald-300 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        ) : null}
      </Card>

      <LikeSection
        proposalId={proposalId}
        initialSnapshot={proposal.likeSnapshot}
        initialUser={proposal.user}
        reactionsEnabled={reactionsEnabled}
      />
    </div>
  );
}
