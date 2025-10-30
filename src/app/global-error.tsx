'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  console.error('[GlobalError]', error);
  return (
    <html>
      <body style={{ fontFamily: 'ui-sans-serif,system-ui', padding: 24 }}>
        <h1>We hit a client-side error</h1>
        <p style={{ whiteSpace: 'pre-wrap' }}>{String(error?.message ?? 'Unknown error')}</p>
        <p>
          Try <button onClick={() => reset()} style={{ padding: '6px 12px', border: '1px solid #888', borderRadius: 8 }}>reload</button>
          {' '}or open <a href="/diagnostics" style={{ textDecoration: 'underline' }}>Diagnostics</a> /
          <a href="/api/peace/config" style={{ marginLeft: 8, textDecoration: 'underline' }}>/api/peace/config</a>
        </p>
      </body>
    </html>
  );
}
