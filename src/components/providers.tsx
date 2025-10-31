"use client";

import type { PropsWithChildren } from "react";

// 急救版：僅回傳 children，暫不載入 wagmi Provider
export default function Providers({ children }: PropsWithChildren) {
  return <>{children}</>;
}
