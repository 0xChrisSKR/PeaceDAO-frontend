'use client';

import { ReactNode } from 'react';
import Web3Provider from './web3';

export default function Providers({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
