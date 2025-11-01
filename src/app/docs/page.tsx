"use client";
import Nav from "@/components/Nav";
export default function DocsPage() {
  return (
    <main style={{maxWidth:1100,margin:"0 auto"}}>
      <Nav />
      <div style={{padding:"18px 16px"}}>
        <h1 style={{fontSize:28,fontWeight:800,marginBottom:8}}>WorldPeace DAO Docs（展示）</h1>
        <ul style={{marginTop:12,lineHeight:1.8}}>
          <li>連結錢包後自動分級，解鎖聊天室與提案權限（展示版未開啟錢包連線）。</li>
          <li>Peace Fund 用於社群公共物品，位址可 ENV 指定或自動解析（目前顯示示例位址）。</li>
          <li>治理資料來自 DEMO_API_BASE（展示版使用假資料）。</li>
          <li>Swap 手續費由治理決定，展示頁顯示 0.25% 並鎖定按鈕不可按。</li>
        </ul>
      </div>
    </main>
  );
}
