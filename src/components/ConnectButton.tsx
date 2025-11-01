'use client';

import * as React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string };

// Try to use Web3Modal hook if available; otherwise render a disabled button.
export default function ConnectButton({ label = 'Connect Wallet', ...rest }: Props) {
  let open: null | (() => void) = null;
  try {
    // Optional import – don't hard fail if pkg resolution changes
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('@web3modal/wagmi/react');
    if (mod && typeof mod.useWeb3Modal === 'function') {
      const useWeb3Modal = mod.useWeb3Modal as () => { open: () => void };
      // runtime hook wrapper – only callable in client
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { open: _open } = useWeb3Modal();
      open = _open;
    }
  } catch (_) {}

  return (
    <button
      type="button"
      onClick={() => (open ? open() : undefined)}
      disabled={!open}
      {...rest}
      style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc' }}
      aria-disabled={!open}
      title={!open ? 'Wallet modal unavailable' : 'Connect your wallet'}
    >
      {label}
    </button>
  );
}

// also provide a named export for compatibility
export const WalletConnectButton = ConnectButton;
