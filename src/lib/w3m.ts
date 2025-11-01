// src/lib/w3m.ts
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { wagmiConfig, projectId } from './wagmi';

let inited = false;

/** 修正版：新版 Web3Modal 不再需要 chains 屬性 */
export function ensureWeb3Modal() {
  if (inited) return;
  const pid = projectId?.trim();
  if (!pid) { inited = true; return; } // 沒設定也不中斷 build

  createWeb3Modal({
    wagmiConfig,
    projectId: pid,
    themeMode: 'dark'
  });

  inited = true;
}
