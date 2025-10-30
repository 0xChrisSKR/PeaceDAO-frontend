import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-zinc-800 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/assets/logo.png"
            alt="World Peace DAO Logo"
            width={40}
            height={40}
            className="rounded-full shadow"
          />
          <span className="text-lg font-bold text-amber-300">World Peace DAO</span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link href="/" className="text-zinc-200 hover:text-white">Home</Link>
          <Link href="/swap" className="text-zinc-200 hover:text-white">Swap</Link>
          <Link href="/whitepaper" className="text-zinc-200 hover:text-white">Whitepaper</Link>
        </nav>
      </div>
    </header>
  );
}
