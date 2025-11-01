/**
 * Safe wrapper for wagmi + Web3Modal.
 * Exports a single <Web3Provider> component usable by client.tsx.
 * If wagmi/web3modal not available at runtime, renders children directly.
 */

import React, { ReactNode } from "react";

export interface Web3ProviderProps {
  children?: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  try {
    // Dynamically import wagmi + web3modal client if available
    const AnyWagmiProvider =
      (require("@web3modal/wagmi/react").Web3ModalProvider as any) ??
      (require("@web3modal/react").Web3ModalProvider as any) ??
      null;

    if (AnyWagmiProvider) {
      const WagmiConfig =
        (require("wagmi").WagmiConfig as any) ??
        (({ children }: { children: ReactNode }) => <>{children}</>);
      return (
        <AnyWagmiProvider>
          <WagmiConfig>{children}</WagmiConfig>
        </AnyWagmiProvider>
      );
    }
  } catch {
    // eslint-disable-next-line no-console
    console.warn("⚠️ Web3 provider modules not found, rendering bare children");
  }

  return <>{children}</>;
}

export default Web3Provider;
