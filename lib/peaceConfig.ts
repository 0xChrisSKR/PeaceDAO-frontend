// lib/peaceConfig.ts
export const peaceConfig = {
  tokenDisplay: '$世界和平',          // 對外顯示名稱
  token: 'WORLDPEACE',                // 內部代號
  branding: {
    hero: 'Make World Peace Real — On-chain Charity.',
    pitch: 'Every swap funds peace. Transparent, auditable, unstoppable.',
  },
  thresholds: {
    proposer: 1_000_000,
    voter: 200_000,
    verifier: 15_000,                 // ✅ 你設定的門檻
  },
  feeBps: { min: 5, max: 40, default: 25 },
  treasury: {
    network: 'BSC Mainnet',
    fundAddress: '0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5',
  },
  community: {
    website:   'https://www.worldpeace-bnb.org/en',                     // ✅ 官網
    x:         'https://x.com/WorldPeace_BNB?t=L3VhoiqxvVfwivv9EL4WWA&s=09', // ✅ X（Twitter）
    telegram:  'https://t.me/WorldPeace_BNB',                           // ✅ Telegram
    discord:   '',                                                      // 暫無可留空
    github:    'https://github.com/0xChrisSKR',                         // 預設 GitHub
    gitbook:   '',                                                      // 若未建可留空
    cmc:       'https://coinmarketcap.com/currencies/shijieheping/',    // ✅ CMC
    coingecko: 'https://www.coingecko.com/en/coins/world-peace',        // ✅ CoinGecko
  },
} as const;

export type PeaceConfig = typeof peaceConfig;
