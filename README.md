# PeaceDAO-frontend

Frontend for PeaceDAO (token-verified chat & governance)

## Run locally

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_WC_PROJECT_ID from https://cloud.walletconnect.com/
npm install
npm run dev
```

## Known integration notes

- The donate page auto-detects the PeaceFund payable method. It attempts the value provided in `NEXT_PUBLIC_DONATE_METHOD` and falls back through `donate`, `donateBNB`, `donateTo`, and `executeDonation`.
- Swapping requires a functioning PeaceSwap router address. If the configured address is a placeholder the swap form will surface a warning and transactions will fail fast.
