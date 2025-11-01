'use client';

import { useEffect, useMemo, useState } from 'react';

import { RPC_URL } from '@/config/chains';

type BalanceState = {
  formatted: string;
  symbol: string;
};

function formatBalance(wei: bigint, decimals = 4): string {
  const divisor = 10n ** 18n;
  const whole = wei / divisor;
  const fraction = wei % divisor;
  if (decimals <= 0) return whole.toString();
  const fractionStr = fraction.toString().padStart(18, '0').slice(0, decimals).replace(/0+$/, '');
  return fractionStr ? `${whole.toString()}.${fractionStr}` : whole.toString();
}

async function fetchNativeBalance(address: string): Promise<BalanceState> {
  const response = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'eth_getBalance',
      params: [address, 'latest'],
    }),
  });

  if (!response.ok) {
    throw new Error(`RPC error: ${response.status}`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.error.message ?? 'Failed to fetch balance');
  }

  const hexBalance = payload.result as string;
  const value = BigInt(hexBalance);
  return {
    formatted: formatBalance(value),
    symbol: 'BNB',
  };
}

export default function AddressBalance({ address, label }: { address?: `0x${string}` | string; label?: string }) {
  const normalized = useMemo(() => {
    if (!address) return null;
    const value = String(address);
    return /^0x[0-9a-fA-F]{40}$/.test(value) ? (value as `0x${string}`) : null;
  }, [address]);

  const [balance, setBalance] = useState<BalanceState | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!normalized) return;
    let active = true;

    (async () => {
      try {
        setStatus('loading');
        setError(null);
        const result = await fetchNativeBalance(normalized);
        if (!active) return;
        setBalance(result);
        setStatus('success');
      } catch (err: any) {
        if (!active) return;
        setError(err?.message ?? 'Failed to fetch balance');
        setStatus('error');
      }
    })();

    return () => {
      active = false;
    };
  }, [normalized]);

  return (
    <div className="card">
      {label ? <div className="small" style={{ opacity: 0.8, marginBottom: 4 }}>{label}</div> : null}
      {!normalized && <div className="small">Address not set</div>}
      {normalized && (
        <>
          {status === 'loading' && <div className="small">Fetching balance…</div>}
          {status === 'error' && <div className="small">{error ?? 'Failed to fetch balance.'}</div>}
          {status === 'success' && balance && (
            <div className="mono" style={{ fontSize: 18 }}>
              {balance.formatted} {balance.symbol}
            </div>
          )}
        </>
      )}
    </div>
  );
}
