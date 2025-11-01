'use client';
export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-[#0a0a0a] to-[#151515] p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0 animate-[glow_6s_ease-in-out_infinite] opacity-30"
           style={{ background: 'radial-gradient(60% 60% at 10% 10%, #F3BA2F33 0%, transparent 60%), radial-gradient(55% 55% at 90% 20%, #ffffff22 0%, transparent 60%)' }} />
      <div className="flex items-center gap-3 text-2xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">WorldPeace DAO</span>
        <span className="text-white/40">×</span>
        <img src="/brands/binance.svg" alt="binance" className="h-6 md:h-8 opacity-90" />
        <span className="text-white/40">+</span>
        <img src="/brands/okx.svg" alt="okx" className="h-6 md:h-8 opacity-90" />
      </div>
      <p className="mt-3 max-w-2xl text-white/70">
        建立以代幣驗證為核心的社群治理：連結錢包、自動分級、解鎖聊天室與提案權限。未來擴展至鏈上 DEX 與跨鏈結算。
      </p>
      <style jsx>{`
        @keyframes glow {
          0%,100% { filter: blur(40px); transform: translateY(0px); }
          50% { filter: blur(60px); transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
