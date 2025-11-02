'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import SiteNav from '../SiteNav';            // ← 這個檔在上一層 components
import WalletControls from '../WalletControls'; // ← 同上
import { ensureWeb3Modal } from '../../lib/w3m'; // ← 修正相對路徑（兩層回到 lib）

export default function Nav() {
  const { isConnected } = useAccount();

  useEffect(() => {
    // 在 client 端初始化 web3modal（若已初始化則 no-op）
    ensureWeb3Modal();
  }, []);

  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="World Peace" width={28} height={28} />
          <span className="text-white/90 font-semibold">世界和平</span>
        </Link>

        <div className="hidden md:block">
          <SiteNav />
        </div>

        <div className="flex items-center gap-3">
          {/* 右側錢包控制 */}
          <WalletControls />
        </div>
      </div>
      {/* 手機版次導航 */}
      <div className="md:hidden px-4">
        <SiteNav />
      </div>
    </header>
  );
}
