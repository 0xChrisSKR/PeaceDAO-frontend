import AppHeader from '@/components/AppHeader'

export default function VotePage() {
  return (
    <>
      <AppHeader />
      <main className="max-w-3xl mx-auto px-5 pt-28 space-y-6">
        <h1 className="title">投票詳情</h1>
        <p className="text-white/70">提案內容：資金分配至社區救助金庫。</p>
        <div className="flex justify-center gap-4">
          <button className="btn-gold">同意 ✅</button>
          <button className="px-5 py-2.5 border border-red-400 text-red-400 rounded-lg hover:bg-red-400/20">反對 ❌</button>
        </div>
      </main>
    </>
  )
}
