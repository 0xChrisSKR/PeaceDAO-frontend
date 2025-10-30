"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from "wagmi";
import { DEFAULT_CHAIN } from "@/config/chains";
import governanceAbi from "@/lib/contracts/governanceAbi";
import { Card } from "@/components/Card";
import { useLanguage } from "@/components/LanguageProvider";

interface ClaimStakeProps {
  governanceAddress: `0x${string}`;
  proposalId: bigint;
  onClaimed?: () => Promise<void> | void;
}

export default function ClaimStake({ governanceAddress, proposalId, onClaimed }: ClaimStakeProps) {
  const { dictionary } = useLanguage();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync, isPending } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>();

  const {
    data: eligibility,
    refetch: refetchEligibility
  } = useReadContract({
    address: address ? governanceAddress : undefined,
    abi: governanceAbi,
    functionName: "canClaimStake",
    args: address ? [proposalId, address] : undefined,
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: Boolean(address)
    }
  });

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
    chainId: DEFAULT_CHAIN.id
  });

  const canClaim = Boolean(eligibility);

  const statusMessage = !isConnected
    ? dictionary.proposal.claimConnect
    : chainId !== DEFAULT_CHAIN.id
      ? dictionary.proposal.claimWrongNetwork
      : canClaim
        ? dictionary.proposal.claimReady
        : dictionary.proposal.claimUnavailable;

  const handleClaim = async () => {
    if (!isConnected) {
      toast.error(dictionary.proposal.claimConnect);
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(dictionary.proposal.claimWrongNetwork);
      return;
    }
    if (!canClaim) {
      toast.error(dictionary.proposal.claimUnavailable);
      return;
    }

    try {
      const txHash = await writeContractAsync({
        address: governanceAddress,
        abi: governanceAbi,
        functionName: "claimStake",
        args: [proposalId],
        chainId: DEFAULT_CHAIN.id
      });
      setHash(txHash);
      toast.success(dictionary.proposal.claimSuccess);
      await refetchEligibility();
      if (onClaimed) {
        await onClaimed();
      }
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to claim";
      toast.error(message);
    }
  };

  return (
    <Card className="bg-white/80">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">{dictionary.proposal.claimTitle}</h2>
        <p className="text-sm text-slate-600">{dictionary.proposal.claimDescription}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
            onClick={handleClaim}
            disabled={isPending || isConfirming || !canClaim}
          >
            {isPending || isConfirming ? dictionary.common.loading : dictionary.proposal.claimCta}
          </button>
        </div>
        <p className="text-xs text-slate-500">{statusMessage}</p>
      </div>
    </Card>
  );
}
