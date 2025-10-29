"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { TokenLogo } from "@/components/TokenLogo";
import { shortenAddress } from "@/lib/format";
import type { TokenInfo } from "@/types/token";

export interface TokenSelectorProps {
  isOpen: boolean;
  tokens: TokenInfo[];
  onSelect: (token: TokenInfo) => void;
  onClose: () => void;
  title?: string;
}

export function TokenSelector({ isOpen, tokens, onSelect, onClose, title = "Select a token" }: TokenSelectorProps) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const filteredTokens = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return tokens;
    }
    return tokens.filter((token) => {
      const haystacks = [token.symbol, token.name, token.address];
      return haystacks.some((value) => value.toLowerCase().includes(search));
    });
  }, [query, tokens]);

  if (!mounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/40 px-4 pb-6 pt-24 sm:items-center sm:pt-0">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or address"
            autoFocus
            className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none"
          />
        </div>
        <div className="max-h-80 overflow-y-auto px-1 pb-4">
          {filteredTokens.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-500">No tokens found.</p>
          ) : (
            <ul className="space-y-1">
              {filteredTokens.map((token) => (
                <li key={`${token.chainId}:${token.address}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(token);
                      onClose();
                    }}
                    className={clsx(
                      "flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-3 text-left transition",
                      "hover:bg-emerald-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <TokenLogo token={token} size={36} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{token.symbol}</p>
                        <p className="text-xs text-slate-500">{token.name}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{shortenAddress(token.address)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
