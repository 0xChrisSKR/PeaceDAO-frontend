'use client';

import Image from 'next/image';
import ConnectWallet from '@/components/ConnectWallet';

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl bg-zinc-900/60 ring-1 ring-white/10 p-6 md:p-10">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            WorldPeace DAO
          </h1>
          <p className="text-zinc-300">
            建立以代幣驗證為核心的社群治理：連結錢包，自動分級，解鎖聊天室與提案權限。
          </p>
          <div className="flex gap-3">
            <ConnectWallet />
            <a
              href="/docs"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white ring-1 ring-white/10"
            >
              白皮書 / Docs
            </a>
          </div>
        </div>

        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src="/banner-worldpeace.png"
            alt="WorldPeace DAO Banner"
            fill
            className="object-cover rounded-xl shadow-lg"
            priority
          />
        </div>
      </section>
    </main>
  );
}
