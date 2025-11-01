// 擴充環境變數型別（避免 TS 對不認識的 KEY 亂報錯）
declare namespace NodeJS {
  interface ProcessEnv {
    PEACE_FUND?: string;
    NEXT_PUBLIC_PEACE_FUND?: string;
    DONATE_ADDRESS?: string;
    NEXT_PUBLIC_DONATE_ADDRESS?: string;

    GOVERNANCE_API?: string;
    NEXT_PUBLIC_GOVERNANCE_API?: string;
    DEMO_API_BASE?: string;
    NEXT_PUBLIC_DEMO_API_BASE?: string;
    DEMO_CONFIG_PATH?: string;
    NEXT_PUBLIC_DEMO_CONFIG_PATH?: string;
    DEMO_DONATE_PATH?: string;
    NEXT_PUBLIC_DEMO_DONATE_PATH?: string;

    GOVERNANCE_API_KEY?: string;
    NEXT_PUBLIC_GOVERNANCE_API_KEY?: string;
    GOVERNANCE_API_KEY_HEADER?: string;
    NEXT_PUBLIC_GOVERNANCE_API_KEY_HEADER?: string;

    PEACE_FUND_HINTS?: string;
    NEXT_PUBLIC_PEACE_FUND_HINTS?: string;
  }
}
// 允許 window.__ENV__（若未注入也不影響）
interface Window {
  __ENV__?: Record<string, string>;
}

