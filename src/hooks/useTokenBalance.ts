import { useAccount, useChainId, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";
import erc20 from "@/abi/erc20.json";
import { DEFAULT_CHAIN } from "@/config/chains";

export function useTokenBalance(token?: Address, options?: { watch?: boolean }) {
  const { address } = useAccount();
  const chainId = useChainId();
  const effectiveChainId = chainId || DEFAULT_CHAIN.id;
  const client = usePublicClient({ chainId: effectiveChainId });
  const watch = options?.watch ?? true;

  return useQuery({
    queryKey: ["token-balance", chainId, token, address],
    queryFn: async () => {
      if (!client || !address || !token) return 0n;
      return (await client.readContract({
        address: token,
        abi: erc20,
        functionName: "balanceOf",
        args: [address]
      })) as bigint;
    },
    enabled: Boolean(client && address && token),
    refetchInterval: watch ? 15_000 : false
  });
}
