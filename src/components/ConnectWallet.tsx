'use client';

import * as React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm opacity-80">Connected:</span>
        <code className="text-xs">{address}</code>
        <button onClick={() => disconnect()} className="px-3 py-1 rounded border">
          Disconnect
        </button>
      </div>
    );
  }

  const injectedConnector = connectors.find((connector) => connector.id === 'injected') ?? connectors[0];

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => connect({ connector: injectedConnector })}
        className="px-3 py-1 rounded border"
        disabled={status === 'pending' || !injectedConnector}
      >
        {status === 'pending' ? 'Connecting…' : 'Connect Wallet'}
      </button>
      {error ? <span className="text-xs text-red-500">{error.message}</span> : null}
    </div>
  );
}
