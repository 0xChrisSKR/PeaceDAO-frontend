import { ethers } from 'ethers';

export const env = {
  DAO: process.env.NEXT_PUBLIC_DAO ?? '',
  GATE: process.env.NEXT_PUBLIC_GATE ?? '',
  FUND: process.env.NEXT_PUBLIC_FUND ?? '',
  ROUTER: process.env.NEXT_PUBLIC_ROUTER ?? '',
  TOKEN: process.env.NEXT_PUBLIC_TOKEN ?? '',
  RPC: process.env.NEXT_PUBLIC_RPC ?? ''
};

export const DAO_ABI = [
  'event ProposalCreated(uint256 indexed id, address indexed proposer, string title, string description, uint256 deadline)',
  'function createProposal(string title, string description, uint256 amount, address recipient) returns (uint256)',
  'function proposalCount() view returns (uint256)',
  'function proposals(uint256) view returns (uint256 id, string title, string description, address proposer, uint256 amount, address recipient, uint256 deadline, uint256 forVotes, uint256 againstVotes, bool executed)',
  'function vote(uint256 proposalId, bool support) external',
  'function executeProposal(uint256 proposalId) external'
];

export const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address account) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)'
];

export const ROUTER_ABI = [
  'function getAmountsOut(uint256 amountIn, address[] calldata path) view returns (uint256[] memory amounts)',
  'function swapExactTokensForTokensWithFee(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline, uint256 feeOut, address feeRecipient) returns (uint256[] memory amounts)'
];

export const getReadProvider = () => {
  if (!env.RPC) {
    throw new Error('NEXT_PUBLIC_RPC is required for read operations');
  }
  return new ethers.providers.JsonRpcProvider(env.RPC);
};

export const createContract = <T extends ethers.Contract>(
  address: string,
  abi: readonly string[] | ethers.ContractInterface,
  signerOrProvider: ethers.Signer | ethers.providers.Provider
): T => {
  if (!address) {
    throw new Error('Missing contract address');
  }
  return new ethers.Contract(address, abi, signerOrProvider) as T;
};

export const isEnvConfigured = () =>
  Object.entries(env).every(([key, value]) => {
    if (!value) {
      console.warn(`Missing NEXT_PUBLIC_${key} environment variable.`);
      return false;
    }
    return true;
  });
