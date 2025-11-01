"use client";

import { useQuery } from "@tanstack/react-query";
import type { PeaceFundResolution } from "@/lib/peaceFund";

interface PeaceFundQueryResult {
  peaceFund: string | undefined;
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

export function usePeaceFundAddress(): PeaceFundQueryResult {
  // Prefer public env for client, fallback to server env.
  const rawPeaceFund =
    process.env.NEXT_PUBLIC_PEACE_FUND ||
    process.env.PEACE_FUND ||
    "";

  // Keep lowercasing for comparisons only; don't use lowercased value for display.
  const peaceFund = rawPeaceFund.trim();

  // if you previously did `peaceFund.toLowerCase()` replace usages with:
  const peaceFundForCompare = peaceFund.toLowerCase();

  if (!peaceFund) {
    // In CI/build we want to fail early, but in client, just return undefined to avoid crash.
    if (typeof window === "undefined") {
      throw new Error("PEACE_FUND/NEXT_PUBLIC_PEACE_FUND is not set");
    }
    return {
      peaceFund: undefined,
      source: null,
      isLoading: false,
      error: new Error("PEACE_FUND/NEXT_PUBLIC_PEACE_FUND is not set")
    };
  }

  const shouldResolve = peaceFundForCompare === "auto";

  const query = useQuery({
    queryKey: ["peace-fund-address"],
    queryFn: fetchPeaceFund,
    staleTime: 5 * 60 * 1000,
    refetchInterval: shouldResolve ? 5 * 60 * 1000 : false,
    enabled: shouldResolve
  });

  const resolvedPeaceFund = shouldResolve ? query.data?.address ?? "" : peaceFund;
  const source = shouldResolve ? query.data?.source ?? null : "env:NEXT_PUBLIC_PEACE_FUND";

  return {
    peaceFund: resolvedPeaceFund || undefined,
    source,
    isLoading: shouldResolve ? query.isLoading || query.isFetching : false,
    error: (query.error as Error) ?? null
  };
}
