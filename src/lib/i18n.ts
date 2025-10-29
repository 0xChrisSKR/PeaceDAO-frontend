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
    common: {
      accessTitle: string;
      balanceLabel: string;
      contractMissing: string;
      notConnected: string;
      wrongNetwork: string;
      createRequirement: string;
      voteRequirement: string;
      validateRequirement: string;
      txLabel: string;
      viewOnExplorer: string;
    };
    new: {
      title: string;
      subtitle: string;
      recipientLabel: string;
      titleLabel: string;
      descriptionLabel: string;
      periodLabel: string;
      periodHelper: string;
      submit: string;
      success: string;
    };
    detail: {
      title: string;
      subtitle: string;
      voteTitle: string;
      voteHelper: string;
      supportLabel: string;
      supportFor: string;
      supportAgainst: string;
      reasonLabel: string;
      reasonPlaceholder: string;
      submit: string;
      success: string;
      finalizeTitle: string;
      finalizeHelper: string;
      finalizeCta: string;
      finalizeSuccess: string;
      executeTitle: string;
      executeHelper: string;
      executeCta: string;
      executeSuccess: string;
    };
    validate: {
      title: string;
      subtitle: string;
      helper: string;
      approve: string;
      reject: string;
      successApprove: string;
      successReject: string;
    };
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
      common: {
        accessTitle: "Governance access",
        balanceLabel: "Your PEACE balance",
        contractMissing: "PeaceDAO contract address is not configured.",
        notConnected: "Connect your wallet to interact with governance.",
        wrongNetwork: "Switch to the configured network to continue.",
        createRequirement: "At least {amount} PEACE are required to create proposals.",
        voteRequirement: "At least {amount} PEACE are required to vote.",
        validateRequirement: "At least {amount} PEACE are required to validate impact.",
        txLabel: "Latest transaction hash",
        viewOnExplorer: "View on block explorer"
      },
      new: {
        title: "Create a proposal",
        subtitle: "Draft a funding proposal that the DAO can evaluate and support.",
        recipientLabel: "Recipient address",
        titleLabel: "Proposal title",
        descriptionLabel: "Description",
        periodLabel: "Voting period (days)",
        periodHelper: "Proposals stay open for the selected number of days before finalization.",
        submit: "Publish proposal",
        success: "Proposal transaction submitted"
      },
      detail: {
        title: "Proposal",
        subtitle: "Cast your weighted vote and steward the PeaceFund responsibly.",
        voteTitle: "Cast your vote",
        voteHelper: "Your PEACE holdings determine your voting power.",
        supportLabel: "Support",
        supportFor: "For",
        supportAgainst: "Against",
        reasonLabel: "Reason (optional)",
        reasonPlaceholder: "Share context for your vote",
        submit: "Submit vote",
        success: "Vote transaction submitted",
        finalizeTitle: "Finalize proposal",
        finalizeHelper: "Finalize after the voting period ends.",
        finalizeCta: "Finalize",
        finalizeSuccess: "Finalize transaction submitted",
        executeTitle: "Execute donation",
        executeHelper: "Send the approved donation to the recipient.",
        executeCta: "Execute donation",
        executeSuccess: "Execute transaction submitted"
      },
      validate: {
        title: "Validate proposal impact",
        subtitle: "Signal whether the deliverables matched the community promises.",
        helper: "Validators lock in the final verdict that documents the PeaceDAO impact.",
        approve: "Mark as delivered",
        reject: "Flag issues",
        successApprove: "Validation submitted: marked as delivered",
        successReject: "Validation submitted: flagged issues"
      }
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
      common: {
        accessTitle: "治理权限",
        balanceLabel: "你的 PEACE 余额",
        contractMissing: "尚未配置 PeaceDAO 合约地址。",
        notConnected: "请连接钱包以参与治理。",
        wrongNetwork: "请切换到指定网络后继续操作。",
        createRequirement: "创建提案至少需要持有 {amount} 枚 PEACE。",
        voteRequirement: "投票至少需要持有 {amount} 枚 PEACE。",
        validateRequirement: "验证成效至少需要持有 {amount} 枚 PEACE。",
        txLabel: "最新交易哈希",
        viewOnExplorer: "在区块浏览器查看"
      },
      new: {
        title: "创建提案",
        subtitle: "撰写一个让 DAO 能够评估并支持的资金提案。",
        recipientLabel: "受款地址",
        titleLabel: "提案标题",
        descriptionLabel: "提案说明",
        periodLabel: "投票期间（天）",
        periodHelper: "提案将在所选天数后结束并可执行。",
        submit: "提交提案",
        success: "提案交易已送出"
      },
      detail: {
        title: "提案",
        subtitle: "投下与你持仓权重相符的一票，共同守护和平基金。",
        voteTitle: "投票",
        voteHelper: "你的 PEACE 持仓将决定投票权重。",
        supportLabel: "立场",
        supportFor: "赞成",
        supportAgainst: "反对",
        reasonLabel: "理由（选填）",
        reasonPlaceholder: "写下你投票的背景说明",
        submit: "送出投票",
        success: "投票交易已送出",
        finalizeTitle: "完成提案",
        finalizeHelper: "投票期结束后即可执行完成。",
        finalizeCta: "完成提案",
        finalizeSuccess: "完成交易已送出",
        executeTitle: "执行捐款",
        executeHelper: "将获准的款项发送给受款方。",
        executeCta: "执行捐款",
        executeSuccess: "执行交易已送出"
      },
      validate: {
        title: "验证提案成效",
        subtitle: "确认交付成果是否符合社区承诺。",
        helper: "验证者的判断将写入链上，记录 PeaceDAO 的影响成果。",
        approve: "标记为已达成",
        reject: "提出疑虑",
        successApprove: "验证已送出：标记为已达成",
        successReject: "验证已送出：提出疑虑"
      }
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
