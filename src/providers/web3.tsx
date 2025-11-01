"use client";
import React from "react";

/**
 * Minimal shim for the Web3 provider so the application can compile
 * without bundling a wallet implementation. Replace with a real
 * provider when integration is ready.
 */
export function Web3Provider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default Web3Provider;
