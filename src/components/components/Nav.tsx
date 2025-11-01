// src/components/Nav.tsx
'use client';
import { useAccount } from 'wagmi';
import { ensureWeb3Modal } from '../lib/w3m';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav({ active }: { active?: 'whitepaper'|'treasury'|'donate' }) {
  ensureWeb3Modal();
  const { address } = useAccount();
  const short = address ? `${address.slice(0,6)}…${address.slice(-4)}` : 'Connect';

  return (
    <nav className="nav">
      <Link href="/" className="logo">
        <Image src="/logo.svg" alt="logo" width={26} height={26} onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}}/>
        <span>PeaceDAO</span>
      </Link>
      <div className="sp" />
      <div className="tabs">
        <Link href="/" className={!active ? 'active':''}>Home</Link>
        <Link href="/whitepaper" className={active==='whitepaper'?'active':''}>Whitepaper</Link>
        <Link href="/treasury" className={active==='treasury'?'active':''}>Treasury</Link>
        <Link href="/donate" className={active==='donate'?'active':''}>Donate</Link>
      </div>
      <w3m-button balance="hide">{short}</w3m-button>
    </nav>
  );
}
