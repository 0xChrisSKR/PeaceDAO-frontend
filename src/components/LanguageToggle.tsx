"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lng, setLng] = useState<"zh" | "en">("zh");

  useEffect(() => {
    const current = (searchParams.get("lng") as "zh" | "en") || "zh";
    setLng(current);
  }, [searchParams]);

  const switchTo = (target: "zh" | "en") => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("lng", target);
    document.cookie = `lng=${target};path=/;max-age=31536000`;
    const query = sp.toString();
    const targetUrl = query ? `${pathname}?${query}` : pathname;
    router.push(targetUrl);
  };

  return (
    <div className="text-sm flex items-center gap-2">
      <button onClick={() => switchTo("zh")} className={lng === "zh" ? "font-semibold underline" : ""}>
        中文
      </button>
      <span>／</span>
      <button onClick={() => switchTo("en")} className={lng === "en" ? "font-semibold underline" : ""}>
        EN
      </button>
    </div>
  );
}
