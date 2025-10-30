import Link from 'next/link';
import LogoPeace from '../components/LogoPeace';

export default function Peace() {
  return (
    <main style={{minHeight:'100vh',padding:'32px 20px',fontFamily:'Inter, ui-sans-serif, system-ui',background:'#fff',color:'#111'}}>
      <header style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}>
        <LogoPeace />
        <div>
          <h1 style={{margin:0,fontSize:36,fontWeight:800}}>PeaceDAO</h1>
          <p style={{margin:'6px 0 0',opacity:.7}}>這是 demo 頁面：實際按鈕會連到鏈上捐款位。</p>
          <nav style={{marginTop:8,display:'flex',gap:12,fontSize:14}}>
            <Link href="/minimal">/minimal</Link>
            <Link href="/diagnostics">/diagnostics</Link>
            <a href="/api/peace/config" target="_blank" rel="noreferrer">/api/peace/config</a>
          </nav>
        </div>
      </header>

      <section style={{maxWidth:720}}>
        <div style={{border:'1px solid #e5e7eb',borderRadius:14,padding:20,boxShadow:'0 1px 2px rgba(0,0,0,.04)'}}>
          <h3 style={{marginTop:0}}>Donate</h3>
          <p style={{marginTop:0,opacity:.7}}>To: 0x0000000000000000000000000000000000000000</p>
          <div style={{display:'flex',gap:12}}>
            <input defaultValue="0.01" style={{flex:1,height:44,padding:'0 14px',border:'1px solid #e5e7eb',borderRadius:10}} />
            <button disabled style={{height:44,padding:'0 18px',border:'1px solid #e5e7eb',borderRadius:999,background:'#f3f4f6'}}>
              Donate
            </button>
          </div>
          <p style={{fontSize:12,opacity:.6,marginTop:10}}>（等下步接上合約後，這顆按鈕就會真的發交易）</p>
        </div>
      </section>
    </main>
  );
}
