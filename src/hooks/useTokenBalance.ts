import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";

// 急救版：直接回傳 0n，避免錢包相關相依
export function useTokenBalance(_token?: Address, _options?: { watch?: boolean }) {
  return useQuery({
    queryKey: ["token-balance", "disabled"],
    queryFn: async () => 0,
    enabled: false,
    initialData: 0
  });
}
