'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import SiteNav from '../SiteNav';
import WalletControls from '../WalletControls';
import { ensureWeb3Modal } from '../../lib/w3m';

export default function Nav() {
  const { isConnected } = useAccount();

  useEffect(() => { ensureWeb3Modal(); }, []);

  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="World Peace" width={28} height={28} />
          <span className="text-white/90 font-semibold">世界和平</span>
        </Link>
        <div className="hidden md:block"><SiteNav /></div>
        <div className="flex items-center gap-3"><WalletControls /></div>
      </div>
      <div className="md:hidden px-4"><SiteNav /></div>
    </header>
  );
}
