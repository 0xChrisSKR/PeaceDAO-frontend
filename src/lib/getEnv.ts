// Utility to safely read environment variables supporting both KEY and NEXT_PUBLIC_KEY

declare global {
  interface Window {
    __ENV__?: Record<string, string | undefined>;
  }
}

export function getEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process.env) {
    const direct = process.env[key];
    if (typeof direct === "string" && direct.length > 0) {
      return direct;
    }
    const publicKey = key.startsWith("NEXT_PUBLIC_") ? key : `NEXT_PUBLIC_${key}`;
    const publicValue = process.env[publicKey];
    if (typeof publicValue === "string" && publicValue.length > 0) {
      return publicValue;
    }
  }

  if (typeof window !== "undefined") {
    const publicKey = key.startsWith("NEXT_PUBLIC_") ? key : `NEXT_PUBLIC_${key}`;
    return window.__ENV__?.[publicKey];
  }

  return undefined;
}

export default getEnv;
