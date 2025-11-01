'use client';

import { ReactNode } from 'react';
// Use the lightweight shim to avoid bundler errors until a wallet provider is wired up.
import Web3Provider from './web3';

export default function Providers({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
