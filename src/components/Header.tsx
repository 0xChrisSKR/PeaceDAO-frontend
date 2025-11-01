import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold">
          <span className="text-yellow-300">WorldPeace</span> <span className="text-white">DAO</span>
        </Link>
        <nav className="flex gap-5 text-sm">
          <Link href="/swap" className="text-white/80 hover:text-white">Swap</Link>
          <Link href="/whitepaper" className="text-white/80 hover:text-white">Docs/白皮書</Link>
          <Link href="/peace" className="text-white/80 hover:text-white">治理等級</Link>
        </nav>
      </div>
    </header>
  );
}
