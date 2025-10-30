"use client";

import { useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import { erc20Abi } from "@/abis/ERC20";

export function useTokenBalance(token?: `0x${string}`) {
  const { address } = useAccount();

  const decimalsQuery = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: "decimals",
    query: { enabled: !!token }
  });

  const balanceQuery = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!token && !!address }
  });

  const decimals = (decimalsQuery.data as number | undefined) ?? 18;
  const raw = balanceQuery.data as bigint | undefined;

  const value = useMemo(() => {
    if (!raw) return undefined;
    return Number(raw) / 10 ** decimals;
  }, [raw, decimals]);

  return {
    address,
    decimals,
    raw,
    value,
    isLoading: decimalsQuery.isLoading || balanceQuery.isLoading,
    isConnected: !!address
  };
}
