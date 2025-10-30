import { ENV } from './env';

export const DONATION_ADDRESS = ENV.DONATION_ADDRESS;
export const TREASURY_ADDRESS = ENV.TREASURY_ADDRESS;
export const GOVERNANCE_ADDRESS = ENV.GOVERNANCE_ADDRESS;

/** 之後把實際 ABI 貼進來 */
export const GovernanceAbi = [] as const;
export const TreasuryAbi = [] as const;
export const DonationAbi = [] as const;
