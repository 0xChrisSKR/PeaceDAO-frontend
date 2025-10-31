"use client";
import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import { injected, walletConnect } from "@wagmi/connectors";

const connectors = [
  injected({ shimDisconnect: true }),
  ...(process.env.NEXT_PUBLIC_WC_PROJECT_ID
    ? [walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!, showQrModal: true })]
    : []),
];

const config = createConfig({
  chains: [bsc, mainnet],
  transports: {
    [bsc.id]: http(),
    [mainnet.id]: http(),
  },
  connectors,
});

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
