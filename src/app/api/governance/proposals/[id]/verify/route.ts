import { NextResponse } from "next/server";
import {
  forwardGovernanceRequest,
  normaliseLikeSnapshot,
  normaliseUserState
} from "@/lib/governance";

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const proposalId = context.params.id;
  try {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      payload = undefined;
    }

    const result = await forwardGovernanceRequest<unknown>(
      `/proposals/${encodeURIComponent(proposalId)}/verify`,
      {
        method: "POST",
        body: payload ? JSON.stringify(payload) : undefined
      },
      request.headers
    );

    const snapshot = normaliseLikeSnapshot(result, proposalId);
    const user = normaliseUserState((result as Record<string, unknown>)?.user ?? (result as Record<string, unknown>)?.viewer);

    return NextResponse.json({ ok: true, snapshot, user });
  } catch (error: any) {
    const status = error?.message === "GOVERNANCE_API_UNCONFIGURED" ? 503 : 502;
    return NextResponse.json({ ok: false, error: error?.message ?? "Failed to submit verification" }, { status });
  }
}
