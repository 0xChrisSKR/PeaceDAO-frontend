import { getEnv } from "@/lib/getEnv";
import { isAddress } from "viem";

export interface PeaceFundResolution {
  address: string;
  source?: string;
}

const FALLBACK_ADDRESS = "0x000000000000000000000000000000000000dEaD";

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

function parseHints(): string[] {
  const hints = new Set<string>();
  const rawHints = getEnv("PEACE_FUND_HINTS");
  if (rawHints) {
    for (const entry of rawHints.split(/[\n,]/)) {
      const trimmed = entry.trim();
      if (trimmed) hints.add(trimmed);
    }
  }

  const demoBase = getEnv("DEMO_API_BASE");
  const demoConfigPath = getEnv("DEMO_CONFIG_PATH") || "/peace/config";
  const donatePath = getEnv("DEMO_DONATE_PATH") || "/donate";

  const demoConfigUrl = buildUrl(demoBase, demoConfigPath);
  if (demoConfigUrl) hints.add(demoConfigUrl);
  const donateUrl = buildUrl(demoBase, donatePath);
  if (donateUrl) hints.add(donateUrl);

  const governanceApi = getEnv("GOVERNANCE_API");
  if (governanceApi) {
    const donateFromGovernance = buildUrl(governanceApi, "/donate");
    if (donateFromGovernance) hints.add(donateFromGovernance);
  }

  const result: string[] = [];
  for (const hint of hints) {
    if (hint) {
      result.push(hint);
    }
  }
  return result;
}

export async function resolvePeaceFundAddress(): Promise<PeaceFundResolution> {
  const envCandidates: Array<{ value: string | undefined; source: string }> = [
    { value: getEnv("PEACE_FUND"), source: "env:PEACE_FUND" },
    { value: getEnv("DONATE_ADDRESS"), source: "env:DONATE_ADDRESS" }
  ];

  for (const candidate of envCandidates) {
    const value = candidate.value?.trim();
    if (!value || value.toLowerCase() === "auto") continue;
    if (isAddressLike(value)) {
      return { address: value, source: candidate.source };
    }
  }

  for (const hint of parseHints()) {
    const normalized = String(hint).trim();
    if (!normalized) continue;

    if (isAddressLike(normalized)) {
      return { address: normalized, source: `inline:${normalized}` };
    }

    const url = /^https?:\/\//i.test(normalized) ? normalized : undefined;
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

  return { address: FALLBACK_ADDRESS, source: undefined };
}
