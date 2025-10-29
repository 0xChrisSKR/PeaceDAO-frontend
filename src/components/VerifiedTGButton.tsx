"use client";

import env from "@/config/env";
import { useAccount } from "wagmi";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { fromWei, formatNumber } from "@/lib/format";
import toast from "react-hot-toast";
import type { Address } from "viem";
import { isAddress } from "viem";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";

interface Props {
  requiredBalance: number;
}

export function VerifiedTGButton({ requiredBalance }: Props) {
  const { isConnected } = useAccount();
  const { t } = useTranslation();
  const peaceTokenAddress = useMemo(() => {
    if (!env.peaceToken) return undefined;
    return isAddress(env.peaceToken) ? (env.peaceToken as Address) : undefined;
  }, []);

  const { data: balance } = useTokenBalance(peaceTokenAddress, { watch: true });

  const numericBalance = balance ? Number(fromWei(balance)) : 0;
  const hasAccess = numericBalance >= requiredBalance;

  const handleClick = () => {
    if (!isConnected) {
      toast.error(t("verify.toast.connect"));
      return;
    }
    if (!hasAccess) {
      toast.error(t("verify.toast.insufficient", { amount: requiredBalance }));
      return;
    }
    if (env.tgVerified) {
      window.open(env.tgVerified, "_blank", "noopener");
    }
  };

  const balanceLabel = isConnected
    ? t("verify.button.currentBalance", {
        balance: `${formatNumber(numericBalance, 2)} $PEACE`
      })
    : t("verify.button.connectWallet");

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-lg border border-brand bg-brand/80 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand"
    >
      {hasAccess
        ? t("verify.button.openVerified")
        : t("verify.button.holdToUnlock", { amount: requiredBalance })}
      <div className="mt-1 text-xs text-slate-200/80">{balanceLabel}</div>
    </button>
  );
}
