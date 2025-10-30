import { DonationABI } from "@/abis/Donation";
import { GovernanceABI } from "@/abis/Governance";
import { TreasuryABI } from "@/abis/Treasury";
import { ENV } from "./env";

export const DONATION_ADDRESS = ENV.DONATION_ADDRESS;
export const TREASURY_ADDRESS = ENV.TREASURY_ADDRESS;
export const GOVERNANCE_ADDRESS = ENV.GOVERNANCE_ADDRESS;

/** On-chain ABIs sourced from the generated artifacts. */
export const GovernanceAbi = GovernanceABI;
export const TreasuryAbi = TreasuryABI;
export const DonationAbi = DonationABI;
