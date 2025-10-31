"use client";

import React from "react";
import { http, createConfig } from "wagmi";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia, bsc } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createAppKit,
  AppKitProvider,
  AppKitButton
} from "@reown/appkit/react";
import { wagmiAdapter } from "@reown/appkit-wagmi";

// 你可以把專案的 projectId/metadata 換成自己的
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "demo";

// 建 wagmi 設定（用 http transport；若有 RPC 可替換）
const chains = [mainnet, sepolia, bsc];
const config = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http()
  }
});

// 交給 Reown AppKit 產生可用的連線 UI
const { AppKit } = createAppKit({
  adapters: [wagmiAdapter({ wagmiConfig: config })],
  projectId: WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: "PeaceDAO",
    description: "PeaceDAO Frontend",
    url: "https://peace-dao-frontend.vercel.app",
    icons: ["https://avatars.githubusercontent.com/u/0?v=4"]
  },
  features: {
    email: false
  }
});

const qc = new QueryClient();

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={qc}>
        <AppKitProvider>
          {/* 提供一顆可用的連線按鈕；如果你已有按鈕，可移除此段 */}
          <div style={{ position: "fixed", top: 12, right: 12, zIndex: 1000 }}>
            <AppKitButton />
          </div>
          {children}
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
