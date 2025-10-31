'use client';
import type { ReactNode } from 'react';

// 極簡 Provider：先讓前端能成功建置，之後再補接錢包/Modal
export default function Web3Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
