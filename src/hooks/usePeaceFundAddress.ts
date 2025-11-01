// src/hooks/usePeaceFundAddress.ts
import { useQuery } from "@tanstack/react-query";
import { resolvePeaceFundAddress } from "@/lib/peaceFund";

export interface PeaceFundQueryResult {
  address: string;
  source: string;
  isLoading: boolean;
  error?: string;
}

export function usePeaceFundAddress(): PeaceFundQueryResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["peaceFundAddress"],
    queryFn: resolvePeaceFundAddress,
  });

  return {
    address: data?.address || "0x0000000000000000000000000000000000000000",
    source: data?.source || "auto",
    isLoading,
    error: error ? String(error) : undefined,
  };
}
