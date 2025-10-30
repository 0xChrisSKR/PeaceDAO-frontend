/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center space-x-2">
          {/* 先用 PNG，未來也可補一份 /assets/logo.svg 當備援 */}
          <img
            src="/assets/logo.png"
            alt="World Peace DAO Logo"
            width={40}
            height={40}
            className="rounded-full shadow-sm"
          />
          <span className="text-lg font-bold text-slate-900">World Peace DAO</span>
        </Link>
      </div>
    </header>
  );
}
