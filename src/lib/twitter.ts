import env from "@/config/env";

const DEFAULT_HANDLE = "@WorldPeace_BNB";

export function getHandleFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/^\/+/, "");
    if (!path) {
      return DEFAULT_HANDLE;
    }
    const handle = path.split("/")[0];
    if (!handle) {
      return DEFAULT_HANDLE;
    }
    return `@${decodeURIComponent(handle)}`;
  } catch (error) {
    return DEFAULT_HANDLE;
  }
}

export const twitterUrl = env.twitter;
export const twitterHandle = getHandleFromUrl(twitterUrl);
