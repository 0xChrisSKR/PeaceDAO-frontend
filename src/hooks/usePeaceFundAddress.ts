"use client";

import { useQuery } from "@tanstack/react-query";
import { getEnv } from "@/lib/getEnv";

interface PeaceFundQueryResult {
  address?: string;
  isLoading: boolean;
  error: Error | null;
}

export function usePeaceFundAddress(): PeaceFundQueryResult {
  // 允許 PEACE_FUND / NEXT_PUBLIC_PEACE_FUND / DONATE_ADDRESS
  const configured = getEnv("PEACE_FUND") || getEnv("DONATE_ADDRESS");
  const shouldResolve = !configured || configured.toLowerCase() === "auto";

  const query = useQuery({
    queryKey: ["peace-fund-address"],
    queryFn: async () => {
      if (!shouldResolve && configured) return { address: configured };
      try {
        const res = await fetch("/api/demo/donate").then((r) => r.json());
        return {
          address: res?.address || "0x000000000000000000000000000000000000dEaD"
        };
      } catch {
        return { address: "0x000000000000000000000000000000000000dEaD" };
      }
    },
    staleTime: 30_000
  });

  return {
    address: query.data?.address,
    isLoading: query.isLoading,
    error: (query.error as Error) ?? null
  };
}
