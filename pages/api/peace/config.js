export default async function handler(_req, res) {
  const base = process.env.PEACEDAO_DEMO_API || process.env.NEXT_PUBLIC_GOVERNANCE_API || '';
  const path = process.env.NEXT_PUBLIC_PEACEDAO_CONFIG_PATH || '/config';
  try {
    const url = base ? `${base}${path}` : path;
    const r = await fetch(url, { cache: 'no-store' });
    const data = await r.json();
    res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=300');
    res.status(200).json(data);
  } catch {
    // 後備：就算 Demo 沒部署，白皮書/首頁也能顯示
    res.status(200).json({
      token:'WORLDPEACE',
      thresholds:{ proposer:1_000_000, voter:200_000, verifier:15_000 },
      feeBps:{ min:5, max:40, default:25 },
      branding:{
        hero:'Make World Peace Real — On-chain Charity.',
        pitch:'Every swap funds peace. Transparent, auditable, unstoppable.'
      },
      community:{
        website:'https://your.site',
        x:'https://x.com/your_handle',
        telegram:'https://t.me/your_channel',
        discord:'https://discord.gg/your_invite',
        github:'https://github.com/0xChrisSKR',
        gitbook:'https://your.gitbook.io',
        cmc:'https://coinmarketcap.com/currencies/your-token',
        coingecko:'https://www.coingecko.com/en/coins/your-token'
      }
    })
  }
}
