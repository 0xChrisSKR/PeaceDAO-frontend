import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Card";
import type { ProposalSummary } from "../../data/proposals";

interface ProposalCardProps {
  proposal: ProposalSummary;
  ctaLabel: string;
  progressLabel: string;
}

export function ProposalCard({ proposal, ctaLabel, progressLabel }: ProposalCardProps) {
  const goalValue = Number(proposal.goalBNB) || 0;
  const raisedValue = Number(proposal.raisedBNB) || 0;
  const percent = goalValue > 0 ? Math.min(Math.round((raisedValue / goalValue) * 100), 100) : 0;

  return (
    <Card className="flex flex-col overflow-hidden border-white/10 bg-slate-900/60 p-0 text-slate-100 shadow-xl backdrop-blur">
      <div className="relative h-48 w-full sm:h-56">
        <Image src={proposal.cover} alt={proposal.title} fill className="object-cover" priority={false} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-emerald-200/80">{proposal.region}</p>
          <h3 className="text-xl font-semibold text-white">{proposal.title}</h3>
          <p className="text-sm text-slate-300">{proposal.org}</p>
          <p className="text-sm text-slate-400">{proposal.short}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-emerald-200/80">
            <span>{progressLabel}</span>
            <span>{percent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold text-white">{raisedValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} BNB</span>
            <span>{proposal.goalBNB} BNB</span>
          </div>
        </div>
        <div className="mt-auto">
          <Link
            href={`/proposals/${proposal.id}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-400"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </Card>
  );
}
