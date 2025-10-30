import { NextResponse } from "next/server";
import {
  fetchGovernanceJson,
  normaliseProposalSummary,
  GovernanceProposalSummary
} from "@/lib/governance";

interface ProposalsResponse {
  proposals: GovernanceProposalSummary[];
}

export async function GET() {
  try {
    const data = await fetchGovernanceJson<unknown>("/proposals");
    const list = Array.isArray(data)
      ? data
      : (data as { proposals?: unknown[] }).proposals ?? [];

    const proposals = list
      .map((item) => normaliseProposalSummary(item))
      .filter((item): item is GovernanceProposalSummary => Boolean(item));

    return NextResponse.json({ ok: true, proposals } satisfies ProposalsResponse & { ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Failed to load governance proposals" },
      { status: error?.message === "GOVERNANCE_API_UNCONFIGURED" ? 503 : 502 }
    );
  }
}
