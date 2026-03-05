'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body style={{ fontFamily: 'monospace', padding: '2rem', background: '#fff1f2' }}>
                <h1 style={{ color: '#dc2626' }}>Server Error (Debug)</h1>
                <p><strong>Message:</strong> {error.message}</p>
                <p><strong>Digest:</strong> {error.digest}</p>
                <pre style={{ background: '#fff', padding: '1rem', overflow: 'auto', fontSize: '0.8rem' }}>
                    {error.stack}
                </pre>
                <button onClick={reset} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    再試行
                </button>
            </body>
        </html>
    )
}
