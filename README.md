# PeaceDAO-frontend

Frontend for PeaceDAO (token-verified chat & governance)

## Quick Start (Codespaces/Local)

```bash
npm i
cp .env.example .env.local
# fill your values (WalletConnect Project ID, PeaceFund, Router, TGs, Guild)
npm run dev
```

## Treasury

- PeaceFund (BSC Testnet): `{{PEACEFUND_BSCTEST}}`
- `donate(string note)` accepts BNB contributions, emits a `Donated` event with the sender, amount, and note, and holds funds without any withdrawal path until a future governance executor is deployed.

## Required owner-provided values

Set these environment variables in `.env.local` (or your hosting provider):

* `NEXT_PUBLIC_WC_PROJECT_ID` (WalletConnect)
* `NEXT_PUBLIC_PEACE_FUND` (your PeaceFund address; set to `auto` to resolve from configured hints)
* `NEXT_PUBLIC_PEACE_SWAP_ROUTER` (your Router address)
* `NEXT_PUBLIC_GOVERNANCE_API` or `NEXT_PUBLIC_PEACEDAO_DEMO_API` (PeaceDAO-demo governance API base URL)
* `NEXT_PUBLIC_PEACEDAO_CONFIG_PATH` (optional config path for PeaceDAO-demo, defaults to `/config`)
* `NEXT_PUBLIC_PEACE_FUND_HINTS` (comma-separated URLs or addresses for auto-detection)
* `NEXT_PUBLIC_GUILD_LINK` (Guild join link)
* Telegram links (`NEXT_PUBLIC_TG_PUBLIC`, `NEXT_PUBLIC_TG_VERIFIED`) — may change later

## Deploy to Vercel

1. Import this repository into Vercel.
2. In **Project Settings → Environment Variables**, add every key from `.env.example`:
   - `NEXT_PUBLIC_WC_PROJECT_ID`
   - `NEXT_PUBLIC_RPC_BSC`
   - `NEXT_PUBLIC_PEACE_FUND`
    - `NEXT_PUBLIC_GOVERNANCE_API`
    - `NEXT_PUBLIC_PEACEDAO_CONFIG_PATH`
    - `NEXT_PUBLIC_PEACE_FUND_HINTS`
    - `NEXT_PUBLIC_TOKEN`
    - `NEXT_PUBLIC_GUILD_LINK`
    - `NEXT_PUBLIC_TG_PUBLIC`
    - `NEXT_PUBLIC_TG_VERIFIED`
    - `NEXT_PUBLIC_TWITTER`
    - Optional server-side overrides: `PEACEDAO_DEMO_API`, `PEACEDAO_DEMO_API_KEY`, `PEACEDAO_DEMO_API_KEY_HEADER`, `PEACE_FUND_HINTS`
3. Redeploy so the new environment variables are available to the build and runtime.
4. After the deployment finishes:
   - Open `/api/health` on your deployed domain and confirm the JSON response includes `{"ok":true}`.
   - Connect a wallet via WalletConnect (Binance Web3) to verify the connection flow.
   - Ensure `NEXT_PUBLIC_PEACE_FUND` is set — the Donate page will enable once it is present and the Treasury view will display the contract balance.

## PeaceDAO-demo integration

- The frontend proxies governance reads and reactions through `/api/governance/**`. Configure `NEXT_PUBLIC_GOVERNANCE_API` (or `NEXT_PUBLIC_PEACEDAO_DEMO_API`) to point at the PeaceDAO-demo deployment.
- PeaceFund detection supports `NEXT_PUBLIC_PEACE_FUND=auto` and will resolve the contract address using `NEXT_PUBLIC_PEACE_FUND_HINTS`, the configured governance API, or any server-side hints defined in `PEACE_FUND_HINTS`.
- If the remote governance API requires authentication, set `PEACEDAO_DEMO_API_KEY` (and optionally `PEACEDAO_DEMO_API_KEY_HEADER`, defaulting to `x-api-key`) in the hosting provider.

## Known integration notes

- The donate page auto-detects the PeaceFund payable method. It attempts the value provided in `NEXT_PUBLIC_DONATE_METHOD` and falls back through `donate`, `donateBNB`, `donateTo`, and `executeDonation`.
- Swapping requires a functioning PeaceSwap router address. If the configured address is a placeholder the swap form will surface a warning and transactions will fail fast.
- The UI uses Tailwind CSS's default system font stack so builds succeed in fully offline environments (no Google font downloads required).

## Connect Wallet Support

- We use wagmi with WalletConnect to support Binance Web3 Wallet and MetaMask via WalletConnect QR.
- MetaMask support relies on a client-only dynamic import of `@metamask/sdk` so server-side rendering on Vercel remains stable.
- Wallet connections work across desktop and mobile platforms.
