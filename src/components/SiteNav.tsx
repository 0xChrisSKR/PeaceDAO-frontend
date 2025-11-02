'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '../lib/i18n';

interface NavLink { href: string; key: string; label: string; }

export default function SiteNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const NAV_LINKS: NavLink[] = [
    { href: '/',           key: 'home',       label: t('whitepaper', 'Home') },
    { href: '/donate',     key: 'donate',     label: t('donate', 'Donate') },
    { href: '/treasury',   key: 'treasury',   label: t('treasury', 'Treasury') },
    { href: '/governance', key: 'governance', label: t('governance', 'Governance') },
    { href: '/whitepaper', key: 'whitepaper', label: t('whitepaper', 'Whitepaper') },
  ];

  return (
    <nav className="flex items-center justify-center gap-6 py-5 text-sm font-medium text-white/90" style={{ backdropFilter: 'blur(10px)' }}>
      {NAV_LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link key={link.key} href={link.href}
            className={`transition-all ${active ? 'text-white border-b-2 border-[#00bfa5]' : 'text-white/60 hover:text-white'}`}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
