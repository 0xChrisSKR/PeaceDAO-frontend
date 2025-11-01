import { env } from "@/config/env";
import { isAddress } from "viem";

// Prefer public env for client, fallback to server env.
const rawPeaceFund =
  process.env.NEXT_PUBLIC_PEACE_FUND ||
  process.env.PEACE_FUND ||
  "";

// Keep lowercasing for comparisons only; don't use lowercased value for display.
const peaceFund = rawPeaceFund.trim();

const peaceFundForCompare = peaceFund.toLowerCase();

const rawPeaceFundHints = (env as { peaceFundHints?: string | string[] }).peaceFundHints;

const peaceFundHints = Array.isArray(rawPeaceFundHints)
  ? rawPeaceFundHints
  : typeof rawPeaceFundHints === "string" && rawPeaceFundHints
    ? [rawPeaceFundHints]
    : [];

export interface PeaceFundResolution {
  address: string;
  source?: string;
}

function isAddressLike(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("0x") && isAddress(value as `0x${string}`);
}

function buildUrl(base: string | undefined, path: string): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalizedBase = base?.replace(/\/$/, "");
  if (!normalizedBase) return undefined;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function extractPeaceFund(value: unknown): string | null {
  if (!value) return null;
  if (isAddressLike(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      const found = extractPeaceFund(entry);
      if (found) return found;
    }
    return null;
  }
  if (typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const directKeys = [
    "peaceFund",
    "PeaceFund",
    "peace_fund",
    "contract",
    "contractAddress",
    "address",
    "treasury",
    "vault"
  ];

  for (const key of directKeys) {
    if (record[key]) {
      const found = extractPeaceFund(record[key]);
      if (found) return found;
    }
  }

  const nestedKeys = ["contracts", "addresses", "deployments", "networks", "targets", "result"];
  for (const key of nestedKeys) {
    if (record[key]) {
      const found = extractPeaceFund(record[key]);
      if (found) return found;
    }
  }

  return null;
}

export async function resolvePeaceFundAddress(): Promise<PeaceFundResolution> {
  const direct = peaceFund;
  if (direct && peaceFundForCompare !== "auto" && isAddressLike(direct)) {
    return { address: direct, source: "env:NEXT_PUBLIC_PEACE_FUND" };
  }

  const hints = new Set<string>();
  for (const hint of peaceFundHints) {
    hints.add(hint);
  }

  if (direct && peaceFundForCompare !== "auto") {
    hints.add(direct);
  }

  if (env.demoApiBase) {
    const configUrl = buildUrl(env.demoApiBase, env.demoConfigPath);
    if (configUrl) hints.add(configUrl);
  }

  for (const hint of hints) {
    if (!hint) continue;
    if (isAddressLike(hint)) {
      return { address: hint, source: `inline:${hint}` };
    }

    const url = buildUrl(env.demoApiBase, hint) ?? hint;
    if (!url) continue;

    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        continue;
      }
      const data = await response.json();
      const address = extractPeaceFund(data);
      if (address) {
        return { address, source: url };
      }
    } catch {
      continue;
    }
  }

  const fallbackAddress =
    direct && peaceFundForCompare !== "auto" && isAddressLike(direct) ? direct : "";

  return {
    address: fallbackAddress,
    source: fallbackAddress ? "env:NEXT_PUBLIC_PEACE_FUND" : undefined
  };
}
