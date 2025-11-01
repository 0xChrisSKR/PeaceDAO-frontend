import AppHeader from '@/components/AppHeader'
import Link from 'next/link'

export default function Proposals() {
  return (
    <>
      <AppHeader />
      <main className="max-w-5xl mx-auto px-5 pt-28 space-y-8">
        <h1 className="title text-center">治理提案中心</h1>
        <p className="text-center text-white/70">瀏覽與提交社群提案，所有投票將鏈上簽章記錄。</p>
        <div className="grid gap-4">
          <div className="card text-left">
            <h2 className="text-yellow-300 font-semibold">#1 公益專案資金配置</h2>
            <p className="text-white/70 text-sm mb-3">提案人：0xChris.SKR · 狀態：進行中</p>
            <Link href="/vote/1" className="btn-gold">前往投票</Link>
          </div>
        </div>
      </main>
    </>
  )
}
