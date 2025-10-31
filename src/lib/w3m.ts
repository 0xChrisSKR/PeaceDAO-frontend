// src/lib/w3m.ts
'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { wagmiConfig, projectId } from './wagmi';

let created = false;

export function ensureWeb3Modal() {
  if (created) return;
  if (typeof window === 'undefined') return; // 只在瀏覽器端建立

  createWeb3Modal({
    wagmiConfig,
    projectId,
    enableAnalytics: false,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#f0b90b'
    }
  });

  created = true;
}
