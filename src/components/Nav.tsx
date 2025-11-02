'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import WalletControls from '@/components/WalletControls';
import { useEffect, useState } from 'react';

interface NavProps {
  active?: string;
}

export default function Nav({ active }: NavProps) {
  const rawPathname = usePathname();
  const pathname = rawPathname ?? '/'; // ✅ 防呆：絕不為 null
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: t('nav.home', 'Home'), key: 'home' },
    { href: '/donate', label: t('nav.donate', 'Donate'), key: 'donate' },
    { href: '/treasury', label: t('nav.treasury', 'Treasury'), key: 'treasury' },
    { href: '/whitepaper', label: t('nav.whitepaper', 'Whitepaper'), key: 'whitepaper' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PeaceDAO" width={36} height={36} priority />
          <span className="text-white font-semibold text-lg">PeaceDAO</span>
        </Link>

        <div className="hidden md:flex gap-8">
          {links.map((link) => {
            const isActive =
              active === link.key ||
              pathname === link.href ||
              pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <WalletControls />
        </div>
      </div>
    </nav>
  );
}
