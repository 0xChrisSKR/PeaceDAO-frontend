'use client';
export default function GlobalError(
  { error, reset }: { error: Error & { digest?: string }; reset: () => void }
) {
  console.error('[GlobalError]', error);
  return (
    <html>
      <body style={{ fontFamily: 'ui-sans-serif,system-ui', padding: 24 }}>
        <h1>We hit a client-side error</h1>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            background: '#111',
            color: '#eee',
            padding: 12,
            borderRadius: 8,
          }}
        >
          {String(error?.message ?? 'Unknown error')}
        </pre>
        <p>
          <button
            onClick={() => reset()}
            style={{ padding: '6px 12px', border: '1px solid #888', borderRadius: 8 }}
          >
            Reload
          </button>
          <a href="/diagnostics" style={{ marginLeft: 12, textDecoration: 'underline' }}>
            Diagnostics
          </a>
          <a href="/api/peace/config" style={{ marginLeft: 12, textDecoration: 'underline' }}>
            /api/peace/config
          </a>
        </p>
      </body>
    </html>
  );
}
