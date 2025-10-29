"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import type { Address } from "viem";
import { isAddress, decodeEventLog, maxUint256, formatUnits } from "viem";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Trans, useTranslation } from "next-i18next";

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
  const { t } = useTranslation();

  const [tokenIn, setTokenIn] = useState<string>("");
  const [tokenOut, setTokenOut] = useState<string>("");
  const [amountIn, setAmountIn] = useState<string>("");
  const [minOut, setMinOut] = useState<string>("");
  const [slippageBps, setSlippageBps] = useState<number>(env.defaultSlippageBps);
  const [deadlineSecs, setDeadlineSecs] = useState<number>(env.defaultDeadlineSecs);
  const [swapLogs, setSwapLogs] = useState<string[]>([]);
  const [isApproving, setApproving] = useState(false);
  const [isSwapping, setSwapping] = useState(false);

  const routerAddress = useMemo(() => {
    if (!env.peaceSwapRouter) return undefined;
    return isAddress(env.peaceSwapRouter) ? (env.peaceSwapRouter as Address) : undefined;
  }, []);

  const isRouterConfigured = Boolean(routerAddress);

  const defaultPair = useMemo(() => {
    const tokenInAddress = env.peaceToken ?? "";
    const wbnbMain = env.wbnbMainnet ?? "";
    const wbnbTest = env.wbnbTestnet ?? "";

    if (chainId === bsc.id) {
      return { tokenIn: tokenInAddress, tokenOut: wbnbMain };
    }
    if (chainId === bscTestnet.id) {
      return { tokenIn: tokenInAddress, tokenOut: wbnbTest || wbnbMain };
    }
    if (DEFAULT_CHAIN.id === bsc.id) {
      return { tokenIn: tokenInAddress, tokenOut: wbnbMain };
    }
    return { tokenIn: tokenInAddress, tokenOut: wbnbTest || wbnbMain };
  }, [chainId]);

  useEffect(() => {
    setTokenIn(defaultPair.tokenIn ?? "");
    setTokenOut(defaultPair.tokenOut ?? "");
  }, [defaultPair.tokenIn, defaultPair.tokenOut]);

  const normalizedTokenIn = tokenIn.trim();
  const normalizedTokenOut = tokenOut.trim();

  const { data: tokenInMeta } = useQuery<TokenMeta>({
    queryKey: ["token-meta", chainId, normalizedTokenIn, "in"],
    enabled: Boolean(publicClient && isAddress(normalizedTokenIn)),
    queryFn: async () => {
      if (!publicClient) throw new Error(t("common.errors.publicClientUnavailable"));
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
      if (!publicClient) throw new Error(t("common.errors.publicClientUnavailable"));
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
    if (!isRouterConfigured) return false;
    if (!isAddress(normalizedTokenIn) || amountInBigInt === 0n) return false;
    if (allowance === undefined) return true;
    return allowance < amountInBigInt;
  }, [allowance, amountInBigInt, isRouterConfigured, normalizedTokenIn]);

  const executeApprove = async () => {
    if (!isConnected || !address) {
      toast.error(t("common.errors.connectWallet"));
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(t("swap.toast.switchNetworkApprove", { chain: DEFAULT_CHAIN.name }));
      return;
    }
    if (!walletClient) {
      toast.error(t("common.errors.walletClientUnavailable"));
      return;
    }
    if (!publicClient) {
      toast.error(t("common.errors.publicClientUnavailable"));
      return;
    }
    if (!isAddress(normalizedTokenIn)) {
      toast.error(t("swap.toast.tokenInInvalid"));
      return;
    }
    if (!routerAddress) {
      toast.error(t("swap.toast.routerMissing"));
      return;
    }
    try {
      setApproving(true);
      toast.loading(t("swap.toast.approving"), { id: "approve" });
      const txHash = await walletClient.writeContract({
        address: normalizedTokenIn as Address,
        abi: erc20Abi,
        functionName: "approve",
        args: [routerAddress, maxUint256],
        account: address as Address
      });
      toast.success(t("swap.toast.approvalTx", { hash: `${txHash.slice(0, 10)}…` }), { id: "approve" });
      await publicClient?.waitForTransactionReceipt({ hash: txHash });
      toast.success(t("swap.toast.approvalSuccess"), { id: "approve" });
      await refetchAllowance();
    } catch (error: any) {
      console.error(error);
      const fallback = t("swap.toast.approvalFailed");
      const message = error?.shortMessage ?? error?.message ?? error?.cause?.shortMessage ?? fallback;
      toast.error(message, { id: "approve" });
    } finally {
      setApproving(false);
    }
  };

  const executeSwap = async () => {
    if (!isConnected || !address) {
      toast.error(t("common.errors.connectWallet"));
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(t("swap.toast.switchNetworkSwap", { chain: DEFAULT_CHAIN.name }));
      return;
    }
    if (!walletClient) {
      toast.error(t("common.errors.walletClientUnavailable"));
      return;
    }
    if (!tokenInMeta || !tokenOutMeta) {
      toast.error(t("swap.toast.metadataMissing"));
      return;
    }
    if (!isAddress(normalizedTokenIn) || !isAddress(normalizedTokenOut)) {
      toast.error(t("swap.toast.tokenAddressesInvalid"));
      return;
    }
    if (amountInBigInt <= 0n) {
      toast.error(t("common.errors.amountGreaterThanZero"));
      return;
    }
    if (balance && amountInBigInt > balance) {
      toast.error(t("swap.toast.insufficientBalance"));
      return;
    }
    if (deadlineSecs < 60) {
      toast.error(t("swap.toast.deadlineShort"));
      return;
    }
    if (!routerAddress) {
      toast.error(t("swap.toast.routerMissing"));
      return;
    }
    if (slippageAdjustedMinOut <= 0n) {
      toast.error(t("swap.toast.minOutRequired"));
      return;
    }

    const deadline = BigInt(Math.floor(Date.now() / 1000) + deadlineSecs);

    try {
      setSwapping(true);
      setSwapLogs([]);
      toast.loading(t("swap.toast.simulate"), { id: "swap" });
      try {
        await publicClient.simulateContract({
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
      } catch (error: any) {
        console.error(error);
        const fallback = t("swap.toast.simulateFailed");
        const rawMessage =
          error?.shortMessage ?? error?.message ?? error?.cause?.shortMessage ?? fallback;
        const normalizedMessage = String(rawMessage).toLowerCase();
        if (normalizedMessage.includes("liquidity")) {
          toast.error(t("swap.toast.liquidityMissing"), { id: "swap" });
        } else {
          toast.error(rawMessage, { id: "swap" });
        }
        return;
      }

      toast.loading(t("swap.toast.submitting"), { id: "swap" });
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
      toast.success(t("swap.toast.swapTx", { hash: `${txHash.slice(0, 10)}…` }), { id: "swap" });
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
      toast.success(t("swap.toast.swapConfirmed"), { id: "swap" });
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
                t("swap.logs.swapWithFee", {
                  amountIn: formattedIn,
                  tokenIn: tokenInMeta.symbol,
                  amountOut: formattedOut,
                  tokenOut: tokenOutMeta.symbol,
                  fee: formattedFee
                })
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
      const fallback = t("swap.toast.swapFailed");
      const message = error?.shortMessage ?? error?.message ?? error?.cause?.shortMessage ?? fallback;
      toast.error(message, { id: "swap" });
    } finally {
      setSwapping(false);
    }
  };

  const formattedBalance = useMemo(() => {
    if (!balance || !tokenInMeta) return null;
    try {
      return formatNumber(Number(balance) / 10 ** tokenInMeta.decimals, 4);
    } catch (error) {
      return null;
    }
  }, [balance, tokenInMeta]);

  const formattedSlippageMin = useMemo(() => {
    if (!tokenOutMeta || slippageAdjustedMinOut === 0n) return null;
    try {
      return formatNumber(Number(slippageAdjustedMinOut) / 10 ** tokenOutMeta.decimals, 6);
    } catch (error) {
      return null;
    }
  }, [slippageAdjustedMinOut, tokenOutMeta]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{t("swap.title")}</h1>
        <p className="mt-2 text-sm text-slate-300">{t("swap.description")}</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        {!isRouterConfigured && (
          <div className="mb-4 rounded-lg border border-amber-500 bg-amber-500/20 p-3 text-xs text-amber-100">
            <Trans
              i18nKey="swap.alert.notConfigured"
              components={{
                strong: <span className="font-semibold" />,
                code: (
                  <code className="mx-1 rounded bg-amber-500/20 px-1 py-0.5 text-[10px] text-amber-100">.env.local</code>
                )
              }}
            />
          </div>
        )}
        <div className="mb-4 rounded-lg border border-brand/30 bg-brand/10 p-3 text-xs text-brand-light">
          {t("swap.notice", { fee: env.swapFeeBps / 100 })}
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300" htmlFor="token-in">
                {t("swap.form.tokenIn")}
              </label>
              <input
                id="token-in"
                value={tokenIn}
                onChange={(event) => setTokenIn(event.target.value)}
                placeholder={t("swap.form.addressPlaceholder")}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300" htmlFor="token-out">
                {t("swap.form.tokenOut")}
              </label>
              <input
                id="token-out"
                value={tokenOut}
                onChange={(event) => setTokenOut(event.target.value)}
                placeholder={t("swap.form.addressPlaceholder")}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300" htmlFor="amount-in">
                {t("swap.form.amountIn")}
              </label>
              <input
                id="amount-in"
                type="number"
                min="0"
                step="0.0001"
                value={amountIn}
                onChange={(event) => setAmountIn(event.target.value)}
                placeholder={t("swap.form.amountPlaceholder")}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
              <p className="text-xs text-slate-400">
                {formattedBalance && tokenInMeta
                  ? t("swap.form.balance", { value: formattedBalance, symbol: tokenInMeta.symbol })
                  : t("swap.form.balanceUnknown")}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300" htmlFor="min-out">
                {t("swap.form.minAmount")}
              </label>
              <input
                id="min-out"
                type="number"
                min="0"
                step="0.0001"
                value={minOut}
                onChange={(event) => setMinOut(event.target.value)}
                placeholder={t("swap.form.amountPlaceholder")}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
            </div>
            <div className="text-xs text-slate-400">
              {t("swap.form.slippageAdjusted", {
                value: formattedSlippageMin ?? "-",
                symbol: tokenOutMeta?.symbol ?? ""
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300" htmlFor="slippage">
                {t("swap.form.slippageLabel")}
              </label>
              <input
                id="slippage"
                type="number"
                min="0"
                value={slippageBps}
                onChange={(event) => setSlippageBps(Number(event.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-300" htmlFor="deadline">
                {t("swap.form.deadlineLabel")}
              </label>
              <input
                id="deadline"
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
                disabled={isApproving || !amountInBigInt || !isRouterConfigured}
                className="flex-1 rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isApproving ? t("swap.form.approving") : t("swap.form.approve")}
              </button>
            ) : null}
            <button
              onClick={executeSwap}
              disabled={isSwapping || !amountInBigInt || needsApproval || !isRouterConfigured}
              className="flex-1 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSwapping ? t("swap.form.swapping") : t("swap.form.swap")}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
        {isRouterConfigured ? (
          <>
            <p>
              {t("swap.footer.routerAddress")}: <span className="font-mono text-slate-100">{routerAddress}</span>
            </p>
            <p className="mt-2">{t("swap.footer.gasNotice")}</p>
          </>
        ) : (
          <p className="text-amber-200">
            <Trans
              i18nKey="swap.footer.configure"
              values={{ chain: DEFAULT_CHAIN.name }}
              components={{ strong: <span className="font-semibold" /> }}
            />
          </p>
        )}
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
