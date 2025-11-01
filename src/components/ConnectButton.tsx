'use client';
import * as React from 'react';

/** Minimal button that opens Web3Modal when available.
 *  If hook/context not present at runtime, the button is disabled.
 */
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string };

export default function ConnectButton({ label = 'Connect Wallet', ...rest }: Props) {
  // Try to access Web3Modal at runtime WITHOUT using require eslint-disable
  let handler: null | (() => void) = null;
  try {
    // Runtime import to avoid SSR issues; if not available, keep disabled button.
    // Using "any" here keeps TS happy without adding extra deps.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod: any = (globalThis as any).__w3m ?? null;
    if (mod && typeof mod.open === 'function') handler = mod.open;
  } catch {}

  return (
    <button
      type="button"
      onClick={() => (handler ? handler() : undefined)}
      disabled={!handler}
      {...rest}
      style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc' }}
      aria-disabled={!handler}
    >
      {label}
    </button>
  );
}
export const WalletConnectButton = ConnectButton;
