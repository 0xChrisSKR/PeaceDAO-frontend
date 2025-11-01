import { getEnv } from "@/lib/getEnv";
import type { LikeSnapshot, UserLikeState } from "@/types/like";

export interface GovernanceProposalLink {
  label: string;
  url: string;
}

export interface GovernanceProposalSummary {
  id: string;
  title: string;
  summary?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: string;
  coverImage?: string;
  totalLikes?: number;
  totalBackers?: number;
}

export interface GovernanceProposalDetail extends GovernanceProposalSummary {
  content?: string;
  html?: string;
  author?: string;
  links?: GovernanceProposalLink[];
  likeSnapshot: LikeSnapshot;
  user: UserLikeState;
}

const NUMBER_FALLBACK = 0;

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return NUMBER_FALLBACK;
}

function parseDate(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(value).toISOString();
  }
  if (typeof value === "string" && value) {
    const timestamp = Date.parse(value);
    if (!Number.isNaN(timestamp)) {
      return new Date(timestamp).toISOString();
    }
  }
  return undefined;
}

function buildGovernanceUrl(path: string): string | null {
  const base = getEnv("demoApiBase") || getEnv("governanceApi");
  if (!base) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalizedBase = base.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function normaliseLink(entry: unknown): GovernanceProposalLink | null {
  if (typeof entry === "string") {
    return { label: entry, url: entry };
  }
  if (!entry || typeof entry !== "object") {
    return null;
  }
  const record = entry as Record<string, unknown>;
  const urlCandidate = record.url ?? record.href ?? record.link ?? record.value;
  if (typeof urlCandidate !== "string") {
    return null;
  }
  const labelCandidate = record.label ?? record.title ?? record.name;
  const label = typeof labelCandidate === "string" && labelCandidate ? labelCandidate : urlCandidate;
  return { label, url: urlCandidate };
}

function normaliseLinks(input: unknown): GovernanceProposalLink[] | undefined {
  if (!input) return undefined;
  const links: GovernanceProposalLink[] = [];
  if (Array.isArray(input)) {
    for (const entry of input) {
      const link = normaliseLink(entry);
      if (link) links.push(link);
    }
  } else if (typeof input === "object") {
    const record = input as Record<string, unknown>;
    for (const [key, value] of Object.entries(record)) {
      const link = normaliseLink({ label: key, url: value });
      if (link) links.push(link);
    }
  } else if (typeof input === "string") {
    links.push({ label: input, url: input });
  }
  return links.length ? links : undefined;
}

export function normaliseLikeSnapshot(input: unknown, fallbackId: string): LikeSnapshot {
  const value = (input as Record<string, unknown>) ?? {};
  const base = (value.likeSnapshot as Record<string, unknown>) ??
    (value.snapshot as Record<string, unknown>) ??
    (value.likes as Record<string, unknown>) ??
    value;

  const totalLikes = toNumber(base.totalLikes ?? base.likes ?? base.count ?? base.total ?? 0);
  const totalBackers = toNumber(base.totalBackers ?? base.backers ?? base.supporters ?? base.totalSupporters ?? 0);

  const txHashes: string[] = [];
  if (Array.isArray(base.txHashes)) {
    for (const hash of base.txHashes) {
      if (typeof hash === "string" && hash.startsWith("0x")) {
        txHashes.push(hash);
      }
    }
  } else if (Array.isArray(base.transactions)) {
    for (const tx of base.transactions) {
      if (typeof tx === "string" && tx.startsWith("0x")) {
        txHashes.push(tx);
      } else if (tx && typeof tx === "object") {
        const record = tx as Record<string, unknown>;
        const hash = record.hash ?? record.txHash ?? record.transactionHash;
        if (typeof hash === "string" && hash.startsWith("0x")) {
          txHashes.push(hash);
        }
      }
    }
  }

  const proofUrlCandidate =
    base.verifiedProofUrl ??
    base.proofUrl ??
    base.verificationUrl ??
    base.verification_link;
  const verifiedProofUrl = typeof proofUrlCandidate === "string" ? proofUrlCandidate : undefined;

  const lastLikeCandidate = base.lastLikedAt ?? base.updatedAt ?? base.timestamp ?? base.lastLiked ?? base.lastUpdated;
  const parsedLastLike = typeof lastLikeCandidate === "number"
    ? lastLikeCandidate
    : typeof lastLikeCandidate === "string"
    ? Date.parse(lastLikeCandidate)
    : undefined;

  return {
    proposalId: typeof base.proposalId === "string" && base.proposalId ? base.proposalId : fallbackId,
    totalLikes,
    totalBackers,
    txHashes: txHashes.length ? txHashes : undefined,
    verifiedProofUrl,
    lastLikedAt: typeof parsedLastLike === "number" && Number.isFinite(parsedLastLike) ? parsedLastLike : undefined
  };
}

export function normaliseUserState(input: unknown): UserLikeState {
  const value = (input as Record<string, unknown>) ?? {};
  const roles = Array.isArray(value.roles) ? value.roles.map((role) => String(role).toLowerCase()) : [];
  const hasLiked = Boolean(
    value.hasLiked ??
      value.liked ??
      value.viewerHasLiked ??
      value.userHasLiked ??
      value.hasSupported
  );
  const isVerifier = Boolean(
    value.isVerifier ??
      value.verifier ??
      value.canVerify ??
      roles.some((role) => role.includes("verify"))
  );
  return { hasLiked, isVerifier };
}

export function normaliseProposalSummary(input: unknown): GovernanceProposalSummary | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  const idCandidate = value.id ?? value.proposalId ?? value.slug ?? value.uuid ?? value.identifier;
  if (typeof idCandidate !== "string" && typeof idCandidate !== "number") {
    return null;
  }
  const id = String(idCandidate);
  const titleCandidate = value.title ?? value.name ?? value.headline ?? `Proposal ${id}`;
  const title = typeof titleCandidate === "string" ? titleCandidate : `Proposal ${id}`;
  const summaryCandidate = value.summary ?? value.excerpt ?? value.description ?? value.body;
  const summary = typeof summaryCandidate === "string" ? summaryCandidate : undefined;
  const statusCandidate = value.status ?? value.state ?? value.phase ?? value.stage;
  const status = typeof statusCandidate === "string" ? statusCandidate.toLowerCase() : undefined;
  const categoryCandidate = value.category ?? value.tag ?? (Array.isArray(value.tags) ? value.tags[0] : undefined);
  const category = typeof categoryCandidate === "string" ? categoryCandidate : undefined;
  const coverCandidate = value.coverImage ?? value.image ?? value.thumbnail;
  const coverImage = typeof coverCandidate === "string" ? coverCandidate : undefined;
  const createdAt = parseDate(value.createdAt ?? value.created_at ?? value.publishedAt ?? value.startTime);
  const updatedAt = parseDate(value.updatedAt ?? value.updated_at ?? value.lastUpdated ?? value.modifiedAt);

  const totalLikes = toNumber(
    value.totalLikes ??
      value.likes ??
      value.likeCount ??
      (value.metrics as Record<string, unknown>)?.likes ??
      0
  );
  const totalBackers = toNumber(
    value.totalBackers ??
      value.backers ??
      value.supporters ??
      value.supporterCount ??
      (value.metrics as Record<string, unknown>)?.backers ??
      0
  );

  return {
    id,
    title,
    summary,
    status,
    createdAt,
    updatedAt,
    category,
    coverImage,
    totalLikes,
    totalBackers
  };
}

export function normaliseProposalDetail(input: unknown): GovernanceProposalDetail | null {
  const summary = normaliseProposalSummary(input);
  if (!summary) return null;

  const value = (input as Record<string, unknown>) ?? {};
  const contentCandidate = value.content ?? value.body ?? value.description ?? value.markdown;
  const content = typeof contentCandidate === "string" ? contentCandidate : undefined;
  const htmlCandidate = value.html ?? value.bodyHtml ?? value.renderedHtml;
  const html = typeof htmlCandidate === "string" ? htmlCandidate : undefined;
  const authorCandidate = value.author ?? value.owner ?? value.creator;
  const author = typeof authorCandidate === "string" ? authorCandidate : undefined;
  const likeSnapshot = normaliseLikeSnapshot(value.likeSnapshot ?? value.likes ?? value.snapshot, summary.id);
  const user = normaliseUserState(value.viewer ?? value.user ?? value.currentUser ?? value.account);
  const links = normaliseLinks(value.links ?? value.resources ?? value.attachments);

  return {
    ...summary,
    content,
    html,
    author,
    links,
    likeSnapshot,
    user
  };
}

export async function fetchGovernanceJson<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const url = buildGovernanceUrl(path);
  if (!url) {
    throw new Error("GOVERNANCE_API_UNCONFIGURED");
  }

  const headers = new Headers(init?.headers);
  const governanceApiKey = getEnv("governanceApiKey");
  if (governanceApiKey) {
    const governanceApiKeyHeader = getEnv("governanceApiKeyHeader") || "x-api-key";
    headers.set(governanceApiKeyHeader, governanceApiKey);
  }

  const response = await fetch(url, {
    ...init,
    headers,
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function forwardGovernanceRequest<T = unknown>(
  path: string,
  init: RequestInit & { headers?: HeadersInit } = {},
  requestHeaders?: Headers
): Promise<T> {
  const url = buildGovernanceUrl(path);
  if (!url) {
    throw new Error("GOVERNANCE_API_UNCONFIGURED");
  }

  const headers = new Headers(init.headers);

  if (requestHeaders) {
    const allowed = ["authorization", "x-api-key"]; // forward auth headers when present
    for (const header of allowed) {
      const value = requestHeaders.get(header);
      if (value) {
        headers.set(header, value);
      }
    }
  }

  const governanceApiKey = getEnv("governanceApiKey");
  if (governanceApiKey) {
    const governanceApiKeyHeader = getEnv("governanceApiKeyHeader") || "x-api-key";
    headers.set(governanceApiKeyHeader, governanceApiKey);
  }

  if (init.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  const response = await fetch(url, {
    ...init,
    headers,
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}
