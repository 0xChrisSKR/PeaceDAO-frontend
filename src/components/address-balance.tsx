'use client';
import { useBalance } from 'wagmi';

export default function AddressBalance({ address, label }: { address?: `0x${string}` | string; label?: string }) {
  const enabled = Boolean(address && /^0x[0-9a-fA-F]{40}$/.test(String(address)));
  const { data, isLoading, isError } = useBalance({
    address: enabled ? (address as `0x${string}`) : undefined,
    query: { enabled },
  });

  return (
    <div className="card">
      {label ? <div className="small" style={{opacity:.8, marginBottom:4}}>{label}</div> : null}
      {!enabled && <div className="small">Address not set</div>}
      {enabled && (
        <>
          {isLoading && <div className="small">Fetching balance…</div>}
          {isError && <div className="small">Failed to fetch balance.</div>}
          {data && (
            <div className="mono" style={{fontSize:18}}>
              {data.formatted} {data.symbol}
            </div>
          )}
        </>
      )}
    </div>
  );
}
