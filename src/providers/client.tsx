'use client';

import { ReactNode } from 'react';
import Web3Providers from './Web3Providers';

export default function Providers({ children }: { children: ReactNode }) {
  return <Web3Providers>{children}</Web3Providers>;
}
