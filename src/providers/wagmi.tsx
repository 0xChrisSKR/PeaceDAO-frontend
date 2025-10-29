"use client";

import { ReactNode, useMemo, useState } from "react";
import { WagmiProvider as BaseWagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected, walletConnect } from "wagmi/connectors";
import env from "@/config/env";
import { CHAINS, DEFAULT_CHAIN, transports } from "@/config/chains";
import { DOVE_ICON_DATA_URL } from "@/lib/branding";

const metadata = {
  name: "World Peace DAO",
  description: "On-chain charity for a peaceful future.",
  url: "https://worldpeace.example",
  icons: [DOVE_ICON_DATA_URL]
};

const connectorList = [
  injected({ shimDisconnect: true }),
  ...(env.wcProjectId
    ? [
        walletConnect({
          projectId: env.wcProjectId,
          showQrModal: true,
          metadata
        })
      ]
    : [])
] as const;

export const wagmiConfig = createConfig({
  chains: CHAINS,
  connectors: connectorList,
  transports,
  ssr: true,
  multiInjectedProviderDiscovery: false,
  pollingInterval: 4_000
});

wagmiConfig.setState((state) => ({
  ...state,
  chainId: DEFAULT_CHAIN.id
}));

export function WagmiProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 15_000,
            refetchOnWindowFocus: false
          }
        }
      })
  );

  const connectors = useMemo(() => wagmiConfig.connectors, []);

  return (
    <BaseWagmiProvider config={{ ...wagmiConfig, connectors }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BaseWagmiProvider>
  );
}
