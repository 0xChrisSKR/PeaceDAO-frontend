'use client';

import * as React from 'react';

// Minimal no-op provider to satisfy imports;
// You can wire Wagmi/Web3Modal later without breaking build.
export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// keep named alias for different import styles
export const Providers = Web3Providers;
