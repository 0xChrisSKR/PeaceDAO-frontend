import Link from 'next/link'

export default function AppHeader() {
  return (
    <header className="nav">
      <Link href="/" className="font-bold text-yellow-400 text-lg">WorldPeace DAO</Link>
      <nav className="flex gap-4 text-sm text-white/80">
        <Link href="/swap" className="hover:text-yellow-300">Swap</Link>
        <Link href="/proposals" className="hover:text-yellow-300">提案</Link>
        <Link href="/vote" className="hover:text-yellow-300">投票</Link>
        <Link href="/verify" className="hover:text-yellow-300">驗證</Link>
        <Link href="/whitepaper" className="hover:text-yellow-300">Docs</Link>
      </nav>
    </header>
  )
}
