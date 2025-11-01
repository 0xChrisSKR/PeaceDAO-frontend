// lib/peaceConfig.ts
export const peaceConfig = {
  tokenDisplay: '$世界和平',            // ★ 對外顯示名
  token: 'WORLDPEACE',                 // 內部代號（可留著）
  branding: {
    hero: 'Make World Peace Real — On-chain Charity.',
    pitch: 'Every swap funds peace. Transparent, auditable, unstoppable.'
  },
  thresholds: {
    proposer: 1_000_000,
    voter: 200_000,
    verifier: 15_000,                 // ★ 你指定的門檻
  },
  feeBps: { min: 5, max: 40, default: 25 }, // 0.05%–0.40%，預設 0.25%
  treasury: {
    network: 'BSC Mainnet',
    fundAddress: '0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5',
  },
  community: {
    website: 'https://REPLACE_WEBSITE',
    x:       'https://x.com/REPLACE',
    telegram:'https://t.me/REPLACE',
    discord: 'https://discord.gg/REPLACE',
    github:  'https://github.com/0xChrisSKR',
    gitbook: 'https://REPLACE_GITBOOK',
    cmc:     'https://coinmarketcap.com/currencies/REPLACE',
    coingecko:'https://www.coingecko.com/en/coins/REPLACE',
  },
} as const;
export type PeaceConfig = typeof peaceConfig;
