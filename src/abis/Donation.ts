import type { Abi } from "viem";

export const DonationABI = [
  {
    type: "function",
    name: "donate",
    stateMutability: "payable",
    inputs: [{ name: "note", type: "string" }],
    outputs: []
  },
  {
    type: "function",
    name: "balance",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "event",
    name: "Donated",
    inputs: [
      { name: "donor", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "note", type: "string", indexed: false }
    ],
    anonymous: false
  }
] as const satisfies Abi;

export default DonationABI;
