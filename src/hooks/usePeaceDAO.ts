import { useCallback, useMemo } from "react";
import { Address, formatUnits, isAddress, parseUnits } from "viem";
import { useAccount, useChainId, useWriteContract } from "wagmi";

import peaceDaoAbi from "@/abi/peaceDao.json";
import env from "@/config/env";
import { DEFAULT_CHAIN } from "@/config/chains";
import { useTokenBalance } from "@/hooks/useTokenBalance";

const TOKEN_DECIMALS = 18;

export const PROPOSAL_THRESHOLD = parseUnits("1000000", TOKEN_DECIMALS);
export const VOTE_THRESHOLD = parseUnits("200000", TOKEN_DECIMALS);
export const VALIDATION_THRESHOLD = parseUnits("15000", TOKEN_DECIMALS);

type ProposalIdLike = bigint | number | string;

type PeaceDaoHook = {
  daoAddress: Address | null;
  targetChainId: number;
  tokenBalance: bigint;
  formattedBalance: string;
  canCreate: boolean;
  canVote: boolean;
  canValidate: boolean;
  isConnected: boolean;
  isConfigured: boolean;
  isCorrectNetwork: boolean;
  createProposal: (
    recipient: string,
    title: string,
    description: string,
    periodInDays: number | string
  ) => Promise<`0x${string}`>;
  vote: (proposalId: ProposalIdLike, support: boolean, reason: string) => Promise<`0x${string}`>;
  validate: (proposalId: ProposalIdLike, likeIt: boolean) => Promise<`0x${string}`>;
  finalize: (proposalId: ProposalIdLike) => Promise<`0x${string}`>;
  executeDonation: (proposalId: ProposalIdLike) => Promise<`0x${string}`>;
};

function normalizeProposalId(value: ProposalIdLike) {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error("Invalid proposal id");
    }
    return BigInt(value);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      throw new Error("Proposal id is required");
    }
    try {
      return BigInt(trimmed);
    } catch (error) {
      throw new Error("Invalid proposal id");
    }
  }
  throw new Error("Invalid proposal id");
}

export function usePeaceDAO(): PeaceDaoHook {
  const { address } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();

  const daoAddressString = env.peaceDao;
  const peaceToken = env.peaceToken;
  const configuredChainId = Number(env.daoChainId);
  const targetChainId = Number.isFinite(configuredChainId) && configuredChainId > 0 ? configuredChainId : DEFAULT_CHAIN.id;

  const daoAddress = useMemo<Address | null>(
    () => (daoAddressString && isAddress(daoAddressString) ? (daoAddressString as Address) : null),
    [daoAddressString]
  );

  const { data: balanceData } = useTokenBalance(
    peaceToken && isAddress(peaceToken) ? (peaceToken as Address) : undefined,
    { watch: true }
  );

  const tokenBalance = balanceData ?? 0n;
  const formattedBalance = useMemo(() => formatUnits(tokenBalance, TOKEN_DECIMALS), [tokenBalance]);

  const isConnected = Boolean(address);
  const isConfigured = Boolean(daoAddress);
  const isCorrectNetwork = !chainId || chainId === targetChainId;

  const canCreate = tokenBalance >= PROPOSAL_THRESHOLD;
  const canVote = tokenBalance >= VOTE_THRESHOLD;
  const canValidate = tokenBalance >= VALIDATION_THRESHOLD;

  const ensureReady = useCallback(
    (threshold?: bigint) => {
      if (!isConfigured || !daoAddress) {
        throw new Error("PeaceDAO contract address is not configured");
      }
      if (!isConnected || !address) {
        throw new Error("Connect your wallet to continue");
      }
      if (!isCorrectNetwork) {
        throw new Error("Switch to the supported network");
      }
      if (threshold && tokenBalance < threshold) {
        throw new Error("Insufficient PEACE balance");
      }
    },
    [address, daoAddress, isConfigured, isConnected, isCorrectNetwork, tokenBalance]
  );

  const createProposal = useCallback<PeaceDaoHook["createProposal"]>(
    async (recipient, title, description, periodInDays) => {
      ensureReady(PROPOSAL_THRESHOLD);

      if (!isAddress(recipient)) {
        throw new Error("Recipient must be a valid address");
      }

      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        throw new Error("Proposal title is required");
      }

      const trimmedDescription = description.trim();
      if (!trimmedDescription) {
        throw new Error("Proposal description is required");
      }

      const numericPeriod = Number(periodInDays);
      if (!Number.isFinite(numericPeriod) || numericPeriod <= 0) {
        throw new Error("Voting period must be greater than zero");
      }

      const periodSeconds = BigInt(Math.floor(numericPeriod * 24 * 60 * 60));

      return writeContractAsync({
        address: daoAddress!,
        abi: peaceDaoAbi,
        functionName: "createProposal",
        chainId: targetChainId,
        args: [recipient as Address, trimmedTitle, trimmedDescription, periodSeconds]
      });
    },
    [daoAddress, ensureReady, targetChainId, writeContractAsync]
  );

  const vote = useCallback<PeaceDaoHook["vote"]>(
    async (proposalId, support, reason) => {
      ensureReady(VOTE_THRESHOLD);

      const normalizedId = normalizeProposalId(proposalId);
      const normalizedReason = reason.trim();

      return writeContractAsync({
        address: daoAddress!,
        abi: peaceDaoAbi,
        functionName: "vote",
        chainId: targetChainId,
        args: [normalizedId, support, normalizedReason]
      });
    },
    [daoAddress, ensureReady, targetChainId, writeContractAsync]
  );

  const validate = useCallback<PeaceDaoHook["validate"]>(
    async (proposalId, likeIt) => {
      ensureReady(VALIDATION_THRESHOLD);
      const normalizedId = normalizeProposalId(proposalId);

      return writeContractAsync({
        address: daoAddress!,
        abi: peaceDaoAbi,
        functionName: "validate",
        chainId: targetChainId,
        args: [normalizedId, likeIt]
      });
    },
    [daoAddress, ensureReady, targetChainId, writeContractAsync]
  );

  const finalize = useCallback<PeaceDaoHook["finalize"]>(
    async (proposalId) => {
      ensureReady();
      const normalizedId = normalizeProposalId(proposalId);

      return writeContractAsync({
        address: daoAddress!,
        abi: peaceDaoAbi,
        functionName: "finalize",
        chainId: targetChainId,
        args: [normalizedId]
      });
    },
    [daoAddress, ensureReady, targetChainId, writeContractAsync]
  );

  const executeDonation = useCallback<PeaceDaoHook["executeDonation"]>(
    async (proposalId) => {
      ensureReady();
      const normalizedId = normalizeProposalId(proposalId);

      return writeContractAsync({
        address: daoAddress!,
        abi: peaceDaoAbi,
        functionName: "executeDonation",
        chainId: targetChainId,
        args: [normalizedId]
      });
    },
    [daoAddress, ensureReady, targetChainId, writeContractAsync]
  );

  return {
    daoAddress,
    targetChainId,
    tokenBalance,
    formattedBalance,
    canCreate,
    canVote,
    canValidate,
    isConnected,
    isConfigured,
    isCorrectNetwork,
    createProposal,
    vote,
    validate,
    finalize,
    executeDonation
  };
}
