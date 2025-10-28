"use client";

import { ReactNode } from "react";
import { WagmiProvider as BaseWagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { injected, walletConnect } from "wagmi/connectors";
import env from "@/config/env";
import { CHAINS, transports } from "@/config/chains";

export const wagmiConfig = createConfig({
  chains: CHAINS,
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId: env.wcProjectId,
      showQrModal: true,
      metadata: {
        name: "PeaceDAO",
        description: "Support PeaceDAO with donations and swaps",
        url: "https://peacedao.org",
        icons: ["https://avatars.githubusercontent.com/u/123552499?s=200&v=4"]
      }
    })
  ],
  transports,
  ssr: true,
  multiInjectedProviderDiscovery: false,
  pollingInterval: 4_000
});

export function WagmiProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30_000,
          refetchOnWindowFocus: false
        }
      }
    })
  );

  return (
    <BaseWagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BaseWagmiProvider>
  );
}
