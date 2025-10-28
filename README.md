# PeaceDAO-frontend

Frontend for PeaceDAO (token-verified chat & governance)

## Quick Start (Codespaces/Local)

```bash
npm i
cp .env.example .env.local
# fill your values (WalletConnect Project ID, PeaceFund, Router, TGs, Guild)
npm run dev
```

## Required owner-provided values

Set these environment variables in `.env.local` (or your hosting provider):

* `NEXT_PUBLIC_WC_PROJECT_ID` (WalletConnect)
* `NEXT_PUBLIC_PEACE_FUND` (your PeaceFund address)
* `NEXT_PUBLIC_PEACE_SWAP_ROUTER` (your Router address)
* `NEXT_PUBLIC_GUILD_LINK` (Guild join link)
* Telegram links (`NEXT_PUBLIC_TG_PUBLIC`, `NEXT_PUBLIC_TG_VERIFIED`) — may change later

## Deploy on Vercel

1. Import this repository into Vercel.
2. In **Project Settings → Environment Variables**, add the keys from `.env.example` (use the owner-provided values above plus any optional RPC overrides).
3. Trigger a deploy — the default build command (`npm run build`) and output directory (`.next`) work out of the box.

## Known integration notes

- The donate page auto-detects the PeaceFund payable method. It attempts the value provided in `NEXT_PUBLIC_DONATE_METHOD` and falls back through `donate`, `donateBNB`, `donateTo`, and `executeDonation`.
- Swapping requires a functioning PeaceSwap router address. If the configured address is a placeholder the swap form will surface a warning and transactions will fail fast.
- The UI uses Tailwind CSS's default system font stack so builds succeed in fully offline environments (no Google font downloads required).

## Connect Wallet Support

- Supported wallets:
  - Binance Web3 Wallet (via WalletConnect)
  - MetaMask (via WalletConnect QR)
- Removed the direct MetaMask SDK dependency to support Vercel builds.
- Wallet connections work across desktop and mobile platforms.
