// src/lib/w3m.ts
// 安全版：不依賴 defaultWagmiConfig，並在瀏覽器端動態載入 Web3Modal

import { createConfig, http } from 'wagmi';
import { mainnet, bsc, polygon } from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID ||
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ||
  '';

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, polygon],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
  },
  ssr: true,
});

let inited = false;

/**
 * 在 client 端才初始化 Web3Modal。若套件版本不同，catch 住不擋 build。
 */
export async function ensureWeb3Modal() {
  if (typeof window === 'undefined' || inited) return;
  inited = true;

  if (!projectId) {
    console.warn('[w3m] projectId missing, skip Web3Modal init');
    return;
  }

  try {
    // 只在瀏覽器端載入，避免 SSR/版本差異造成的編譯錯誤
    const mod: any = await import('@web3modal/wagmi/react');
    const createWeb3Modal = mod?.createWeb3Modal ?? mod?.default ?? null;

    if (typeof createWeb3Modal === 'function') {
      createWeb3Modal({ wagmiConfig, projectId });
    } else {
      console.warn('[w3m] createWeb3Modal not found – continuing without modal');
    }
  } catch (err) {
    console.warn('[w3m] init failed (non-fatal):', err);
  }
}
