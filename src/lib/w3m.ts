// src/lib/w3m.ts
'use client';

import { wagmiConfig, projectId } from './wagmi';

let created = false;

export function ensureWeb3Modal() {
  if (created) return;
  if (typeof window === 'undefined') return; // 只在瀏覽器端建立

  if (!projectId) {
    console.warn('WalletConnect project ID is not configured; skipping Web3Modal setup.');
    created = true;
    return;
  }

  console.warn('Web3Modal has been disabled temporarily. wagmi configuration is still available if needed.', {
    chains: wagmiConfig.chains?.map((chain) => chain.name),
  });
  created = true;
}
