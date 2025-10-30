export default function Whitepaper() {
  return (
    <div className="prose prose-invert max-w-3xl">
      <h1>World Peace DAO — 白皮書（簡版） / Whitepaper (Brief)</h1>
      <h2>一、金庫（Treasury）</h2>
      <ul>
        <li>金庫地址由智慧合約部署時產生，任何人（包含發起人）都無法私自提領。</li>
        <li>所有轉出皆須透過「提案 → 投票 → 執行」流程完成。</li>
      </ul>
      <h2>二、質押與投票（Staking &amp; Voting）</h2>
      <ul>
        <li>投票前須質押代幣；投票視為有效票後，質押將於 24 小時內退回。</li>
        <li>預設門檻：持幣 &ge; 15,000 才具投票資格（可由治理升級）。</li>
      </ul>
      <h2>三、捐贈（Donation）</h2>
      <ul>
        <li>捐贈入金庫；提案決議可撥付給受助對象或團隊獎勵地址。</li>
      </ul>

      <hr />
      <p className="text-sm opacity-70">
        English brief: The Treasury is a contract-owned account; no one can withdraw
        without a governance proposal approved by token holders. Staked tokens are
        returned within 24h after the vote is counted. Default voting threshold is
        15,000 tokens (governance-upgradable).
      </p>
    </div>
  );
}
