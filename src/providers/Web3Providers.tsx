"use client";

import { ReactNode, useEffect, useRef } from "react";
import { WagmiConfig, type Config } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { wagmiConfig, projectId, chains } from "@/lib/wagmi";

const queryClient = new QueryClient();

export default function Web3Providers({ children }: { children: ReactNode }) {
  const inited = useRef(false);
  useEffect(() => {
    if (inited.current) return;
    createWeb3Modal({
      wagmiConfig: wagmiConfig as any,
      projectId,
      defaultChain: chains[0] as any,
      enableAnalytics: false,
      themeMode: "dark"
    });
    inited.current = true;
  }, []);

  return (
    <WagmiConfig config={wagmiConfig as unknown as Config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}
