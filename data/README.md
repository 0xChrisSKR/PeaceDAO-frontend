# Data & Media Assets

This directory stores JSON payloads consumed by the app as well as references to public imagery used across the UI.

## Token list

- `tokenlist.json` — lightweight registry of supported BEP20 tokens used for balance and metadata lookups.

## Image placeholders

The following SVG placeholders live under `public/images/` and can be swapped with final PNG assets once design work is complete:

- `images/tokens/`
  - `bnb.svg`
  - `worldpeace.svg`
  - `usdt.svg`
  - `cake.svg`
- `images/hero/`
  - `peace-hero.svg`
- `images/proposals/`
  - `tainan-school.svg`
  - `gaza-aid.svg`
  - `ukraine-warmth.svg`
  - `vancouver-green.svg`
  - `animal-shelter.svg`
  - `education-fund.svg`

### Replacing with production assets

1. Export final artwork at 512×512 PNG (or appropriate ratio) with transparent backgrounds when possible.
2. Drop the PNG files into the matching folder, keeping the same filenames to avoid code changes.
3. If different dimensions or formats are required, update any references within the codebase accordingly and run `npm run build` locally before pushing.
4. Delete the interim SVGs once replacements are verified in preview deployments.
