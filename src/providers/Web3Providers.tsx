"use client";
import React from "react";

// 急救版：先不載 wagmi/web3modal，避免 viem/wagmi 版本衝突造成 build fail
// 後續再用 AppKit 或相容版本的 wagmi 重新接回
export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
