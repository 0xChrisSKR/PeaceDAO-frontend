"use client";

import React from "react";
import { http, createConfig, WagmiProvider } from "wagmi";
import { mainnet, sepolia, bsc } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-wagmi";

const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "demo";

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, bsc],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http()
  }
});

const adapter = new WagmiAdapter({ wagmiConfig });

const appKit = createAppKit({
  adapters: [adapter],
  projectId: WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: "PeaceDAO",
    description: "PeaceDAO Frontend",
    url: "https://peace-dao-frontend.vercel.app",
    icons: ["https://avatars.githubusercontent.com/u/0?v=4"]
  }
});

const qc = new QueryClient();

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
