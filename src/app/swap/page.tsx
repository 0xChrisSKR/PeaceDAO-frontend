"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import type { Address } from "viem";
import { isAddress, decodeEventLog, maxUint256, formatUnits } from "viem";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import env from "@/config/env";
import { DEFAULT_CHAIN, bsc, bscTestnet } from "@/config/chains";
import erc20Abi from "@/abi/erc20.json";
import routerAbi from "@/abi/peaceSwapRouter.json";
import { parseByDecimals, formatNumber } from "@/lib/format";
import { useTokenBalance } from "@/hooks/useTokenBalance";

interface TokenMeta {
  symbol: string;
  decimals: number;
}

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient();

  const [tokenIn, setTokenIn] = useState<string>("");
  const [tokenOut, setTokenOut] = useState<string>("");
  const [amountIn, setAmountIn] = useState<string>("");
  const [minOut, setMinOut] = useState<string>("");
  const [slippageBps, setSlippageBps] = useState<number>(env.defaultSlippageBps);
  const [deadlineSecs, setDeadlineSecs] = useState<number>(env.defaultDeadlineSecs);
  const [swapLogs, setSwapLogs] = useState<string[]>([]);
  const [isApproving, setApproving] = useState(false);
  const [isSwapping, setSwapping] = useState(false);

  const routerAddress = (env.peaceSwapRouter && isAddress(env.peaceSwapRouter) ? (env.peaceSwapRouter as Address) : undefined);

  useEffect(() => {
    if (chainId === bsc.id) {
      setTokenIn(env.tokenInMainnet);
      setTokenOut(env.tokenOutMainnet);
    } else if (chainId === bscTestnet.id) {
      setTokenIn(env.tokenInTestnet);
      setTokenOut(env.tokenOutTestnet);
    } else if (DEFAULT_CHAIN.id === bscTestnet.id) {
      setTokenIn(env.tokenInTestnet);
      setTokenOut(env.tokenOutTestnet);
    } else {
      setTokenIn(env.tokenInMainnet);
      setTokenOut(env.tokenOutMainnet);
    }
  }, [chainId]);

  const normalizedTokenIn = tokenIn.trim();
  const normalizedTokenOut = tokenOut.trim();

  const { data: tokenInMeta } = useQuery<TokenMeta>({
    queryKey: ["token-meta", chainId, normalizedTokenIn, "in"],
    enabled: Boolean(publicClient && isAddress(normalizedTokenIn)),
    queryFn: async () => {
      if (!publicClient) throw new Error("public client unavailable");
      const [decimals, symbol] = await Promise.all([
        publicClient.readContract({
          address: normalizedTokenIn as Address,
          abi: erc20Abi,
          functionName: "decimals"
        }) as Promise<number>,
        publicClient.readContract({
          address: normalizedTokenIn as Address,
          abi: erc20Abi,
          functionName: "symbol"
        }) as Promise<string>
      ]);
      return { decimals, symbol };
    }
  });

  const { data: tokenOutMeta } = useQuery<TokenMeta>({
    queryKey: ["token-meta", chainId, normalizedTokenOut, "out"],
    enabled: Boolean(publicClient && isAddress(normalizedTokenOut)),
    queryFn: async () => {
      if (!publicClient) throw new Error("public client unavailable");
      const [decimals, symbol] = await Promise.all([
        publicClient.readContract({
          address: normalizedTokenOut as Address,
          abi: erc20Abi,
          functionName: "decimals"
        }) as Promise<number>,
        publicClient.readContract({
          address: normalizedTokenOut as Address,
          abi: erc20Abi,
          functionName: "symbol"
        }) as Promise<string>
      ]);
      return { decimals, symbol };
    }
  });

  const { data: allowance, refetch: refetchAllowance } = useQuery<bigint>({
    queryKey: ["allowance", chainId, normalizedTokenIn, address, routerAddress],
    enabled: Boolean(publicClient && isConnected && isAddress(normalizedTokenIn) && routerAddress),
    queryFn: async () => {
      if (!publicClient || !address || !routerAddress) return 0n;
      return (await publicClient.readContract({
        address: normalizedTokenIn as Address,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address as Address, routerAddress]
      })) as bigint;
    },
    refetchInterval: 20_000
  });

  const { data: balance } = useTokenBalance(
    isAddress(normalizedTokenIn) ? (normalizedTokenIn as Address) : undefined,
    { watch: true }
  );

  const amountInBigInt = useMemo(() => {
    if (!tokenInMeta || !amountIn) return 0n;
    try {
      return parseByDecimals(amountIn, tokenInMeta.decimals);
    } catch (error) {
      return 0n;
    }
  }, [amountIn, tokenInMeta]);

  const minOutBigInt = useMemo(() => {
    if (!tokenOutMeta || !minOut) return 0n;
    try {
      return parseByDecimals(minOut, tokenOutMeta.decimals);
    } catch (error) {
      return 0n;
    }
  }, [minOut, tokenOutMeta]);

  const slippageAdjustedMinOut = useMemo(() => {
    if (minOutBigInt === 0n) return 0n;
    const bps = BigInt(Math.max(0, slippageBps));
    return (minOutBigInt * (10_000n - bps)) / 10_000n;
  }, [minOutBigInt, slippageBps]);

  const needsApproval = useMemo(() => {
    if (!isAddress(normalizedTokenIn) || amountInBigInt === 0n) return false;
    if (allowance === undefined) return true;
    return allowance < amountInBigInt;
  }, [allowance, amountInBigInt, normalizedTokenIn]);

  const executeApprove = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet");
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(`Switch to ${DEFAULT_CHAIN.name} to approve`);
      return;
    }
    if (!walletClient) {
      toast.error("Wallet client unavailable");
      return;
    }
    if (!isAddress(normalizedTokenIn)) {
      toast.error("Enter a valid Token In address");
      return;
    }
    if (!routerAddress) {
      toast.error("PeaceSwap router address is not configured");
      return;
    }
    try {
      setApproving(true);
      toast.loading("Approving token...", { id: "approve" });
      const txHash = await walletClient.writeContract({
        address: normalizedTokenIn as Address,
        abi: erc20Abi,
        functionName: "approve",
        args: [routerAddress, maxUint256],
        account: address as Address
      });
      toast.success(`Approval tx: ${txHash.slice(0, 10)}…`, { id: "approve" });
      await publicClient?.waitForTransactionReceipt({ hash: txHash });
      toast.success("Approval confirmed", { id: "approve" });
      await refetchAllowance();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.shortMessage ?? error?.message ?? "Approval failed", { id: "approve" });
    } finally {
      setApproving(false);
    }
  };

  const executeSwap = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet");
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(`Switch to ${DEFAULT_CHAIN.name} to swap`);
      return;
    }
    if (!walletClient) {
      toast.error("Wallet client unavailable");
      return;
    }
    if (!tokenInMeta || !tokenOutMeta) {
      toast.error("Unable to load token metadata");
      return;
    }
    if (!isAddress(normalizedTokenIn) || !isAddress(normalizedTokenOut)) {
      toast.error("Enter valid token addresses");
      return;
    }
    if (amountInBigInt <= 0n) {
      toast.error("Enter an amount greater than zero");
      return;
    }
    if (balance && amountInBigInt > balance) {
      toast.error("Insufficient balance");
      return;
    }
    if (deadlineSecs < 60) {
      toast.error("Deadline should be at least 60 seconds");
      return;
    }
    if (!routerAddress) {
      toast.error("PeaceSwap router address is not configured");
      return;
    }
    if (slippageAdjustedMinOut <= 0n) {
      toast.error("Set a minimum amount out");
      return;
    }

    const deadline = BigInt(Math.floor(Date.now() / 1000) + deadlineSecs);

    try {
      setSwapping(true);
      setSwapLogs([]);
      toast.loading("Submitting swap...", { id: "swap" });
      const txHash = await walletClient.writeContract({
        address: routerAddress,
        abi: routerAbi,
        functionName: "swapExactTokensForTokensWithFee",
        args: [
          amountInBigInt,
          slippageAdjustedMinOut,
          [normalizedTokenIn as Address, normalizedTokenOut as Address],
          address as Address,
          deadline
        ],
        account: address as Address
      });
      toast.success(`Swap tx: ${txHash.slice(0, 10)}…`, { id: "swap" });
      const receipt = await publicClient?.waitForTransactionReceipt({ hash: txHash });
      toast.success("Swap confirmed", { id: "swap" });
      if (receipt?.logs?.length) {
        const logMessages: string[] = [];
        for (const log of receipt.logs) {
          try {
            const decoded = decodeEventLog({ abi: routerAbi, data: log.data, topics: log.topics });
            if (decoded.eventName === "SwapWithFee") {
              const { amountIn: loggedIn, amountOut, fee } = decoded.args as {
                amountIn?: bigint;
                amountOut?: bigint;
                fee?: bigint;
              };
              if (typeof loggedIn !== "bigint" || typeof amountOut !== "bigint" || typeof fee !== "bigint") continue;
              const formattedIn = formatNumber(Number(formatUnits(loggedIn, tokenInMeta.decimals)), 4);
              const formattedOut = formatNumber(Number(formatUnits(amountOut, tokenOutMeta.decimals)), 4);
              const formattedFee = formatNumber(Number(formatUnits(fee, tokenInMeta.decimals)), 4);
              logMessages.push(
                `SwapWithFee: in ${formattedIn} ${tokenInMeta.symbol}, out ${formattedOut} ${tokenOutMeta.symbol}, fee ${formattedFee}`
              );
            }
          } catch (error) {
            continue;
          }
        }
        setSwapLogs(logMessages);
      }
      setAmountIn("");
      setMinOut("");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.shortMessage ?? error?.message ?? "Swap failed", { id: "swap" });
    } finally {
      setSwapping(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">PeaceSwap Router</h1>
        <p className="mt-2 text-sm text-slate-300">
          Swap tokens while contributing a {env.swapFeeBps / 100}% fee to PeaceDAO (80% DAO, 20% founder).
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <div className="mb-4 rounded-lg border border-brand/30 bg-brand/10 p-3 text-xs text-brand-light">
          This router charges a {env.swapFeeBps / 100}% fee; plan for slippage and keep BNB for gas.
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300">Token In</label>
              <input
                value={tokenIn}
                onChange={(event) => setTokenIn(event.target.value)}
                placeholder="0x..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300">Token Out</label>
              <input
                value={tokenOut}
                onChange={(event) => setTokenOut(event.target.value)}
                placeholder="0x..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300">Amount In</label>
              <input
                type="number"
                min="0"
                step="0.0001"
                value={amountIn}
                onChange={(event) => setAmountIn(event.target.value)}
                placeholder="0.0"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
              <p className="text-xs text-slate-400">
                Balance: {balance ? formatNumber(Number(balance) / 10 ** (tokenInMeta?.decimals ?? 18), 4) : "-"} {tokenInMeta?.symbol}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300">Min Amount Out (before slippage)</label>
              <input
                type="number"
                min="0"
                step="0.0001"
                value={minOut}
                onChange={(event) => setMinOut(event.target.value)}
                placeholder="0.0"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
            </div>
            <div className="text-xs text-slate-400">
              Slippage adjusted minimum: {slippageAdjustedMinOut ? formatNumber(Number(slippageAdjustedMinOut) / 10 ** (tokenOutMeta?.decimals ?? 18), 6) : "-"} {tokenOutMeta?.symbol}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300">Slippage (bps)</label>
              <input
                type="number"
                min="0"
                value={slippageBps}
                onChange={(event) => setSlippageBps(Number(event.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300">Deadline (seconds)</label>
              <input
                type="number"
                min="60"
                value={deadlineSecs}
                onChange={(event) => setDeadlineSecs(Number(event.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {needsApproval ? (
              <button
                onClick={executeApprove}
                disabled={isApproving || !amountInBigInt}
                className="flex-1 rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                {isApproving ? "Approving..." : "Approve TokenIn"}
              </button>
            ) : null}
            <button
              onClick={executeSwap}
              disabled={isSwapping || !amountInBigInt || needsApproval}
              className="flex-1 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light"
            >
              {isSwapping ? "Swapping..." : "Swap"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
        <p>
          Router Address: <span className="font-mono text-slate-100">{routerAddress}</span>
        </p>
        <p className="mt-2">
          Keep a small BNB balance to cover gas. Without a valid PeaceSwap router deployment, this interface will not execute.
        </p>
        {swapLogs.length > 0 && (
          <div className="mt-4 space-y-2">
            {swapLogs.map((log, index) => (
              <div key={index} className="rounded-md border border-brand/30 bg-brand/5 p-3 text-xs text-brand-light">
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
