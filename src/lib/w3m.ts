let inited = false;
export function ensureWeb3Modal() {
  if (typeof window === 'undefined') return;
  if (inited) return;
  inited = true;
  // 放你的 Web3Modal / Reown AppKit 初始化也可；目前保持 no-op 保證可編譯
}
