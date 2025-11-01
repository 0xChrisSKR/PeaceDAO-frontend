# 🕊️ PeaceDAO on BSC — Frontend & Demo (Next.js 14)

以 **$世界和平 (WORLDPEACE)** 為治理與驗證的中文社群 DAO。所有捐款全數流向 **PeaceFund** 國庫，提案/投票/驗證全公開。

## 🔗 快速連結（按鈕）
<p>
<a href="https://coinmarketcap.com/currencies/shijieheping/"><kbd>CoinMarketCap</kbd></a>
&nbsp;<a href="https://www.coingecko.com/en/coins/world-peace"><kbd>CoinGecko</kbd></a>
&nbsp;<a href="https://www.worldpeace-bnb.org/en"><kbd>官方網站</kbd></a>
&nbsp;<a href="https://t.me/WorldPeace_BNB"><kbd>Telegram 公開社群</kbd></a>
</p>

## 🧭 治理等級與權限
- **提案者（Proposer）**：持幣 ≥ **1,000,000** $世界和平  
- **投票者（Voter）**：持幣 ≥ **200,000** $世界和平  
- **驗證者（Verifier）**：持幣 ≥ **15,000** $世界和平

## 🔍 合約與網路
- Network：BNB Chain (BSC Mainnet)  
- PeaceFund：`0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5`  
- Token：`WORLDPEACE`（或設定 `NEXT_PUBLIC_TOKEN_ADDRESS=0x4444def5cf226bf50aa4b45e5748b676945bc509`）

## 🔧 Vercel 環境變數


NEXT_PUBLIC_WC_PROJECT_ID=demo
NEXT_PUBLIC_RPC_BSC=https://bsc-dataseed.binance.org

NEXT_PUBLIC_RPC_BSC_TEST=https://data-seed-prebsc-1-s1.binance.org:8545

NEXT_PUBLIC_PEACE_FUND=0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5
NEXT_PUBLIC_PEACEDAO_CONFIG_PATH=/api/peace/config
NEXT_PUBLIC_TOKEN=WORLDPEACE
NEXT_PUBLIC_TOKEN_ADDRESS=0x4444def5cf226bf50aa4b45e5748b676945bc509
NEXT_PUBLIC_TG_PUBLIC=https://t.me/WorldPeace_BNB

NEXT_PUBLIC_TG_VERIFIED=


## 🛠️ 偵錯頁
- `GET /api/peace/config`：回傳 `fundAddress`, `rpc`, `token`
- `/diagnostics`：檢查 `NEXT_PUBLIC_*`
- `/minimal`：最小頁（路由/渲染）
- `/home`：首頁（如白屏，將需要瀏覽器環境的元件改為 `dynamic(..., { ssr:false })` 或放進 `useEffect`）

## 🧱 建置
- Node：18.x ~ 22.x
- Build：`next build`

MIT
