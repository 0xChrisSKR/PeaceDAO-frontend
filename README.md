# 🕊️ PeaceDAO (BSC) — $世界和平

> **中文社群代幣｜最新中文區品牌**  
> 本專案提供金庫、治理、投票驗證的最小可行產品（MVP）。

## 🔗 Official Links
[![Telegram](https://img.shields.io/badge/Telegram-WorldPeace_BNB-2CA5E0?logo=telegram)](https://t.me/WorldPeace_BNB/1)
[![Website](https://img.shields.io/badge/Website-worldpeace--bnb.org-black)](https://www.worldpeace-bnb.org/en)
[![CoinMarketCap](https://img.shields.io/badge/CMC-World%20Peace-blue)](https://coinmarketcap.com/currencies/shijieheping/)
[![CoinGecko](https://img.shields.io/badge/CoinGecko-World%20Peace-00DC82?logo=coingecko)](https://www.coingecko.com/en/coins/world-peace)

## 🏛️ Vision
無驗證治理容易失序。PeaceDAO 以 **$世界和平**、金庫 **PeaceFund**、公開透明金流與「多層級門檻＋冷卻」機制，在「開放」與「守門」間取平衡。

## 🔑 Governance Roles（以 $世界和平 持幣餘額判定）
- **提案者 Proposer：≥ 1,000,000**  
  提案需附 **BSC** 收款地址、提案原因、預計捐贈金額（上限 = 金庫 90%）。
- **投票者 Voter：≥ 200,000**  
  投票 **必填投票原因**。
- **驗證者 Verifier：≥ 15,000**  
  以 👍/👎 驗證投票是否有效（免填原因）。**所有投票經驗證通過後**才決定是否通過提案。重大金額/反女巫設冷卻與加嚴（白皮書細節待補）。

## 🔒 Treasury / Contracts
- **Network:** BNB Chain (BSC Mainnet)  
- **PeaceFund (Treasury):** `0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5`

## 🧪 Live Health / Diagnostics
- `GET /api/peace/config` → 應回 `fundAddress`, `rpc`, `token`
- `/diagnostics` → 檢查 `NEXT_PUBLIC_*` 是否為空
- `/minimal` → 最小頁測路由/渲染
- `/home` → 首頁（若白屏，將依賴改為 client-only/lazy-load）

## ⚙️ Environment (Vercel → Project → Settings → Environment Variables)
**必填**
