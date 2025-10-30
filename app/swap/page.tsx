'use client'

import type { CSSProperties } from 'react'

export default function Swap() {
  const buttonStyle: CSSProperties = {
    display: 'inline-block',
    marginRight: 12,
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: 8,
    textDecoration: 'none',
  }

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>Swap</h1>
      <p>先用聚合器站點完成兌換（BSC）：</p>
      <div style={{ margin: '12px 0 20px' }}>
        <a style={buttonStyle} href="https://www.okx.com/web3/dex?networkId=56" target="_blank">
          OKX DEX（BSC）
        </a>
        <a style={buttonStyle} href="https://pancakeswap.finance/swap?chain=bsc" target="_blank">
          PancakeSwap（BSC）
        </a>
      </div>
      <p style={{ opacity: 0.7 }}>小提示：手機請在錢包 App 的內建瀏覽器開啟以自動注入錢包。</p>
    </main>
  )
}
