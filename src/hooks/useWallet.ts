"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  connectWallet,
  getAccounts,
  getChainId,
  switchChain,
  watchAccounts,
  watchChainId,
} from "@/lib/wallet";
import { DEFAULT_CHAIN } from "@/config/chains";

type WalletState = {
  address: string | null;
  chainId: number | null;
  isConnecting: boolean;
  connect: () => Promise<string | null>;
  disconnect: () => void;
  isConnected: boolean;
  switchToDefaultChain: () => Promise<void>;
};

function normalizeChainId(chainId: unknown): number | null {
  if (typeof chainId === "number") return chainId;
  if (typeof chainId === "string") {
    const parsed = Number.parseInt(chainId, 16);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function useWallet(): WalletState {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setConnecting] = useState(false);

  useEffect(() => {
    let unsubAccounts = () => {};
    let unsubChain = () => {};
    let mounted = true;

    (async () => {
      const [accounts, currentChainId] = await Promise.all([getAccounts(), getChainId()]);
      if (!mounted) return;
      setAddress(accounts[0] ?? null);
      setChainId(currentChainId);
    })();

    unsubAccounts = watchAccounts((accounts) => {
      setAddress(accounts[0] ?? null);
    });

    unsubChain = watchChainId((nextChainId) => {
      setChainId(normalizeChainId(nextChainId));
    });

    return () => {
      mounted = false;
      unsubAccounts();
      unsubChain();
    };
  }, []);

  const connect = useCallback(async () => {
    try {
      setConnecting(true);
      const account = await connectWallet();
      setAddress(account);
      const chain = await getChainId();
      setChainId(chain);
      return account;
    } catch (error) {
      console.error("Failed to connect wallet", error);
      return null;
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setChainId(null);
  }, []);

  const switchToDefaultChain = useCallback(async () => {
    if (!DEFAULT_CHAIN) return;
    try {
      await switchChain(DEFAULT_CHAIN.id, {
        chainName: DEFAULT_CHAIN.name,
        nativeCurrency: DEFAULT_CHAIN.nativeCurrency,
        rpcUrls: DEFAULT_CHAIN.rpcUrls.default.http,
        blockExplorerUrls: DEFAULT_CHAIN.blockExplorers?.default
          ? [DEFAULT_CHAIN.blockExplorers.default.url]
          : undefined,
      });
    } catch (error) {
      console.error("Failed to switch chain", error);
      throw error;
    }
  }, []);

  return useMemo(
    () => ({
      address,
      chainId,
      isConnecting,
      connect,
      disconnect,
      isConnected: Boolean(address),
      switchToDefaultChain,
    }),
    [address, chainId, connect, disconnect, isConnecting, switchToDefaultChain]
  );
}
