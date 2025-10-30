'use client';
import { useState } from 'react';

export default function Address({ value, label }: { value?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const v = value || '';
  const short = v ? `${v.slice(0,6)}…${v.slice(-4)}` : '(not set)';
  return (
    <div className="card" style={{display:'flex', alignItems:'center', gap:12}}>
      <div style={{flex:1}}>
        {label ? <div className="small" style={{opacity:.8, marginBottom:4}}>{label}</div> : null}
        <div className="mono">{short}</div>
      </div>
      <button
        className="btn"
        onClick={async () => {
          try { await navigator.clipboard.writeText(v); setCopied(true); setTimeout(()=>setCopied(false), 1200); } catch {}
        }}
        disabled={!v}
        title="Copy address"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
