import AppHeader from '@/components/AppHeader'

export default function Swap() {
  return (
    <>
      <AppHeader />
      <main className="max-w-6xl mx-auto px-5 pt-28 grid md:grid-cols-2 gap-8">
        <section className="card">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Swap 交易區</h2>
          <p className="text-white/70 text-sm mb-6">未來將支援 PancakeSwap 聚合與治理費回饋。</p>
          <div className="space-y-3">
            <input placeholder="From (BNB)" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
            <input placeholder="To (代幣)" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
            <button className="btn-gold w-full">Swap</button>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">市場即時資訊</h2>
          <div className="h-48 bg-black/40 border border-white/10 rounded-lg flex items-center justify-center text-white/50">
            [即時深度圖 / K 線區塊]
          </div>
        </section>
      </main>
    </>
  )
}
