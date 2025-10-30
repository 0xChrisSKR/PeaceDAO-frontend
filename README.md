# 🕊️ PeaceDAO Frontend (Next.js 14)
Production UI for World Peace DAO on BSC.

## Live Health / Diagnostics
- `GET /api/peace/config` → 應回 `fundAddress`, `rpc`, `token`
- `/diagnostics` → 檢查 `NEXT_PUBLIC_*` 是否為空
- `/minimal` → 最小頁（檢查路由/渲染）
- `/home` → 原首頁（若白屏，需把其依賴改 client-only/lazy-load）

## Environment (Vercel → Project → Settings → Environment Variables)

Required:

```
NEXT_PUBLIC_WC_PROJECT_ID=demo
NEXT_PUBLIC_RPC_BSC=https://bsc-dataseed.binance.org/
NEXT_PUBLIC_PEACE_FUND=0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5
NEXT_PUBLIC_PEACE_TOKEN=0x... // $世界和平 ERC20(BEP-20) 合約
NEXT_PUBLIC_TG_PUBLIC=https://t.me/...
NEXT_PUBLIC_TG_PRIVATE=https://t.me/+... // 驗證通過導向
```

Optional:

```
NEXT_PUBLIC_GOVERNANCE_API=https://api.<your-domain>
NEXT_PUBLIC_PEACEDAO_CONFIG_PATH=/api/peace/config
NEXT_PUBLIC_VERIFY_THRESHOLD=15000
NEXT_PUBLIC_TG_VERIFIED=https://t.me/+... // 舊版環境名稱
NEXT_PUBLIC_TOKEN=WORLDPEACE
```
## Deploy
- Node.js: 22.x
- Build: `next build`

## Troubleshooting
- 首頁白屏 → 確認 `src/app/page.tsx` 存在；看 `/diagnostics` 與 `/api/peace/config`。
- `No QueryClient set` → 需以 `QueryClientProvider` 包住（後續針對 `/home`/`/treasury` 等頁補）。
- 任何會用到 `window/localStorage`/錢包初始化的組件 → `dynamic(..., { ssr:false })` 或放進 `useEffect`。

## License
MIT
