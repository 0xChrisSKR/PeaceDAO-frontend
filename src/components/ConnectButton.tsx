'use client';
import * as React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string };

export default function ConnectButton({ label = 'Connect Wallet', ...rest }: Props) {
  let handler: null | (() => void) = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('@web3modal/wagmi/react');
    if (mod && typeof mod.useWeb3Modal === 'function') {
      const useWeb3Modal = mod.useWeb3Modal as () => { open: () => void };
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { open } = useWeb3Modal();
      handler = open;
    }
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
