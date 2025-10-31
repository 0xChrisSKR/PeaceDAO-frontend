'use client';
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontFamily: 'monospace' }}>
          {address?.slice(0, 6)}…{address?.slice(-4)}
        </span>
        <button onClick={() => disconnect()} style={{ padding: '8px 12px', borderRadius: 8 }}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {connectors.map((c) => (
        <button
          key={c.id}
          disabled={!c.ready || isLoading}
          onClick={() => connect({ connector: c })}
          style={{ padding: '8px 12px', borderRadius: 8 }}
          title={c.ready ? '' : 'Wallet not available'}
        >
          {isLoading && pendingConnector?.id === c.id ? 'Connecting…' : `Connect ${c.name}`}
        </button>
      ))}
    </div>
  );
}
