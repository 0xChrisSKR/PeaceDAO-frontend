'use client'
import { useEffect, useState, type CSSProperties } from 'react'

export default function Home() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  const handleDonate = () => {
    if (!ready) return
    const w = window as any
    const provider = w.ethereum || w.okxwallet?.ethereum || w.okxwallet || null
    if (!provider) {
      alert('偵測不到錢包：請用 OKX/MetaMask App 的內建瀏覽器開啟此頁')
      return
    }
    console.log('provider ready', provider) // 之後再接送交易
  }

  const linkStyle: CSSProperties = {
    textDecoration: 'none',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: 8,
  }

  return (
    <main
      style={{
        padding: 24,
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/peacedao.svg" alt="PeaceDAO" style={{ height: 36 }} />
          <strong style={{ fontSize: 24 }}>PeaceDAO</strong>
        </div>
        <nav style={{ display: 'flex', gap: 8 }}>
          <a href="/" style={linkStyle}>
            Home
          </a>
          <a href="/swap" style={linkStyle}>
            Swap
          </a>
        </nav>
      </header>

      <p style={{ margin: '8px 0 20px' }}>
        這是 demo 頁面：按下 Donate 將連接錢包（手機請用錢包 App 的內建瀏覽器）。
      </p>

      <div style={{ border: '1px solid #aaa', borderRadius: 12, padding: 16, maxWidth: 560 }}>
        <h2 style={{ marginTop: 0 }}>Donate</h2>
        <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo' }}>To: 0x0000…0000</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <input
            defaultValue="0.01"
            style={{ flex: 1, padding: 10, border: '1px solid #ccc', borderRadius: 8 }}
          />
          <button
            onClick={handleDonate}
            style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #ccc' }}
          >
            Donate
          </button>
        </div>
      </div>

      <section style={{ marginTop: 28 }}>
        <img src="/peacedao.svg" alt="PeaceDAO Cover" style={{ height: 60 }} />
      </section>
    </main>
  )
}
