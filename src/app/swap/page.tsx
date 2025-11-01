export default function SwapPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Swap（即將上線）</h1>
      <p className="mt-2 text-white/70">目標：BSC 路由聚合、手續費回饋治理金庫。手續費範例：<b className="text-yellow-300">0.3% 其中 0.05% 回饋金庫</b>（僅示意）。</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm text-white/60 mb-2">僅示意 UI（之後接 API/Router）</div>
        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-lg bg-black/30 p-4">
            <div className="text-xs text-white/60 mb-1">From</div>
            <div className="flex gap-2">
              <select className="rounded bg-black/40 px-3 py-2 border border-white/10">
                <option>BNB</option>
              </select>
              <input className="flex-1 rounded bg-black/40 px-3 py-2 border border-white/10" placeholder="0.0" />
            </div>
          </div>
          <div className="text-center text-white/50">↓</div>
          <div className="rounded-lg bg-black/30 p-4">
            <div className="text-xs text-white/60 mb-1">To</div>
            <div className="flex gap-2">
              <select className="rounded bg-black/40 px-3 py-2 border border-white/10">
                <option>USDT</option>
                <option>BUSD</option>
                <option>Other</option>
              </select>
              <input className="flex-1 rounded bg-black/40 px-3 py-2 border border-white/10" placeholder="0.0 (estimate)" />
            </div>
          </div>
          <button disabled className="rounded-md bg-emerald-600/40 px-4 py-2 text-white cursor-not-allowed">Swap（即將開放）</button>
        </div>

        <div className="mt-4 text-sm text-white/60">提示：主網為 <b className="text-yellow-300">BSC</b>，所有交易手續費以 BNB 支付。</div>
      </div>
    </main>
  )
}
