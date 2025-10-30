"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { isAddress } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from "wagmi";
import erc20Abi from "@/abi/erc20.json";
import env from "@/config/env";
import { DEFAULT_CHAIN } from "@/config/chains";
import governanceAbi from "@/lib/contracts/governanceAbi";
import { formatTokenAmount } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/components/LanguageProvider";
import ClaimStake from "@/components/proposal/ClaimStake";

interface ProposalClientProps {
  proposalId: string;
}

type ProposalStruct =
  | (readonly [bigint, `0x${string}`, bigint, bigint, boolean, boolean] & {
      id: bigint;
      proposer: `0x${string}`;
      startTime: bigint;
      endTime: bigint;
      executed: boolean;
      canceled: boolean;
    })
  | undefined;

type VoteStruct =
  | (readonly [bigint, bigint, bigint] & {
      forVotes: bigint;
      againstVotes: bigint;
      totalVotes: bigint;
    })
  | undefined;

type ValidationStruct =
  | (readonly [bigint, bigint] & {
      likes: bigint;
      dislikes: bigint;
    })
  | undefined;

type ReceiptStruct =
  | (readonly [boolean, boolean, bigint] & {
      hasVoted: boolean;
      support: boolean;
      weight: bigint;
    })
  | undefined;

function formatWindow(start?: Date | null, end?: Date | null) {
  if (!start || !end) return "—";
  return `${start.toLocaleString()} → ${end.toLocaleString()}`;
}

function formatValidatorPreference(value: number, dictionary: Dictionary) {
  if (value > 0) return dictionary.proposal.validatorLiked;
  if (value < 0) return dictionary.proposal.validatorDisliked;
  return dictionary.proposal.validatorNeutral;
}

export default function ProposalClient({ proposalId }: ProposalClientProps) {
  const { dictionary } = useLanguage();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync: writeVoteContractAsync, isPending: isVotePending } = useWriteContract();
  const {
    writeContractAsync: writeValidatorContractAsync,
    isPending: isValidatorPending
  } = useWriteContract();

  const [voteHash, setVoteHash] = useState<`0x${string}` | undefined>();
  const [validatorHash, setValidatorHash] = useState<`0x${string}` | undefined>();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  const parsedProposalId = useMemo(() => {
    try {
      return BigInt(proposalId);
    } catch {
      return null;
    }
  }, [proposalId]);

  const governanceAddress = env.governance;
  const governanceConfigured = isAddress(governanceAddress ?? "");
  const tokenAddress = env.peaceToken;
  const tokenConfigured = isAddress(tokenAddress ?? "");

  const proposalArgs = parsedProposalId !== null ? ([parsedProposalId] as const) : undefined;
  const voteReceiptArgs =
    governanceConfigured && address && parsedProposalId !== null
      ? ([parsedProposalId, address] as const)
      : undefined;
  const preferenceArgs = voteReceiptArgs;

  const {
    data: proposalData,
    refetch: refetchProposal
  } = useReadContract({
    address: governanceConfigured ? (governanceAddress as `0x${string}`) : undefined,
    abi: governanceAbi,
    functionName: "getProposal",
    args: proposalArgs,
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: Boolean(governanceConfigured && parsedProposalId !== null)
    }
  });

  const {
    data: voteData,
    refetch: refetchVotes
  } = useReadContract({
    address: governanceConfigured ? (governanceAddress as `0x${string}`) : undefined,
    abi: governanceAbi,
    functionName: "proposalVotes",
    args: proposalArgs,
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: Boolean(governanceConfigured && parsedProposalId !== null),
      refetchInterval: 30_000
    }
  });

  const {
    data: validationData,
    refetch: refetchValidations
  } = useReadContract({
    address: governanceConfigured ? (governanceAddress as `0x${string}`) : undefined,
    abi: governanceAbi,
    functionName: "proposalValidations",
    args: proposalArgs,
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: Boolean(governanceConfigured && parsedProposalId !== null),
      refetchInterval: 30_000
    }
  });

  const {
    data: receiptData,
    refetch: refetchReceipt
  } = useReadContract({
    address: voteReceiptArgs ? (governanceAddress as `0x${string}`) : undefined,
    abi: governanceAbi,
    functionName: "getVoteReceipt",
    args: voteReceiptArgs,
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: Boolean(voteReceiptArgs)
    }
  });

  const {
    data: preferenceData,
    refetch: refetchPreference
  } = useReadContract({
    address: preferenceArgs ? (governanceAddress as `0x${string}`) : undefined,
    abi: governanceAbi,
    functionName: "getValidatorPreference",
    args: preferenceArgs,
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: Boolean(preferenceArgs)
    }
  });

  const { data: tokenDecimalsData } = useReadContract({
    address: tokenConfigured ? (tokenAddress as `0x${string}`) : undefined,
    abi: erc20Abi,
    functionName: "decimals",
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: tokenConfigured
    }
  });

  const {
    data: balanceData,
    refetch: refetchBalance
  } = useReadContract({
    address: tokenConfigured && address ? (tokenAddress as `0x${string}`) : undefined,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: tokenConfigured && address ? [address] : undefined,
    chainId: DEFAULT_CHAIN.id,
    query: {
      enabled: Boolean(tokenConfigured && address),
      refetchInterval: 60_000
    }
  });

  const { isLoading: isVoteConfirming } = useWaitForTransactionReceipt({
    hash: voteHash,
    chainId: DEFAULT_CHAIN.id
  });

  const { isLoading: isValidatorConfirming } = useWaitForTransactionReceipt({
    hash: validatorHash,
    chainId: DEFAULT_CHAIN.id
  });

  const proposal = proposalData as ProposalStruct;
  const votes = voteData as VoteStruct;
  const validations = validationData as ValidationStruct;
  const receipt = receiptData as ReceiptStruct;
  const preferenceValue = preferenceData ? Number(preferenceData) : 0;

  const decimals = typeof tokenDecimalsData === "number" ? tokenDecimalsData : 18;
  const base = BigInt(10) ** BigInt(decimals);
  const thresholds = {
    propose: 1_000_000n * base,
    vote: 200_000n * base,
    validator: 15_000n * base
  };

  const balance = typeof balanceData === "bigint" ? balanceData : 0n;

  const startTime = proposal ? new Date(Number(proposal.startTime) * 1000) : null;
  const endTime = proposal ? new Date(Number(proposal.endTime) * 1000) : null;

  const hasStarted = startTime ? now >= startTime.getTime() : false;
  const hasEnded = endTime ? now >= endTime.getTime() : false;
  const isCanceled = proposal?.canceled ?? false;
  const isExecuted = proposal?.executed ?? false;

  const votingActive = hasStarted && !hasEnded && !isCanceled && !isExecuted;
  const votingClosed = !votingActive && (hasEnded || isExecuted || isCanceled);

  const statusText = isCanceled
    ? dictionary.proposal.status.canceled
    : isExecuted
      ? dictionary.proposal.status.executed
      : !hasStarted
        ? dictionary.proposal.status.pending
        : votingActive
          ? dictionary.proposal.status.active
          : dictionary.proposal.status.closed;

  const forVotes = votes?.forVotes ?? 0n;
  const againstVotes = votes?.againstVotes ?? 0n;
  const totalVotes = votes?.totalVotes ?? forVotes + againstVotes;
  const likes = validations?.likes ?? 0n;
  const dislikes = validations?.dislikes ?? 0n;

  const hasVotingPower = balance >= thresholds.vote;
  const hasValidatorPower = balance >= thresholds.validator;
  const canParticipate = governanceConfigured && tokenConfigured && parsedProposalId !== null;

  const voteButtonDisabled =
    !canParticipate ||
    !votingActive ||
    !isConnected ||
    chainId !== DEFAULT_CHAIN.id ||
    !hasVotingPower ||
    isVotePending ||
    isVoteConfirming;

  const validatorButtonDisabled =
    !canParticipate ||
    !votingActive ||
    !isConnected ||
    chainId !== DEFAULT_CHAIN.id ||
    !hasValidatorPower ||
    isValidatorPending ||
    isValidatorConfirming;

  const voteStatusMessage = !isConnected
    ? dictionary.proposal.connectWallet
    : chainId !== DEFAULT_CHAIN.id
      ? dictionary.proposal.wrongNetwork
      : !hasVotingPower
        ? dictionary.proposal.voteThresholdNotice
        : !votingActive
          ? dictionary.proposal.voteClosed
          : dictionary.proposal.voteReady;

  const validatorStatusMessage = !isConnected
    ? dictionary.proposal.connectWallet
    : chainId !== DEFAULT_CHAIN.id
      ? dictionary.proposal.wrongNetwork
      : !hasValidatorPower
        ? dictionary.proposal.validatorThresholdNotice
        : !votingActive
          ? dictionary.proposal.voteClosed
          : dictionary.proposal.validatorReady;

  const handleVote = async (support: boolean) => {
    if (!canParticipate) {
      toast.error(dictionary.proposal.notConfigured);
      return;
    }
    if (parsedProposalId === null) {
      toast.error(dictionary.proposal.invalidSubtitle);
      return;
    }
    if (!isConnected) {
      toast.error(dictionary.proposal.connectWallet);
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(dictionary.proposal.wrongNetwork);
      return;
    }
    if (!hasVotingPower) {
      toast.error(dictionary.proposal.voteThresholdNotice);
      return;
    }
    if (!votingActive) {
      toast.error(dictionary.proposal.voteClosed);
      return;
    }
    try {
      const hash = await writeVoteContractAsync({
        address: governanceAddress as `0x${string}`,
        abi: governanceAbi,
        functionName: "castVote",
        args: [parsedProposalId, support],
        chainId: DEFAULT_CHAIN.id
      });
      setVoteHash(hash);
      toast.success(dictionary.proposal.voteSuccess);
      await Promise.all([refetchVotes(), refetchReceipt(), refetchBalance()]);
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to vote";
      toast.error(message);
    }
  };

  const handleValidatorPreference = async (choice: 1 | -1) => {
    if (!canParticipate) {
      toast.error(dictionary.proposal.notConfigured);
      return;
    }
    if (parsedProposalId === null) {
      toast.error(dictionary.proposal.invalidSubtitle);
      return;
    }
    if (!isConnected) {
      toast.error(dictionary.proposal.connectWallet);
      return;
    }
    if (chainId !== DEFAULT_CHAIN.id) {
      toast.error(dictionary.proposal.wrongNetwork);
      return;
    }
    if (!hasValidatorPower) {
      toast.error(dictionary.proposal.validatorThresholdNotice);
      return;
    }
    if (!votingActive) {
      toast.error(dictionary.proposal.voteClosed);
      return;
    }
    const next = preferenceValue === choice ? 0 : choice;
    try {
      const hash = await writeValidatorContractAsync({
        address: governanceAddress as `0x${string}`,
        abi: governanceAbi,
        functionName: "setValidatorPreference",
        args: [parsedProposalId, BigInt(next)],
        chainId: DEFAULT_CHAIN.id
      });
      setValidatorHash(hash);
      toast.success(
        next === 0
          ? dictionary.proposal.validatorCleared
          : dictionary.proposal.validatorSuccess
      );
      await Promise.all([refetchValidations(), refetchPreference(), refetchBalance()]);
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to update preference";
      toast.error(message);
    }
  };

  const handleClaimed = async () => {
    await Promise.all([refetchBalance(), refetchVotes(), refetchValidations(), refetchReceipt(), refetchPreference(), refetchProposal()]);
  };

  if (parsedProposalId === null) {
    return (
      <div className="space-y-6">
        <PageTitle title={dictionary.proposal.invalidTitle} subtitle={dictionary.proposal.invalidSubtitle} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageTitle
        title={`${dictionary.proposal.titlePrefix} #${proposalId}`}
        subtitle={dictionary.proposal.subtitle}
      />

      {!governanceConfigured ? (
        <Card className="bg-amber-50/80 text-sm text-amber-700">
          {dictionary.proposal.notConfigured}
        </Card>
      ) : null}

      {!tokenConfigured ? (
        <Card className="bg-amber-50/80 text-sm text-amber-700">
          {dictionary.proposal.tokenNotConfigured}
        </Card>
      ) : null}

      <Card className="bg-white/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-600">{dictionary.proposal.statusLabel}</p>
            <p className="text-2xl font-semibold text-slate-900">{statusText}</p>
            <p className="text-xs text-slate-500">
              {dictionary.proposal.windowLabel}: {formatWindow(startTime, endTime)}
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-700">{dictionary.proposal.thresholdHeading}</p>
            <ul className="space-y-1">
              <li>{dictionary.proposal.thresholds.propose}</li>
              <li>{dictionary.proposal.thresholds.vote}</li>
              <li>{dictionary.proposal.thresholds.validator}</li>
            </ul>
            <p className="text-xs text-slate-500">{dictionary.proposal.lockNotice}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-white/80">
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-slate-900">{dictionary.proposal.voteSectionTitle}</h2>
            <p className="text-xs text-slate-500">{voteStatusMessage}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
              <p className="text-xs font-semibold uppercase text-emerald-600">{dictionary.proposal.forLabel}</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700">
                {formatTokenAmount(forVotes, decimals)} PEACE
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4">
              <p className="text-xs font-semibold uppercase text-rose-600">{dictionary.proposal.againstLabel}</p>
              <p className="mt-2 text-2xl font-semibold text-rose-700">
                {formatTokenAmount(againstVotes, decimals)} PEACE
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase text-slate-600">{dictionary.proposal.totalLabel}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-700">
                {formatTokenAmount(totalVotes, decimals)} PEACE
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
              onClick={() => handleVote(true)}
              disabled={voteButtonDisabled}
            >
              {isVotePending || isVoteConfirming ? dictionary.common.loading : dictionary.proposal.voteForCta}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
              onClick={() => handleVote(false)}
              disabled={voteButtonDisabled}
            >
              {isVotePending || isVoteConfirming ? dictionary.common.loading : dictionary.proposal.voteAgainstCta}
            </button>
          </div>
          {receipt?.hasVoted ? (
            <p className="text-xs text-slate-500">
              {dictionary.proposal.voteReceipt(
                receipt.support ? dictionary.proposal.forLabel : dictionary.proposal.againstLabel,
                `${formatTokenAmount(receipt.weight, decimals)} PEACE`
              )}
            </p>
          ) : null}
        </div>
      </Card>

      <Card className="bg-white/80">
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-slate-900">{dictionary.proposal.validatorSectionTitle}</h2>
            <p className="text-xs text-slate-500">{validatorStatusMessage}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4">
              <p className="text-xs font-semibold uppercase text-sky-600">{dictionary.proposal.likeLabel}</p>
              <p className="mt-2 text-2xl font-semibold text-sky-700">
                {formatTokenAmount(likes, decimals)} PEACE
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
              <p className="text-xs font-semibold uppercase text-amber-600">{dictionary.proposal.dislikeLabel}</p>
              <p className="mt-2 text-2xl font-semibold text-amber-700">
                {formatTokenAmount(dislikes, decimals)} PEACE
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold text-white shadow-sm transition ${
                preferenceValue > 0 ? "bg-sky-600" : "bg-sky-500 hover:bg-sky-600"
              }`}
              onClick={() => handleValidatorPreference(1)}
              disabled={validatorButtonDisabled}
            >
              {isValidatorPending || isValidatorConfirming
                ? dictionary.common.loading
                : dictionary.proposal.likeCta}
            </button>
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold text-white shadow-sm transition ${
                preferenceValue < 0 ? "bg-amber-600" : "bg-amber-500 hover:bg-amber-600"
              }`}
              onClick={() => handleValidatorPreference(-1)}
              disabled={validatorButtonDisabled}
            >
              {isValidatorPending || isValidatorConfirming
                ? dictionary.common.loading
                : dictionary.proposal.dislikeCta}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            {dictionary.proposal.validatorStatus(formatValidatorPreference(preferenceValue, dictionary))}
          </p>
        </div>
      </Card>

      {votingClosed && governanceConfigured ? (
        <ClaimStake
          governanceAddress={governanceAddress as `0x${string}`}
          proposalId={parsedProposalId}
          onClaimed={handleClaimed}
        />
      ) : null}
    </div>
  );
}
