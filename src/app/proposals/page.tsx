"use client";

import { proposals } from "../../../data/proposals";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { ProposalCard } from "@/components/ProposalCard";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProposalsPage() {
  const { dictionary } = useLanguage();

  return (
    <div className="space-y-8">
      <PageTitle tone="light" title={dictionary.proposals.title} subtitle={dictionary.proposals.subtitle} />
      {proposals.length === 0 ? (
        <Card className="border-white/10 bg-slate-900/60 text-center text-slate-200">
          <p>{dictionary.proposals.empty}</p>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              ctaLabel={dictionary.proposals.ctaLabel}
              progressLabel={dictionary.proposals.progressLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
