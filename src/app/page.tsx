import AppHeader from '@/components/AppHeader'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl px-5 pt-28 space-y-10 text-center">
        <section className="space-y-4">
          <h1 className="title">WorldPeace DAO</h1>
          <p className="text-lg text-white/70 leading-relaxed">
            建立以代幣驗證為核心的社群治理與慈善平台。<br/>
            所有收款與捐款<b className="text-yellow-300">僅接受 BNB（BSC）</b>。
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/swap" className="btn-gold">前往 Swap</Link>
            <Link href="/whitepaper" className="px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition">Docs / 白皮書</Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h2 className="text-xl text-yellow-300 mb-2">金庫透明化</h2>
            <p className="text-white/70 text-sm">所有捐款自動進入金庫合約，支援鏈上查詢。</p>
          </div>
          <div className="card">
            <h2 className="text-xl text-yellow-300 mb-2">治理回饋</h2>
            <p className="text-white/70 text-sm">手續費自動回流金庫，依貢獻等級分配權限。</p>
          </div>
          <div className="card">
            <h2 className="text-xl text-yellow-300 mb-2">跨鏈聚合</h2>
            <p className="text-white/70 text-sm">未來支援 Pancake + 0x 聚合路由與多鏈交換。</p>
          </div>
        </section>

        <footer className="text-center text-white/40 text-sm pt-10 border-t border-white/10">
          © 2025 WorldPeace DAO · 僅支援 BNB Smart Chain (BSC)
        </footer>
      </main>
    </>
  )
}
