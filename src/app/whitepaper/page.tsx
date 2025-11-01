export default function WhitepaperPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 prose prose-invert">
      <h1>WorldPeace DAO 白皮書（概覽）</h1>
      <p><b>鏈與資產：</b>本專案僅於 <b>BNB Smart Chain（BSC）</b> 運行；<b className="text-yellow-300">所有收款/捐款只接受 BNB</b>。</p>

      <h2>願景</h2>
      <p>以代幣驗證為核心，建立去中心化的社群治理、捐助與激勵系統。未來延伸 DEX、跨鏈結算與多簽金庫管理。</p>

      <h2>捐款與金庫</h2>
      <ul>
        <li>僅接受 BNB；前端以 EIP-1193 直連錢包，交易以 <code>eth_sendTransaction</code> 發送。</li>
        <li>金庫地址可由環境變數 <code>NEXT_PUBLIC_TREASURY</code> 設定。</li>
        <li>所有捐款透明可查（BscScan）。</li>
      </ul>

      <h2>治理與權限</h2>
      <ul>
        <li>透過持幣/貢獻度換算治理等級，解鎖提案、投票與聊天室權限。</li>
        <li>等級演算法、權重與冷卻機制將在後續版本公開。</li>
      </ul>

      <h2>手續費與回饋（Swap 模組）</h2>
      <ul>
        <li>交易手續費示意：0.3%，其中 0.05% 回饋金庫（實際數值以上線時公告為準）。</li>
        <li>手續費以 <b>BNB</b> 或標的代幣結算，均最終歸集至金庫。</li>
      </ul>

      <h2>風險聲明</h2>
      <p>加密資產具高度波動性。請自行研究並承擔風險。本站前端僅提供介面，合約風險請審慎評估。</p>
    </main>
  )
}
