# 🕊️ PeaceDAO Frontend (Next.js 14)

## Live Health / Diagnostics
- `GET /api/peace/config` → returns `fundAddress`, `rpc`, `token`
- `/diagnostics` → checks `NEXT_PUBLIC_*`
- `/minimal` → minimal route test
- `/home` → main page (若白屏，把瀏覽器依賴改 `dynamic(...,{ ssr:false })` 或 `useEffect`)

## Env (Vercel → Settings → Environment Variables)NEXT_PUBLIC_WC_PROJECT_ID=demo
NEXT_PUBLIC_RPC_BSC=https://bsc-dataseed.binance.org

NEXT_PUBLIC_RPC_BSC_TEST=https://data-seed-prebsc-1-s1.binance.org:8545

NEXT_PUBLIC_PEACE_FUND=0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5
NEXT_PUBLIC_PEACEDAO_CONFIG_PATH=/api/peace/config
NEXT_PUBLIC_TOKEN=WORLDPEACE
NEXT_PUBLIC_TOKEN_ADDRESS=0x4444def5cf226bf50aa4b45e5748b676945bc509
NEXT_PUBLIC_TG_PUBLIC=https://t.me/WorldPeace_BNB

NEXT_PUBLIC_TG_VERIFIED= 
## Deploy
- Node: 18.x ~ 22.x
- Build: `next build`

## Governance Thresholds
- Proposer ≥ **1,000,000** $WORLDPEACE
- Voter ≥ **200,000** $WORLDPEACE
- Verifier ≥ **15,000** $WORLDPEACE

## Quick Links
<p>
<a href="https://coinmarketcap.com/currencies/shijieheping/"><kbd>CoinMarketCap</kbd></a>
&nbsp;<a href="https://www.coingecko.com/en/coins/world-peace"><kbd>CoinGecko</kbd></a>
&nbsp;<a href="https://www.worldpeace-bnb.org/en"><kbd>Official Site</kbd></a>
&nbsp;<a href="https://t.me/WorldPeace_BNB"><kbd>Telegram (Public)</kbd></a>
</p>
