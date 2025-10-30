export type Locale = "en" | "zh";

export interface Dictionary {
  nav: {
    home: string;
    donate: string;
    treasury: string;
    governance: string;
    verify: string;
    about: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    title: string;
    subtitle: string;
    donateCta: string;
    treasuryCta: string;
    verifyCta: string;
    peaceFundLabel: string;
    peaceFundMissing: string;
  };
  home: {
    badge: string;
    statChain: string;
    statChainHelper: string;
    statToken: string;
    statTokenHelper: string;
    statTelegram: string;
    statTelegramHelper: string;
    impactTitle: string;
    impactBody: string;
    joinTitle: string;
    joinBody: string;
    bscScanCta: string;
    guildCta: string;
    telegramCta: string;
  };
  donate: {
    title: string;
    subtitle: string;
    amountLabel: string;
    noteLabel: string;
    amountPlaceholder: string;
    notePlaceholder: string;
    submit: string;
    success: string;
    txLabel: string;
    viewOnBscScan: string;
    minError: string;
    notConnected: string;
    networkError: string;
    missingPeaceFund: string;
    noteHelper: string;
    disabledTitle: string;
  };
  treasury: {
    title: string;
    subtitle: string;
    balanceLabel: string;
    updated: string;
    loading: string;
    missing: string;
    executeTitle: string;
    executeDescription: string;
    proposalIdLabel: string;
    proposalIdPlaceholder: string;
    executeCta: string;
    executeSuccess: string;
    notConnected: string;
    wrongNetwork: string;
    invalidId: string;
  };
  proposal: {
    titlePrefix: string;
    subtitle: string;
    invalidTitle: string;
    invalidSubtitle: string;
    notConfigured: string;
    tokenNotConfigured: string;
    statusLabel: string;
    windowLabel: string;
    status: {
      pending: string;
      active: string;
      closed: string;
      executed: string;
      canceled: string;
    };
    thresholdHeading: string;
    thresholds: {
      propose: string;
      vote: string;
      validator: string;
    };
    lockNotice: string;
    connectWallet: string;
    wrongNetwork: string;
    voteSectionTitle: string;
    voteReady: string;
    voteClosed: string;
    voteThresholdNotice: string;
    voteForCta: string;
    voteAgainstCta: string;
    voteSuccess: string;
    voteReceipt: (direction: string, amount: string) => string;
    forLabel: string;
    againstLabel: string;
    totalLabel: string;
    validatorSectionTitle: string;
    validatorReady: string;
    validatorThresholdNotice: string;
    likeLabel: string;
    dislikeLabel: string;
    likeCta: string;
    dislikeCta: string;
    validatorStatus: (status: string) => string;
    validatorLiked: string;
    validatorDisliked: string;
    validatorNeutral: string;
    validatorCleared: string;
    validatorSuccess: string;
    claimTitle: string;
    claimDescription: string;
    claimCta: string;
    claimConnect: string;
    claimWrongNetwork: string;
    claimReady: string;
    claimUnavailable: string;
    claimSuccess: string;
  };
  governance: {
    title: string;
    subtitle: string;
    thresholdsTitle: string;
    chat: string;
    vote: string;
    propose: string;
    resourcesTitle: string;
    whitepaper: string;
    frontendRepo: string;
    contractsRepo: string;
  };
  verify: {
    title: string;
    subtitle: string;
    guildCta: string;
    public: string;
    verified: string;
    helper: string;
  };
  about: {
    title: string;
    subtitle: string;
    missionTitle: string;
    missionBody: string;
    fundTitle: string;
    fundBody: string;
    docsCta: string;
    tokenLabel: string;
    twitterLabel: string;
  };
  footer: {
    rights: string;
    twitter: string;
    docs: string;
  };
  wallet: {
    connect: string;
    connecting: string;
    disconnect: string;
    copy: string;
    copied: string;
    wrongNetwork: string;
    switch: string;
    noConnector: string;
  };
  common: {
    loading: string;
    updated: string;
  };
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      donate: "Donate",
      treasury: "Treasury",
      governance: "Governance",
      verify: "Verify",
      about: "About",
      openMenu: "Open menu",
      closeMenu: "Close menu"
    },
    hero: {
      title: "On-chain charity. Verifiable impact.",
      subtitle:
        "World Peace DAO directs transparent resources to peacemakers worldwide with auditable smart contracts.",
      donateCta: "Donate",
      treasuryCta: "Treasury",
      verifyCta: "Verify",
      peaceFundLabel: "PeaceFund",
      peaceFundMissing: "PeaceFund wallet not configured"
    },
    home: {
      badge: "World Peace DAO",
      statChain: "Binance Smart Chain",
      statChainHelper: "Mainnet",
      statToken: "PEACE token",
      statTokenHelper: "Governance utility on BSC",
      statTelegram: "Telegram",
      statTelegramHelper: "Join the public coordination channel",
      impactTitle: "Impact-first coordination",
      impactBody: "Direct donations go to vetted peacebuilders. Notes capture the stories that move the world forward.",
      joinTitle: "Join the movement",
      joinBody: "Guild verification unlocks strategy rooms, while Telegram keeps peacemakers synchronized in real time.",
      bscScanCta: "View on BscScan",
      guildCta: "Guild",
      telegramCta: "Telegram"
    },
    donate: {
      title: "Donate to the PeaceFund",
      subtitle: "Fuel peace missions with BNB. Every donation is recorded on Binance Smart Chain.",
      amountLabel: "Amount (BNB)",
      noteLabel: "Note (optional)",
      amountPlaceholder: "0.5",
      notePlaceholder: "Share a message of peace",
      submit: "Send Donation",
      success: "Donation submitted",
      txLabel: "Transaction hash",
      viewOnBscScan: "View on BscScan",
      minError: "Enter at least 0.001 BNB",
      notConnected: "Connect your wallet to donate",
      networkError: "Switch to BSC mainnet to donate",
      missingPeaceFund: "PeaceFund contract address is not configured",
      noteHelper: "Notes are saved on-chain to celebrate every act of peace.",
      disabledTitle: "PeaceFund not configured"
    },
    treasury: {
      title: "Treasury",
      subtitle: "Track balances and trigger governance-approved payouts from the Peace Treasury.",
      balanceLabel: "Treasury balance",
      updated: "Updated",
      loading: "Loading treasury data...",
      missing: "Treasury contract address is not configured.",
      executeTitle: "Execute governance payout",
      executeDescription:
        "Use a passed proposal id to release funds. Only proposals that reached quorum and succeeded can execute.",
      proposalIdLabel: "Proposal id",
      proposalIdPlaceholder: "Enter proposal id",
      executeCta: "Execute payout",
      executeSuccess: "Payout transaction sent",
      notConnected: "Connect your wallet to execute payouts.",
      wrongNetwork: "Switch to the configured chain to execute payouts.",
      invalidId: "Enter a valid proposal id."
    },
    proposal: {
      titlePrefix: "Proposal",
      subtitle:
        "Each governance vote runs for 24 hours. Stake PEACE to participate across the proposal, voting, and validator tiers.",
      invalidTitle: "Proposal unavailable",
      invalidSubtitle: "The proposal id in the URL is invalid.",
      notConfigured: "Governance contract address is not configured.",
      tokenNotConfigured: "PEACE token address is not configured.",
      statusLabel: "Status",
      windowLabel: "Voting window",
      status: {
        pending: "Not started",
        active: "Voting active",
        closed: "Voting closed",
        executed: "Executed",
        canceled: "Canceled"
      },
      thresholdHeading: "Participation thresholds",
      thresholds: {
        propose: "Propose — stake 1,000,000 PEACE",
        vote: "Vote — stake 200,000 PEACE",
        validator: "Validator like/dislike — stake 15,000 PEACE"
      },
      lockNotice: "Voting and validation lock PEACE for the full 24-hour window.",
      connectWallet: "Connect your wallet to participate.",
      wrongNetwork: "Switch to the configured chain to participate.",
      voteSectionTitle: "On-chain votes",
      voteReady: "You can cast one vote during the 24-hour window.",
      voteClosed: "Voting is closed.",
      voteThresholdNotice: "Voting requires at least 200,000 PEACE staked.",
      voteForCta: "Vote For",
      voteAgainstCta: "Vote Against",
      voteSuccess: "Vote submitted",
      voteReceipt: (direction: string, amount: string) => `You voted ${direction} with ${amount}.`,
      forLabel: "For",
      againstLabel: "Against",
      totalLabel: "Total",
      validatorSectionTitle: "Validator feedback",
      validatorReady: "Validators can signal once per proposal.",
      validatorThresholdNotice: "Validator feedback requires at least 15,000 PEACE staked.",
      likeLabel: "Likes",
      dislikeLabel: "Dislikes",
      likeCta: "Like",
      dislikeCta: "Dislike",
      validatorStatus: (status: string) => `Your current feedback: ${status}.`,
      validatorLiked: "Like",
      validatorDisliked: "Dislike",
      validatorNeutral: "No feedback",
      validatorCleared: "Feedback cleared",
      validatorSuccess: "Feedback updated",
      claimTitle: "Claim your stake",
      claimDescription:
        "After the 24-hour window ends you can reclaim the PEACE you locked to vote or validate.",
      claimCta: "Claim stake",
      claimConnect: "Connect your wallet to claim your locked PEACE.",
      claimWrongNetwork: "Switch to the configured chain to claim.",
      claimReady: "You can reclaim your staked PEACE.",
      claimUnavailable: "You have no stake to claim for this proposal.",
      claimSuccess: "Stake claimed"
    },
    governance: {
      title: "Governance",
      subtitle: "Token-weighted participation unlocks deeper coordination inside World Peace DAO.",
      thresholdsTitle: "Thresholds",
      chat: "Validator like/dislike — 15,000 PEACE",
      vote: "Vote power — 200,000 PEACE",
      propose: "Proposal rights — 1,000,000 PEACE",
      resourcesTitle: "Resources",
      whitepaper: "Read the whitepaper",
      frontendRepo: "Frontend repository",
      contractsRepo: "Contracts repository"
    },
    verify: {
      title: "Verify your membership",
      subtitle: "Use Guild to prove your holdings and join the global coordination hubs.",
      guildCta: "Verify with Guild",
      public: "Public Telegram",
      verified: "Verified Telegram",
      helper: "Guild checks PEACE balances on BSC to unlock coordination hubs."
    },
    about: {
      title: "About World Peace DAO",
      subtitle: "A global cooperative aligning capital for peace.",
      missionTitle: "Mission",
      missionBody:
        "We mobilize on-chain capital to prevent conflict, rebuild communities, and empower peacekeepers in every region.",
      fundTitle: "PeaceFund",
      fundBody:
        "The PeaceFund smart contract receives donations, records transparent notes, and streams aid to verified field partners.",
      docsCta: "Open the whitepaper",
      tokenLabel: "Token",
      twitterLabel: "Twitter"
    },
    footer: {
      rights: "© World Peace DAO. Peace requires all of us.",
      twitter: "Follow on X",
      docs: "Docs"
    },
    wallet: {
      connect: "Connect Wallet",
      connecting: "Connecting...",
      disconnect: "Disconnect",
      copy: "Copy address",
      copied: "Address copied",
      wrongNetwork: "You are connected to the wrong network.",
      switch: "Switch to",
      noConnector: "Install a Web3 wallet or configure WalletConnect."
    },
    common: {
      loading: "Loading...",
      updated: "Updated"
    }
  },
  zh: {
    nav: {
      home: "首页",
      donate: "捐赠",
      treasury: "资金池",
      governance: "治理",
      verify: "验证",
      about: "关于",
      openMenu: "打开菜单",
      closeMenu: "关闭菜单"
    },
    hero: {
      title: "链上慈善，可验证的影响力",
      subtitle: "World Peace DAO 通过可审计的智能合约，将透明资金送到全球和平行动者手中。",
      donateCta: "立即捐赠",
      treasuryCta: "查看资金池",
      verifyCta: "身份验证",
      peaceFundLabel: "PeaceFund",
      peaceFundMissing: "PeaceFund 地址未配置"
    },
    home: {
      badge: "World Peace DAO",
      statChain: "币安智能链",
      statChainHelper: "主网",
      statToken: "PEACE 代币",
      statTokenHelper: "BSC 上的治理凭证",
      statTelegram: "Telegram",
      statTelegramHelper: "加入公开协调频道",
      impactTitle: "以影响力为先的协作",
      impactBody: "捐赠直达经过验证的和平行动者，留言记录推动世界前行的故事。",
      joinTitle: "加入行动",
      joinBody: "Guild 验证解锁策略空间，Telegram 提供前线实时资讯。",
      bscScanCta: "在 BscScan 查看",
      guildCta: "Guild",
      telegramCta: "Telegram"
    },
    donate: {
      title: "向 PeaceFund 捐赠",
      subtitle: "用 BNB 支持和平任务。每笔捐赠都会记录在币安智能链上。",
      amountLabel: "金额（BNB）",
      noteLabel: "留言（可选）",
      amountPlaceholder: "0.5",
      notePlaceholder: "写下你的和平祝福",
      submit: "发送捐赠",
      success: "捐赠已提交",
      txLabel: "交易哈希",
      viewOnBscScan: "在 BscScan 查看",
      minError: "请输入至少 0.001 BNB",
      notConnected: "请先连接钱包再捐赠",
      networkError: "切换到 BSC 主网后再捐赠",
      missingPeaceFund: "PeaceFund 合约地址未配置",
      noteHelper: "留言将保存在链上，记录每一次和平行动。",
      disabledTitle: "PeaceFund 未配置"
    },
    treasury: {
      title: "资金池",
      subtitle: "监控资金池余额，并依治理提案执行金库拨款。",
      balanceLabel: "资金池余额",
      updated: "更新时间",
      loading: "正在加载资金池数据...",
      missing: "金库合约地址尚未设定。",
      executeTitle: "执行治理拨款",
      executeDescription: "输入已通过的提案编号触发拨款，仅限达到法定票数并通过的提案。",
      proposalIdLabel: "提案编号",
      proposalIdPlaceholder: "输入提案编号",
      executeCta: "执行拨款",
      executeSuccess: "拨款交易已送出",
      notConnected: "请连接钱包以执行拨款。",
      wrongNetwork: "请切换到指定的链以执行拨款。",
      invalidId: "请输入有效的提案编号。"
    },
    proposal: {
      titlePrefix: "提案",
      subtitle: "每场治理投票皆为 24 小时时段，需质押 PEACE 才能进入提案、投票与验证三层门槛。",
      invalidTitle: "无法显示提案",
      invalidSubtitle: "网址中的提案编号无效。",
      notConfigured: "治理合约地址尚未设定。",
      tokenNotConfigured: "PEACE 代币地址尚未设定。",
      statusLabel: "状态",
      windowLabel: "投票时段",
      status: {
        pending: "未开始",
        active: "投票进行中",
        closed: "投票已结束",
        executed: "已执行",
        canceled: "已取消"
      },
      thresholdHeading: "参与门槛",
      thresholds: {
        propose: "提案 — 质押 1,000,000 PEACE",
        vote: "投票 — 质押 200,000 PEACE",
        validator: "验证按赞/倒赞 — 质押 15,000 PEACE"
      },
      lockNotice: "投票与验证的 PEACE 将在 24 小时投票期结束后才能领取。",
      connectWallet: "请连接钱包以参与。",
      wrongNetwork: "请切换到指定的链上网络。",
      voteSectionTitle: "链上投票",
      voteReady: "在 24 小时时段内你可投票一次。",
      voteClosed: "投票已结束。",
      voteThresholdNotice: "投票需质押至少 200,000 枚 PEACE。",
      voteForCta: "投赞成票",
      voteAgainstCta: "投反对票",
      voteSuccess: "投票已送出",
      voteReceipt: (direction: string, amount: string) => `你以 ${amount} 投下 ${direction}。`,
      forLabel: "赞成",
      againstLabel: "反对",
      totalLabel: "总票数",
      validatorSectionTitle: "验证者评价",
      validatorReady: "验证者每个提案可送出一次态度。",
      validatorThresholdNotice: "提交验证评价需质押至少 15,000 枚 PEACE。",
      likeLabel: "按赞",
      dislikeLabel: "倒赞",
      likeCta: "按赞",
      dislikeCta: "倒赞",
      validatorStatus: (status: string) => `你的目前评价：${status}。`,
      validatorLiked: "按赞",
      validatorDisliked: "倒赞",
      validatorNeutral: "尚未送出",
      validatorCleared: "评价已清除",
      validatorSuccess: "评价已更新",
      claimTitle: "领回质押",
      claimDescription: "24 小时投票期结束后，可领回用于投票或验证的 PEACE。",
      claimCta: "领回质押",
      claimConnect: "请连接钱包以领回质押。",
      claimWrongNetwork: "请切换到指定的链以领回质押。",
      claimReady: "你可领回本次质押的 PEACE。",
      claimUnavailable: "此提案没有可领回的质押。",
      claimSuccess: "质押已领回"
    },
    governance: {
      title: "治理",
      subtitle: "基于代币的参与机制，帮助你在 World Peace DAO 内更深入地协作。",
      thresholdsTitle: "门槛",
      chat: "验证按赞/倒赞 — 15,000 PEACE",
      vote: "投票权 — 200,000 PEACE",
      propose: "提案权 — 1,000,000 PEACE",
      resourcesTitle: "资源",
      whitepaper: "查看白皮书",
      frontendRepo: "前端仓库",
      contractsRepo: "合约仓库"
    },
    verify: {
      title: "验证你的身份",
      subtitle: "使用 Guild 证明持仓，加入全球协作网络。",
      guildCta: "前往 Guild 验证",
      public: "公开 Telegram",
      verified: "验证 Telegram",
      helper: "Guild 会读取 BSC 上的 PEACE 余额，为你解锁协作空间。"
    },
    about: {
      title: "关于 World Peace DAO",
      subtitle: "一个为和平聚合资源的全球协作网络。",
      missionTitle: "使命",
      missionBody: "我们动员链上资金，预防冲突、重建社区，并赋能各地的和平行动者。",
      fundTitle: "PeaceFund",
      fundBody: "PeaceFund 智能合约接收捐赠、记录透明留言，并向经过验证的前线伙伴拨付援助。",
      docsCta: "打开白皮书",
      tokenLabel: "代币",
      twitterLabel: "推特"
    },
    footer: {
      rights: "© World Peace DAO. 和平需要每个人。",
      twitter: "关注 X",
      docs: "文档"
    },
    wallet: {
      connect: "连接钱包",
      connecting: "正在连接...",
      disconnect: "断开连接",
      copy: "复制地址",
      copied: "地址已复制",
      wrongNetwork: "当前连接的网络不正确。",
      switch: "切换到",
      noConnector: "请安装 Web3 钱包或配置 WalletConnect。"
    },
    common: {
      loading: "加载中...",
      updated: "更新时间"
    }
  }
};

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "zh"] as const;
export const DEFAULT_LOCALE: Locale = "zh";

export function resolveLocale(value?: string | null): Locale {
  if (!value) {
    return DEFAULT_LOCALE;
  }
  const normalized = value.toLowerCase();
  const match = SUPPORTED_LOCALES.find((locale) => locale === normalized);
  return match ?? DEFAULT_LOCALE;
}

export function getDictionary(locale?: string | null): Dictionary {
  return dictionaries[resolveLocale(locale)];
}
