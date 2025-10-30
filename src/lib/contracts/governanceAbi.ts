const governanceAbi = [
  {
    type: "function",
    name: "getProposal",
    stateMutability: "view",
    inputs: [{ name: "proposalId", type: "uint256" }],
    outputs: [
      { name: "id", type: "uint256" },
      { name: "proposer", type: "address" },
      { name: "startTime", type: "uint64" },
      { name: "endTime", type: "uint64" },
      { name: "executed", type: "bool" },
      { name: "canceled", type: "bool" }
    ]
  },
  {
    type: "function",
    name: "proposalVotes",
    stateMutability: "view",
    inputs: [{ name: "proposalId", type: "uint256" }],
    outputs: [
      { name: "forVotes", type: "uint256" },
      { name: "againstVotes", type: "uint256" },
      { name: "totalVotes", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "proposalValidations",
    stateMutability: "view",
    inputs: [{ name: "proposalId", type: "uint256" }],
    outputs: [
      { name: "likes", type: "uint256" },
      { name: "dislikes", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "getVoteReceipt",
    stateMutability: "view",
    inputs: [
      { name: "proposalId", type: "uint256" },
      { name: "account", type: "address" }
    ],
    outputs: [
      { name: "hasVoted", type: "bool" },
      { name: "support", type: "bool" },
      { name: "weight", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "getValidatorPreference",
    stateMutability: "view",
    inputs: [
      { name: "proposalId", type: "uint256" },
      { name: "account", type: "address" }
    ],
    outputs: [{ name: "preference", type: "int8" }]
  },
  {
    type: "function",
    name: "castVote",
    stateMutability: "nonpayable",
    inputs: [
      { name: "proposalId", type: "uint256" },
      { name: "support", type: "bool" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "setValidatorPreference",
    stateMutability: "nonpayable",
    inputs: [
      { name: "proposalId", type: "uint256" },
      { name: "preference", type: "int8" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "canClaimStake",
    stateMutability: "view",
    inputs: [
      { name: "proposalId", type: "uint256" },
      { name: "account", type: "address" }
    ],
    outputs: [{ name: "eligible", type: "bool" }]
  },
  {
    type: "function",
    name: "claimStake",
    stateMutability: "nonpayable",
    inputs: [{ name: "proposalId", type: "uint256" }],
    outputs: []
  }
] as const;

export default governanceAbi;
