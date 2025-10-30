const treasuryAbi = [
  {
    type: "function",
    name: "executePayout",
    stateMutability: "nonpayable",
    inputs: [{ name: "proposalId", type: "uint256" }],
    outputs: []
  },
  {
    type: "function",
    name: "getPayout",
    stateMutability: "view",
    inputs: [{ name: "proposalId", type: "uint256" }],
    outputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "executed", type: "bool" }
    ]
  }
] as const;

export default treasuryAbi;
