import { NextResponse } from "next/server";
import {
  fetchGovernanceJson,
  normaliseProposalDetail,
  GovernanceProposalDetail
} from "@/lib/governance";

interface ProposalResponse {
  proposal?: GovernanceProposalDetail;
}

export async function GET(
  _: Request,
  context: { params: { id: string } }
) {
  const proposalId = context.params.id;
  try {
    const data = await fetchGovernanceJson<unknown>(`/proposals/${encodeURIComponent(proposalId)}`);
    const proposal = normaliseProposalDetail(data);
    if (!proposal) {
      return NextResponse.json({ ok: false, error: "Proposal not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, proposal } satisfies ProposalResponse & { ok: true });
  } catch (error: any) {
    const status = error?.message === "GOVERNANCE_API_UNCONFIGURED" ? 503 : 502;
    return NextResponse.json({ ok: false, error: error?.message ?? "Failed to load proposal" }, { status });
  }
}
