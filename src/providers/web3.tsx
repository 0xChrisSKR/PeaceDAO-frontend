"use client";

import { ReactNode, useEffect } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";     // 需要 BSC 再加上 bsc
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";

// TODO: 設在 Vercel 環境變數
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

// 需要哪條鏈就加哪條（例：mainnet / bsc）
const chains = [mainnet];

const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(), // 可換成你的 RPC
  },
  ssr: true,
});

let created = false;
function InitWeb3Modal() {
  useEffect(() => {
    if (created || !projectId || typeof window === "undefined") return;
    createWeb3Modal({
      wagmiConfig,
      projectId,
      themeMode: "dark",
      enableAnalytics: false,
    });
    created = true;
  }, []);
  return null;
}

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <InitWeb3Modal />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
