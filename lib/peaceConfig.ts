// lib/peaceConfig.ts
export const peaceConfig = {
  tokenDisplay: '$世界和平',
  token: 'WORLDPEACE',
  branding: {
    hero: 'Make World Peace Real — On-chain Charity.',
    pitch: 'Every swap funds peace. Transparent, auditable, unstoppable.',
  },
  thresholds: { proposer: 1_000_000, voter: 200_000, verifier: 15_000 },
  feeBps: { min: 5, max: 40, default: 25 },
  treasury: {
    network: 'BSC Mainnet',
    fundAddress: '0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5',
  },
  community: {
    website:   'https://www.worldpeace-bnb.org/en',
    x:         'https://x.com/WorldPeace_BNB?t=L3VhoiqxvVfwivv9EL4WWA&s=09',
    telegram:  'https://t.me/WorldPeace_BNB',
    discord:   '',
    github:    'https://github.com/0xChrisSKR',
    gitbook:   '',
    cmc:       'https://coinmarketcap.com/currencies/shijieheping/',
    coingecko: 'https://www.coingecko.com/en/coins/world-peace',
  },
} as const;

export type PeaceConfig = typeof peaceConfig;
