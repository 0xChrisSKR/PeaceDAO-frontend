'use client';
import { useI18n } from '../lib/i18n';

export default function SiteFooter() {
  const { t, lang, toggle } = useI18n();

  return (
    <footer className="mt-16 border-t border-white/20 bg-white/5 text-center py-6 text-sm text-white/80 backdrop-blur">
      <div className="mb-2">🌍 {t('footerMsg', 'Built with ❤️ for global peace and transparency.')}</div>
      <button
        onClick={toggle}
        className="border border-white/30 rounded px-2.5 py-1 text-xs text-white hover:bg-white/10"
      >
        {lang === 'zh' ? '切換至 English' : 'Switch to 中文'}
      </button>
      <div className="mt-3 opacity-70">© {new Date().getFullYear()} PeaceDAO — All rights reserved.</div>
    </footer>
  );
}
