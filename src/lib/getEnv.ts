// 通用安全取 env：同時支援 KEY 與 NEXT_PUBLIC_KEY（瀏覽器只會讀到 NEXT_PUBLIC_）
// 若之後你要在 _document 注入 window.__ENV__ 也能讀
export function getEnv(key: string): string | undefined {
  // Node 端（含 build）
  if (typeof process !== "undefined" && process.env) {
    if (process.env[key]) return process.env[key];
    const pub = `NEXT_PUBLIC_${key}`;
    if (process.env[pub]) return process.env[pub];
  }
  // Browser 端（可選：支援 window.__ENV__）
  if (typeof window !== "undefined") {
    const pub = `NEXT_PUBLIC_${key}`;
    // @ts-ignore
    return (window.__ENV__ && window.__ENV__[pub]) || undefined;
  }
  return undefined;
}

