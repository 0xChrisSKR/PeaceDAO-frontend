'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import WalletControls from '@/components/WalletControls'; // ✅ 修正路徑
import Logo from '@/public/logo.svg'; // ✅ 你的 logo 圖檔
import { useEffect, useState } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: t('nav.home', 'Home') },
    { href: '/donate', label: t('nav.donate', 'Donate') },
    { href: '/treasury', label: t('nav.treasury', 'Treasury') },
    { href: '/whitepaper', label: t('nav.whitepaper', 'Whitepaper') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="PeaceDAO" width={36} height={36} />
          <span className="text-white font-semibold text-lg">PeaceDAO</span>
        </Link>

        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? 'text-white font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <WalletControls /> {/* ✅ 修正錢包連結元件 */}
        </div>
      </div>
    </nav>
  );
}
