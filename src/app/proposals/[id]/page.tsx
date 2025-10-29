import Image from "next/image";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { ProposalDonatePreview } from "@/components/ProposalDonatePreview";
import { StatRow } from "@/components/StatRow";
import { getDictionary } from "@/lib/i18n";
import { getProposalById } from "../../../../data/proposals";

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  const proposalId = Number(params.id);
  if (!Number.isFinite(proposalId)) {
    notFound();
  }

  const proposal = getProposalById(proposalId);
  if (!proposal) {
    notFound();
  }

  const lang = cookies().get("lang")?.value;
  const dictionary = getDictionary(lang);
  const detail = dictionary.proposal;
  return (
    <div className="space-y-8 text-slate-100">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl">
        <div className="relative h-64 w-full sm:h-80">
          <Image src={proposal.cover} alt={proposal.title} fill className="object-cover" priority />
        </div>
        <div className="space-y-6 p-8">
          <PageTitle tone="light" title={proposal.title} subtitle={proposal.short} />
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <Card className="space-y-4 border-white/10 bg-slate-900/60 text-slate-200">
              <h2 className="text-lg font-semibold text-white">{detail.overviewTitle}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-200/80">{detail.regionLabel}</p>
                  <p className="mt-1 text-sm text-slate-100">{proposal.region}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-200/80">{detail.orgLabel}</p>
                  <p className="mt-1 text-sm text-slate-100">{proposal.org}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-emerald-200/80">{detail.receiverLabel}</p>
                  <p className="mt-1 break-all font-mono text-xs text-emerald-100/90">{proposal.receiver}</p>
                </div>
              </div>
              <p className="text-sm text-slate-300">{proposal.description}</p>
              <StatRow
                goal={proposal.goalBNB}
                raised={proposal.raisedBNB}
                goalLabel={detail.goalLabel}
                raisedLabel={detail.raisedLabel}
                progressLabel={detail.progressLabel}
              />
              <p className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-4 text-xs text-emerald-100">
                {detail.approvalNote}
              </p>
            </Card>
            <Card className="space-y-4 border-white/10 bg-slate-900/60 text-slate-100">
              <h2 className="text-lg font-semibold text-white">{detail.donateTitle}</h2>
              <p className="text-sm text-slate-300">{detail.donateDescription}</p>
              <ProposalDonatePreview
                proposalId={proposal.id}
                amountLabel={detail.amountLabel}
                amountPlaceholder={detail.amountPlaceholder}
                submitLabel={detail.submitLabel}
                toastMessage={detail.toast}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
