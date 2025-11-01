'use client';

import { useI18n } from '../lib/i18n';

export default function SiteFooter() {
  const { t, lang, toggle } = useI18n();

  return (
    <footer
      className="mt-16 border-t border-white/50 bg-white/10 text-center py-6 text-sm text-white/80 backdrop-blur"
      style={{ lineHeight: 1.6 }}
    >
      <div className="mb-2">
        🌍 {t('footerMsg', 'Built with ❤️ for global peace and transparency.')}
      </div>
      <div>
        <button
          onClick={toggle}
          style={{
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'transparent',
            color: '#fff',
            borderRadius: 6,
            padding: '4px 10px',
            cursor: 'pointer',
            fontSize: 12
          }}
        >
          {lang === 'zh' ? '切換至 English' : 'Switch to 中文'}
        </button>
      </div>
      <div className="mt-3 opacity-70">
        © {new Date().getFullYear()} PeaceDAO — All rights reserved.
      </div>
    </footer>
  );
}
