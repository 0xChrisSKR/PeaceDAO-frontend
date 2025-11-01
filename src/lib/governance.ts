// src/lib/governance.ts
import type { LikeSnapshot, UserLikeState } from "@/types/like";

/** ---------------- Types ---------------- */
export interface GovernanceProposalLink { label: string; url: string; }
export interface GovernanceProposalSummary {
  id: string; title: string; summary?: string; status?: string;
  createdAt?: string; updatedAt?: string; category?: string; coverImage?: string;
  totalLikes?: number; totalBackers?: number;
}
export interface GovernanceProposalDetail extends GovernanceProposalSummary {
  content?: string; html?: string; author?: string; links?: GovernanceProposalLink[];
  likeSnapshot: LikeSnapshot; user: UserLikeState;
}

/** ---------------- Utils ---------------- */
const NUMBER_FALLBACK = 0;
function toNumber(v: unknown){ if(typeof v==='number'&&Number.isFinite(v))return v; if(typeof v==='string'){const n=Number(v); if(Number.isFinite(n))return n;} return NUMBER_FALLBACK; }
function parseDate(v: unknown){ if(typeof v==='number'&&Number.isFinite(v)) return new Date(v).toISOString(); if(typeof v==='string'&&v){ const t=Date.parse(v); if(!Number.isNaN(t)) return new Date(t).toISOString(); } return undefined; }

/** Base URL from env (optional). Empty string = use relative path */
function buildGovernanceBase(): string {
  return (process.env.NEXT_PUBLIC_GOVERNANCE_API || "").trim();
}
export function buildGovernanceUrl(path: string): string {
  if(!path) return "";
  if(path.startsWith("http://")||path.startsWith("https://")) return path;
  const base = buildGovernanceBase();                 // might be ""
  const normalizedBase = base.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}
export function getPeaceConfigUrl(): string {
  const p = (process.env.NEXT_PUBLIC_PEACEDAO_CONFIG_PATH || "/config").trim();
  return buildGovernanceUrl(p);
}

/** Optional API key/header (public-safe). If undefined, we simply don't send it. */
function getApiAuth() {
  const key = (process.env.NEXT_PUBLIC_GOVERNANCE_API_KEY || "").trim();
  const header = (process.env.NEXT_PUBLIC_GOVERNANCE_API_KEY_HEADER || "x-api-key").trim();
  return { key: key || undefined, header };
}

/** ---------------- Links normalisers ---------------- */
function normaliseLink(entry: unknown): GovernanceProposalLink | null {
  if (typeof entry === "string") return { label: entry, url: entry };
  if (!entry || typeof entry !== "object") return null;
  const r = entry as Record<string, unknown>;
  const url = r.url ?? r.href ?? r.link ?? r.value;
  if (typeof url !== "string") return null;
  const lab = r.label ?? r.title ?? r.name;
  const label = typeof lab === "string" && lab ? lab : url;
  return { label, url };
}
function normaliseLinks(input: unknown): GovernanceProposalLink[] | undefined {
  if (!input) return undefined;
  const links: GovernanceProposalLink[] = [];
  if (Array.isArray(input)) for (const e of input){ const l=normaliseLink(e); if(l) links.push(l); }
  else if (typeof input === "object"){ const rec=input as Record<string, unknown>; for (const [k,v] of Object.entries(rec)){ const l=normaliseLink({label:k,url:v}); if(l) links.push(l);} }
  else if (typeof input === "string") links.push({ label: input, url: input });
  return links.length ? links : undefined;
}

/** ---------------- Like / User normalisers ---------------- */
export function normaliseLikeSnapshot(input: unknown, fallbackId: string): LikeSnapshot {
  const value = (input as Record<string, unknown>) ?? {};
  const base = (value.likeSnapshot as Record<string, unknown>) ?? (value.snapshot as Record<string, unknown>) ?? (value.likes as Record<string, unknown>) ?? value;
  const totalLikes = toNumber(base.totalLikes ?? base.likes ?? base.count ?? base.total ?? 0);
  const totalBackers = toNumber(base.totalBackers ?? base.backers ?? base.supporters ?? base.totalSupporters ?? 0);

  const txHashes: string[] = [];
  if (Array.isArray(base.txHashes)) for (const h of base.txHashes){ if(typeof h==='string'&&h.startsWith('0x')) txHashes.push(h); }
  else if (Array.isArray(base.transactions)) for (const tx of base.transactions){
    if (typeof tx === "string" && tx.startsWith("0x")) txHashes.push(tx);
    else if (tx && typeof tx === "object") {
      const r = tx as Record<string, unknown>;
      const h = r.hash ?? r.txHash ?? r.transactionHash;
      if (typeof h === "string" && h.startsWith("0x")) txHashes.push(h);
    }
  }

  const proof = base.verifiedProofUrl ?? base.proofUrl ?? base.verificationUrl ?? base.verification_link;
  const verifiedProofUrl = typeof proof === "string" ? proof : undefined;

  const last = base.lastLikedAt ?? base.updatedAt ?? base.timestamp ?? base.lastLiked ?? base.lastUpdated;
  const parsedLast = typeof last === "number" ? last : (typeof last === "string" ? Date.parse(last) : undefined);

  return {
    proposalId: typeof base.proposalId === "string" && base.proposalId ? base.proposalId : fallbackId,
    totalLikes, totalBackers,
    txHashes: txHashes.length ? txHashes : undefined,
    verifiedProofUrl,
    lastLikedAt: (typeof parsedLast === "number" && Number.isFinite(parsedLast)) ? parsedLast : undefined
  };
}
export function normaliseUserState(input: unknown): UserLikeState {
  const v = (input as Record<string, unknown>) ?? {};
  const roles = Array.isArray(v.roles) ? v.roles.map((r)=>String(r).toLowerCase()) : [];
  const hasLiked = Boolean(v.hasLiked ?? v.liked ?? v.viewerHasLiked ?? v.userHasLiked ?? v.hasSupported);
  const isVerifier = Boolean(v.isVerifier ?? v.verifier ?? v.canVerify ?? roles.some((r)=>r.includes('verify')));
  return { hasLiked, isVerifier };
}

/** ---------------- Proposal normalisers ---------------- */
export function normaliseProposalSummary(input: unknown): GovernanceProposalSummary | null {
  if (!input || typeof input !== "object") return null;
  const v = input as Record<string, unknown>;
  const idc = v.id ?? v.proposalId ?? v.slug ?? v.uuid ?? v.identifier;
  if (typeof idc !== "string" && typeof idc !== "number") return null;
  const id = String(idc);
  const titlec = v.title ?? v.name ?? v.headline ?? `Proposal ${id}`;
  const title = typeof titlec === "string" ? titlec : `Proposal ${id}`;
  const summaryc = v.summary ?? v.excerpt ?? v.description ?? v.body;
  const summary = typeof summaryc === "string" ? summaryc : undefined;
  const statusc = v.status ?? v.state ?? v.phase ?? v.stage;
  const status = typeof statusc === "string" ? statusc.toLowerCase() : undefined;
  const catc = v.category ?? v.tag ?? (Array.isArray(v.tags) ? v.tags[0] : undefined);
  const category = typeof catc === "string" ? catc : undefined;
  const coverc = v.coverImage ?? v.image ?? v.thumbnail;
  const coverImage = typeof coverc === "string" ? coverc : undefined;
  const createdAt = parseDate(v.createdAt ?? v.created_at ?? v.publishedAt ?? v.startTime);
  const updatedAt = parseDate(v.updatedAt ?? v.updated_at ?? v.lastUpdated ?? v.modifiedAt);
  const totalLikes = toNumber(v.totalLikes ?? v.likes ?? v.likeCount ?? (v.metrics as Record<string, unknown>)?.likes ?? 0);
  const totalBackers = toNumber(v.totalBackers ?? v.backers ?? v.supporters ?? v.supporterCount ?? (v.metrics as Record<string, unknown>)?.backers ?? 0);
  return { id, title, summary, status, createdAt, updatedAt, category, coverImage, totalLikes, totalBackers };
}
export function normaliseProposalDetail(input: unknown): GovernanceProposalDetail | null {
  const summary = normaliseProposalSummary(input);
  if (!summary) return null;
  const v = (input as Record<string, unknown>) ?? {};
  const contentc = v.content ?? v.body ?? v.description ?? v.markdown;
  const content = typeof contentc === "string" ? contentc : undefined;
  const htmlc = v.html ?? v.bodyHtml ?? v.renderedHtml;
  const html = typeof htmlc === "string" ? htmlc : undefined;
  const authorc = v.author ?? v.owner ?? v.creator;
  const author = typeof authorc === "string" ? authorc : undefined;
  const likeSnapshot = normaliseLikeSnapshot(v.likeSnapshot ?? v.likes ?? v.snapshot, summary.id);
  const user = normaliseUserState(v.viewer ?? v.user ?? v.currentUser ?? v.account);
  const links = normaliseLinks(v.links ?? v.resources ?? v.attachments);
  return { ...summary, content, html, author, links, likeSnapshot, user };
}

/** ---------------- Fetch helpers (no env typing) ---------------- */
export async function fetchGovernanceJson<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const url = buildGovernanceUrl(path);
  if (!url) throw new Error("GOVERNANCE_API_UNCONFIGURED");

  const headers = new Headers(init?.headers);
  const { key, header } = getApiAuth();
  if (key) headers.set(header, key);

  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  if (!res.ok) { const text = await res.text(); throw new Error(text || `Request failed with status ${res.status}`); }
  return res.json() as Promise<T>;
}

export async function forwardGovernanceRequest<T = unknown>(
  path: string,
  init: RequestInit & { headers?: HeadersInit } = {},
  requestHeaders?: Headers
): Promise<T> {
  const url = buildGovernanceUrl(path);
  if (!url) throw new Error("GOVERNANCE_API_UNCONFIGURED");

  const headers = new Headers(init.headers);

  // forward selected headers from incoming request
  if (requestHeaders) {
    const allowed = ["authorization", "x-api-key"];
    for (const h of allowed) {
      const v = requestHeaders.get(h);
      if (v) headers.set(h, v);
    }
  }

  // optional static api key from env
  const { key, header } = getApiAuth();
  if (key) headers.set(header, key);

  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");

  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  if (!res.ok) { const text = await res.text(); throw new Error(text || `Request failed with status ${res.status}`); }
  if (res.status === 204) return {} as T;
  return res.json() as Promise<T>;
}
