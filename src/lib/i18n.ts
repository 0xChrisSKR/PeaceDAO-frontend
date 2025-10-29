export type Locale = "en" | "zh";

export interface Dictionary {
  nav: {
    home: string;
    donate: string;
    treasury: string;
    governance: string;
    proposals: string;
    propose: string;
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
    eventsTitle: string;
    empty: string;
    fallback: string;
    loading: string;
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
  proposals: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    progressLabel: string;
    empty: string;
  };
  proposal: {
    overviewTitle: string;
    regionLabel: string;
    orgLabel: string;
    raisedLabel: string;
    goalLabel: string;
    progressLabel: string;
    donateTitle: string;
    donateDescription: string;
    amountLabel: string;
    amountPlaceholder: string;
    submitLabel: string;
    toast: string;
    approvalNote: string;
    receiverLabel: string;
  };
  proposePage: {
    title: string;
    subtitle: string;
    connectCta: string;
    gateTitle: string;
    gateRequirement: string;
    gateDescription: string;
    formTitle: string;
    titleLabel: string;
    regionLabel: string;
    orgLabel: string;
    goalLabel: string;
    receiverLabel: string;
    descriptionLabel: string;
    submitLabel: string;
    toast: string;
    addressError: string;
    goalError: string;
  };
  verify: {
    title: string;
    subtitle: string;
    guildCta: string;
    public: string;
    verified: string;
    helper: string;
    connectCta: string;
    gateRequirement: string;
    validatorMissing: string;
    proposalIdLabel: string;
    likeCta: string;
    claimCta: string;
    comingSoon: string;
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
      proposals: "Proposals",
      propose: "Propose",
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
      subtitle: "Track live PeaceFund balances and recent donations from the community.",
      balanceLabel: "Treasury balance",
      updated: "Updated",
      eventsTitle: "Recent donations",
      empty: "No donations recorded yet.",
      fallback: "We could not load recent donations. Try again soon or view the PeaceFund on BscScan.",
      loading: "Loading treasury data..."
    },
    governance: {
      title: "Governance",
      subtitle: "Token-weighted participation unlocks deeper coordination inside World Peace DAO.",
      thresholdsTitle: "Thresholds",
      chat: "Chat access — 100 PEACE",
      vote: "Vote power — 200,000 PEACE",
      propose: "Proposal rights — 1,000,000 PEACE",
      resourcesTitle: "Resources",
      whitepaper: "Read the whitepaper",
      frontendRepo: "Frontend repository",
      contractsRepo: "Contracts repository"
    },
    proposals: {
      title: "Live proposals",
      subtitle: "Preview humanitarian missions requesting PeaceFund support before on-chain streaming launches.",
      ctaLabel: "View proposal",
      progressLabel: "Progress",
      empty: "No proposals submitted yet."
    },
    proposal: {
      overviewTitle: "Overview",
      regionLabel: "Region",
      orgLabel: "Organization",
      raisedLabel: "Raised",
      goalLabel: "Goal",
      progressLabel: "Progress",
      donateTitle: "Support this mission",
      donateDescription: "Send BNB to the PeaceFund while governance finalizes on-chain proposal flows.",
      amountLabel: "Amount (BNB)",
      amountPlaceholder: "1",
      submitLabel: "Donate preview",
      toast: "On-chain donations from proposal pages are coming soon.",
      approvalNote:
        "After approval, proposer provides a BNB-receiving address; the fund releases directly from treasury.",
      receiverLabel: "Proposed receiver"
    },
    proposePage: {
      title: "Submit a proposal",
      subtitle: "Draft impact-driven plans for PeaceFund consideration once full governance tooling is live.",
      connectCta: "Connect wallet",
      gateTitle: "Insufficient PEACE balance",
      gateRequirement: "You need at least 1,000,000 $世界和平 to start a proposal.",
      gateDescription: "Accumulate governance weight by contributing to missions or purchasing tokens on supported venues.",
      formTitle: "Proposal details",
      titleLabel: "Title",
      regionLabel: "Region",
      orgLabel: "Organization",
      goalLabel: "Funding goal (BNB)",
      receiverLabel: "Receiving address",
      descriptionLabel: "Full description",
      submitLabel: "Save draft",
      toast: "On-chain proposal coming soon; stored locally for demo.",
      addressError: "Enter a valid BNB address.",
      goalError: "Set a funding goal greater than zero."
    },
    verify: {
      title: "Verify your membership",
      subtitle: "Use Guild to prove your holdings and join the global coordination hubs.",
      guildCta: "Verify with Guild",
      public: "Public Telegram",
      verified: "Verified Telegram",
      helper: "Guild checks PEACE balances on BSC to unlock coordination hubs.",
      connectCta: "Connect wallet",
      gateRequirement: "You need at least 200,000 $世界和平 to verify proposals and claim rewards.",
      validatorMissing: "Peace Validator contract not configured. Like & claim actions are temporarily disabled.",
      proposalIdLabel: "Proposal ID",
      likeCta: "Like (驗證按讚)",
      claimCta: "Claim reward (領取驗證獎勵)",
      comingSoon: "On-chain validator actions coming soon."
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
      proposals: "提案",
      propose: "发起提案",
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
      subtitle: "实时跟踪 PeaceFund 余额和最新社区捐赠。",
      balanceLabel: "资金池余额",
      updated: "更新时间",
      eventsTitle: "最新捐赠",
      empty: "暂时没有捐赠记录。",
      fallback: "无法加载最新捐赠，请稍后重试或在 BscScan 查看 PeaceFund。",
      loading: "正在加载资金池数据..."
    },
    governance: {
      title: "治理",
      subtitle: "基于代币的参与机制，帮助你在 World Peace DAO 内更深入地协作。",
      thresholdsTitle: "门槛",
      chat: "聊天权限 — 100 PEACE",
      vote: "投票权 — 200,000 PEACE",
      propose: "提案权 — 1,000,000 PEACE",
      resourcesTitle: "资源",
      whitepaper: "查看白皮书",
      frontendRepo: "前端仓库",
      contractsRepo: "合约仓库"
    },
    proposals: {
      title: "进行中的提案",
      subtitle: "在链上流程上线前，先行预览等待 PeaceFund 支持的人道任务。",
      ctaLabel: "查看提案",
      progressLabel: "进度",
      empty: "目前还没有提交的提案。"
    },
    proposal: {
      overviewTitle: "提案概览",
      regionLabel: "地区",
      orgLabel: "组织",
      raisedLabel: "已筹集",
      goalLabel: "目标",
      progressLabel: "进度",
      donateTitle: "支持这项任务",
      donateDescription: "治理流程完善前，可向 PeaceFund 捐赠 BNB 以表态支持。",
      amountLabel: "金额（BNB）",
      amountPlaceholder: "1",
      submitLabel: "预览捐赠",
      toast: "提案页面的链上捐赠即将上线。",
      approvalNote: "提案通过后，发起人会提交 BNB 收款地址，资金将由金库直接拨付。",
      receiverLabel: "拟收款地址"
    },
    proposePage: {
      title: "发起提案",
      subtitle: "在完整治理工具上线前，先编写你的影响力计划以便讨论。",
      connectCta: "连接钱包",
      gateTitle: "PEACE 余额不足",
      gateRequirement: "需要至少 1,000,000 枚 $世界和平 才能发起提案。",
      gateDescription: "通过支持任务或在支持的场所购买代币，累积你的治理权重。",
      formTitle: "提案详情",
      titleLabel: "标题",
      regionLabel: "地区",
      orgLabel: "组织",
      goalLabel: "目标金额（BNB）",
      receiverLabel: "收款地址",
      descriptionLabel: "详细说明",
      submitLabel: "保存草稿",
      toast: "链上提案即将推出；目前先在本地保存演示数据。",
      addressError: "请输入有效的 BNB 地址。",
      goalError: "请设置大于零的目标金额。"
    },
    verify: {
      title: "验证你的身份",
      subtitle: "使用 Guild 证明持仓，加入全球协作网络。",
      guildCta: "前往 Guild 验证",
      public: "公开 Telegram",
      verified: "验证 Telegram",
      helper: "Guild 会读取 BSC 上的 PEACE 余额，为你解锁协作空间。",
      connectCta: "连接钱包",
      gateRequirement: "需要至少 200,000 枚 $世界和平 才能验证提案并领取奖励。",
      validatorMissing: "Peace Validator 合约未配置，点赞与领奖功能暂时停用。",
      proposalIdLabel: "提案 ID",
      likeCta: "按讚验证",
      claimCta: "领取验证奖励",
      comingSoon: "链上验证操作即将上线。"
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

export const DEFAULT_LOCALE: Locale = "zh";

export function resolveLocale(value?: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  return value === "zh" ? "zh" : DEFAULT_LOCALE;
}

export function getDictionary(locale?: string | null): Dictionary {
  return dictionaries[resolveLocale(locale)];
}
