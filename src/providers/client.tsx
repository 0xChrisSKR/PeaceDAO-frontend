'use client';

import { ReactNode } from 'react';
import Web3Provider from './Web3Providers';

export default function Providers({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
