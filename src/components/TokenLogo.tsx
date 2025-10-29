import Image from "next/image";
import clsx from "clsx";
import type { TokenInfo } from "@/types/token";

interface TokenLogoProps {
  token: Pick<TokenInfo, "symbol" | "logoURI">;
  size?: number;
  className?: string;
}

export function TokenLogo({ token, size = 32, className }: TokenLogoProps) {
  const dimension = size;
  const initials = token.symbol.replace(/\s+/g, "").slice(0, 3) || "?";

  if (token.logoURI) {
    return (
      <Image
        src={token.logoURI}
        alt={`${token.symbol} logo`}
        width={dimension}
        height={dimension}
        className={clsx("rounded-full", className)}
      />
    );
  }

  return (
    <span
      className={clsx(
        "flex items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700",
        className
      )}
      style={{ width: dimension, height: dimension, fontSize: dimension / 2.5 }}
    >
      {initials}
    </span>
  );
}
