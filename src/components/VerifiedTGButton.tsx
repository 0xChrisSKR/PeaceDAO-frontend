"use client";

import env from "@/config/env";
import { useAccount } from "wagmi";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { fromWei, formatNumber } from "@/lib/format";
import toast from "react-hot-toast";
import type { Address } from "viem";

interface Props {
  requiredBalance: number;
}

export function VerifiedTGButton({ requiredBalance }: Props) {
  const { isConnected } = useAccount();
  const { data: balance } = useTokenBalance(env.peaceToken as Address | undefined, { watch: true });

  const numericBalance = balance ? Number(fromWei(balance)) : 0;
  const hasAccess = numericBalance >= requiredBalance;

  const handleClick = () => {
    if (!isConnected) {
      toast.error("Connect your wallet to verify access");
      return;
    }
    if (!hasAccess) {
      toast.error(`You need at least ${requiredBalance} tokens to access the verified channel.`);
      return;
    }
    if (env.tgVerified) {
      window.open(env.tgVerified, "_blank", "noopener");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-lg border border-brand bg-brand/80 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand"
    >
      {hasAccess ? "Open Verified Telegram" : `Hold ${requiredBalance}+ $PEACE to unlock`}
      <div className="mt-1 text-xs text-slate-200/80">
        Current balance: {isConnected ? `${formatNumber(numericBalance, 2)} $PEACE` : "Connect wallet"}
      </div>
    </button>
  );
}
