// src/lib/w3m.ts
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { wagmiConfig, activeChain, projectId } from './wagmi';

let inited = false;

/** 確保只初始化一次；沒有 projectId 也不中斷編譯 */
export function ensureWeb3Modal() {
  if (inited) return;
  const pid = projectId?.trim();
  if (!pid) { inited = true; return; } // 沒設定就先略過，不阻擋 build
  createWeb3Modal({
    wagmiConfig,
    projectId: pid,
    chains: [activeChain],
    themeMode: 'dark'
  });
  inited = true;
}
