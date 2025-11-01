'use client';
import { useState } from 'react';

const dict = {
  zh: {
    heroTitle: '讓世界和平成真 — 區塊鏈慈善',
    heroPitch: '每一次交易，都回饋和平基金。公開、可稽核、不可阻擋。',
    readWhitepaper: '閱讀白皮書',
    donate: '捐款',
    treasury: '國庫',
    price: '價格',
    officialLinks: '官方連結',
    socialAndListings: '社群與上架', // ✅ 補上
    linksHint: '官網 / X / TG / Discord / GitHub / GitBook / CMC / CoinGecko',
    verifier: '驗證者',
    fee: '手續費',
    default: '預設',
    whitepaper: '白皮書',
    governanceThresholds: '治理門檻',
    feeGov: '手續費治理',
    feeRange: '範圍',
    suggestedSplit: '建議分配',
    viewTreasury: '查看國庫',
    balance: '餘額',
    native: '原生幣',
    onChain: '鏈上即時',
    lastBlock: '最新區塊',
    goDonate: '前往捐款',
    donateDesc: '錢包直接把原生幣打到和平基金（鏈上）。',
    sending: '送出中…',
    send: '送出',
  },
  en: {
    heroTitle: 'Make World Peace Real — On-chain Charity.',
    heroPitch: 'Every swap funds peace. Transparent, auditable, unstoppable.',
    readWhitepaper: 'Read Whitepaper',
    donate: 'Donate',
    treasury: 'Treasury',
    price: 'Price',
    officialLinks: 'Official Links',
    socialAndListings: 'Community & Listings', // ✅ 補上
    linksHint: 'Website / X / TG / Discord / GitHub / GitBook / CMC / CoinGecko',
    verifier: 'Verifier',
    fee: 'Fee',
    default: 'default',
    whitepaper: 'Whitepaper',
    governanceThresholds: 'Governance Thresholds',
    feeGov: 'Fee Governance',
    feeRange: 'Range',
    suggestedSplit: 'Suggested split',
    viewTreasury: 'View Treasury',
    balance: 'Balance',
    native: 'Native',
    onChain: 'On-chain via RPC',
    lastBlock: 'Last Block',
    goDonate: 'Go to Donate',
    donateDesc: 'Send native token directly to the Peace Fund (on-chain).',
    sending: 'Sending...',
    send: 'Send',
  }
};

export function useI18n() {
  // 保留語言偏好
  const [lang, setLang] = useState<'zh'|'en'>(
    (typeof window !== 'undefined' && (localStorage.getItem('lang') as 'zh'|'en')) || 'zh'
  );

  // ✅ 放寬 key 型別，避免日後新增文案時再卡編譯
  const t = (k: string, fallback?: string) =>
    (dict[lang] as Record<string, string>)[k] ?? fallback ?? k;

  const toggle = () => {
    const next = lang === 'zh' ? 'en' : 'zh';
    setLang(next);
    if (typeof window !== 'undefined') localStorage.setItem('lang', next);
  };

  return { t, lang, toggle };
}
