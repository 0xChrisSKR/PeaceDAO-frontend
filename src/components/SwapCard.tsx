"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { Card } from "@/components/Card";
import { TokenLogo } from "@/components/TokenLogo";
import env from "@/config/env";
import { formatNumber } from "@/lib/format";
import type { TokenInfo } from "@/types/token";

const DynamicTokenSelector = dynamic(() => import("@/components/TokenSelector").then((mod) => mod.TokenSelector), {
  ssr: false
});

const SLIPPAGE = 0.005;
const FEE_RATE = 0.003;

interface SwapCardProps {
  tokens: TokenInfo[];
  defaultFromToken: TokenInfo;
  defaultToToken: TokenInfo;
}

type SelectorTarget = "from" | "to" | null;

function formatTokenAmount(value: number) {
  if (!Number.isFinite(value)) return "0";
  return formatNumber(value, 6);
}

export function SwapCard({ tokens, defaultFromToken, defaultToToken }: SwapCardProps) {
  const [fromToken, setFromToken] = useState<TokenInfo>(defaultFromToken);
  const [toToken, setToToken] = useState<TokenInfo>(defaultToToken);
  const [fromAmount, setFromAmount] = useState("1");
  const [selectorTarget, setSelectorTarget] = useState<SelectorTarget>(null);

  useEffect(() => {
    setFromToken(defaultFromToken);
  }, [defaultFromToken]);

  useEffect(() => {
    setToToken(defaultToToken);
  }, [defaultToToken]);

  const selectableTokens = useMemo(() => tokens, [tokens]);

  const numericFromAmount = Number.parseFloat(fromAmount) || 0;
  const estimatedOutput = numericFromAmount;
  const minimumReceived = estimatedOutput * (1 - SLIPPAGE);
  const feeAmount = numericFromAmount * FEE_RATE;

  const isRouterReady = Boolean(env.peaceSwapRouter);

  const handleSelectToken = (token: TokenInfo) => {
    if (!selectorTarget) return;
    if (selectorTarget === "from") {
      if (token.address === toToken.address) {
        setToToken(fromToken);
      }
      setFromToken(token);
    } else {
      if (token.address === fromToken.address) {
        setFromToken(toToken);
      }
      setToToken(token);
    }
    setSelectorTarget(null);
  };

  const handleFlip = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleSwap = () => {
    // Placeholder swap handler - integrate with PeaceSwap router once ready.
    console.info("Swap requested", {
      fromToken,
      toToken,
      amount: numericFromAmount
    });
  };

  return (
    <Card className="mx-auto max-w-lg bg-white/80 p-6 shadow-lg">
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">PeaceSwap</h2>
          <p className="mt-1 text-sm text-slate-500">
            Trade tokens instantly on BNB Chain with a beautiful, mobile-first interface.
          </p>
        </div>
        <div className="space-y-3">
          <div className="rounded-3xl border border-emerald-100 bg-white/90 p-4 shadow-inner">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>From</span>
              <span>{fromToken.symbol}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={fromAmount}
                onChange={(event) => setFromAmount(event.target.value)}
                className="w-full flex-1 rounded-2xl border border-transparent bg-transparent text-2xl font-semibold text-slate-900 focus:border-emerald-300 focus:outline-none"
                placeholder="0.0"
              />
              <button
                type="button"
                onClick={() => setSelectorTarget("from")}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-600"
              >
                <TokenLogo token={fromToken} size={28} />
                <span>{fromToken.symbol}</span>
                <span className="text-xs text-slate-400">▾</span>
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleFlip}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-500 shadow transition hover:bg-emerald-50"
              aria-label="Swap tokens"
            >
              ⇅
            </button>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white/90 p-4 shadow-inner">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>To</span>
              <span>{toToken.symbol}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="text"
                readOnly
                value={formatTokenAmount(estimatedOutput)}
                className="w-full flex-1 rounded-2xl border border-transparent bg-transparent text-2xl font-semibold text-slate-900 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSelectorTarget("to")}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-600"
              >
                <TokenLogo token={toToken} size={28} />
                <span>{toToken.symbol}</span>
                <span className="text-xs text-slate-400">▾</span>
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-2 rounded-3xl border border-white/60 bg-white/70 p-4 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Estimated output</span>
            <span className="font-semibold text-slate-800">
              {formatTokenAmount(estimatedOutput)} {toToken.symbol}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Slippage tolerance</span>
            <span>0.5%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Minimum received</span>
            <span className="font-semibold text-slate-800">
              {formatTokenAmount(minimumReceived)} {toToken.symbol}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Peace DAO fee (0.3%)</span>
            <span>{formatTokenAmount(feeAmount)} {fromToken.symbol}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSwap}
          disabled={!isRouterReady || numericFromAmount <= 0}
          title={!isRouterReady ? "Coming soon" : undefined}
          className={clsx(
            "inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-base font-semibold shadow-md transition",
            isRouterReady ? "bg-emerald-500 text-white hover:bg-emerald-600" : "cursor-not-allowed bg-slate-200 text-slate-500"
          )}
        >
          {isRouterReady ? `Swap ${fromToken.symbol} for ${toToken.symbol}` : "Coming soon"}
        </button>
      </div>
      <DynamicTokenSelector
        isOpen={selectorTarget !== null}
        onClose={() => setSelectorTarget(null)}
        onSelect={handleSelectToken}
        tokens={selectableTokens}
      />
    </Card>
  );
}
