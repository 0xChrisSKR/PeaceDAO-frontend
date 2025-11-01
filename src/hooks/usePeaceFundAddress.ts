"use client";

import { useQuery } from "@tanstack/react-query";
import type { PeaceFundResolution } from "@/lib/peaceFund";
import { getEnv } from "@/lib/getEnv";

interface PeaceFundQueryResult {
  peaceFund: string;
  source?: string | null;
  isLoading: boolean;
  error: Error | null;
}

async function fetchPeaceFund(): Promise<PeaceFundResolution> {
  const response = await fetch("/api/peace/config", { cache: "no-store" });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to resolve PeaceFund");
  }
  const data = (await response.json()) as PeaceFundResolution & { ok?: boolean };
  return {
    address: data.address,
    source: typeof data.source === "string" ? data.source : undefined
  };
}

interface ConfiguredPeaceFund {
  value: string;
  source: string | null;
}

function resolveConfiguredPeaceFund(): ConfiguredPeaceFund | null {
  const candidates: Array<ConfiguredPeaceFund | null> = [
    (() => {
      const value = getEnv("PEACE_FUND");
      return value ? { value: value.trim(), source: "env:PEACE_FUND" } : null;
    })(),
    (() => {
      const value = getEnv("DONATE_ADDRESS");
      return value ? { value: value.trim(), source: "env:DONATE_ADDRESS" } : null;
    })()
  ];

  for (const candidate of candidates) {
    if (candidate && candidate.value) {
      return candidate;
    }
  }

  return null;
}

export function usePeaceFundAddress(): PeaceFundQueryResult {
  const configured = resolveConfiguredPeaceFund();
  const normalized = configured?.value ?? "";
  const shouldResolve = !normalized || normalized.toLowerCase() === "auto";

  const query = useQuery({
    queryKey: ["peace-fund-address"],
    queryFn: fetchPeaceFund,
    staleTime: 5 * 60 * 1000,
    refetchInterval: shouldResolve ? 5 * 60 * 1000 : false,
    enabled: shouldResolve
  });

  const peaceFund = shouldResolve ? query.data?.address ?? "" : normalized;
  const source = shouldResolve ? query.data?.source ?? null : configured?.source ?? null;

  return {
    peaceFund,
    source,
    isLoading: shouldResolve ? query.isLoading || query.isFetching : false,
    error: (query.error as Error) ?? null
  };
}
