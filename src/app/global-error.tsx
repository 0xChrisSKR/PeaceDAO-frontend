'use client';
export default function GlobalError(
  { error, reset }: { error: Error & { digest?: string }, reset: () => void }
) {
  console.error('[GlobalError]', error);
  return (
    <html><body style={{fontFamily:'ui-sans-serif,system-ui',padding:24}}>
      <h1>Client Error</h1>
      <pre style={{whiteSpace:'pre-wrap'}}>{String(error?.message ?? 'Unknown error')}</pre>
      <p>
        <button onClick={() => reset()}>Reload</button> ·
        <a href="/diagnostics" style={{marginLeft:8}}>Diagnostics</a> ·
        <a href="/api/peace/config" style={{marginLeft:8}}>/api/peace/config</a>
      </p>
    </body></html>
  );
}
