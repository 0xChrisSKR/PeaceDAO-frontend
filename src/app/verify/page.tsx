import AppHeader from '@/components/AppHeader'

export default function Verify() {
  return (
    <>
      <AppHeader />
      <main className="max-w-3xl mx-auto px-5 pt-28 space-y-6 text-center">
        <h1 className="title">社群驗證</h1>
        <p className="text-white/70">
          連接錢包後自動檢查是否為治理代幣持有者，達標者可進入投票與提案。
        </p>
        <button className="btn-gold">連接錢包驗證</button>
      </main>
    </>
  )
}
