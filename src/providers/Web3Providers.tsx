"use client";

import { ReactNode, useEffect, useRef } from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { http } from "viem";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "";
const NETWORK = (process.env.NEXT_PUBLIC_NETWORK ?? "bsc").toLowerCase();

const chains = (NETWORK === "bsctest" || NETWORK === "bsc_test") ? [bscTestnet] : [bsc];

const transports = {
  [bsc.id]: http(process.env.NEXT_PUBLIC_RPC_BSC),
  [bscTestnet.id]: http(process.env.NEXT_PUBLIC_RPC_BSC_TEST)
} as const;

const wagmiConfig = createConfig({
  chains,
  transports,
  multiInjectedProviderDiscovery: true
});

const queryClient = new QueryClient();

export default function Web3Providers({ children }: { children: ReactNode }) {
  const inited = useRef(false);
  useEffect(() => {
    if (inited.current) return;
    createWeb3Modal({
      wagmiConfig,
      projectId: PROJECT_ID,
      defaultChain: chains[0],
      enableAnalytics: false,
      themeMode: "dark"
    });
    inited.current = true;
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
