"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "@/config/env";
import type { PeaceFundResolution } from "@/lib/peaceFund";

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

export function usePeaceFundAddress(): PeaceFundQueryResult {
  const shouldResolve = !env.peaceFund || env.peaceFund.toLowerCase() === "auto";

  const query = useQuery({
    queryKey: ["peace-fund-address"],
    queryFn: fetchPeaceFund,
    staleTime: 5 * 60 * 1000,
    refetchInterval: shouldResolve ? 5 * 60 * 1000 : false,
    enabled: shouldResolve
  });

  const peaceFund = shouldResolve ? query.data?.address ?? "" : env.peaceFund;
  const source = shouldResolve ? query.data?.source ?? null : "env:NEXT_PUBLIC_PEACE_FUND";

  return {
    peaceFund,
    source,
    isLoading: shouldResolve ? query.isLoading || query.isFetching : false,
    error: (query.error as Error) ?? null
  };
}
