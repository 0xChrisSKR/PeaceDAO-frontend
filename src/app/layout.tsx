import Providers from '@/providers/client';
// ... 其他 import

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <Providers>
          {/* 你的 TopBar / Header */}
          {children}
          {/* 你的 TabBar / Footer */}
        </Providers>
      </body>
    </html>
  );
}
