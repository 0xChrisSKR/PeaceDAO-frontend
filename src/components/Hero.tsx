export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-[#0a0a0a] to-[#151515] p-6 md:p-10">
      <div
        className="pointer-events-none absolute inset-0 animate-hero-glow opacity-30"
        style={{ background: 'radial-gradient(60% 60% at 10% 10%, #F3BA2F33 0%, transparent 60%), radial-gradient(55% 55% at 90% 20%, #ffffff22 0%, transparent 60%)' }}
      />
      <div className="flex items-center gap-3 text-2xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">WorldPeace DAO</span>
        <span className="text-white/50 text-base md:text-xl">• BSC Only</span>
      </div>
      <p className="mt-3 max-w-2xl text-white/70">
        建立以代幣驗證為核心的社群治理與捐助平台。<b className="text-yellow-300">所有收款/捐款僅接受 BNB（BSC）</b>。
        後續擴展至鏈上 DEX 與跨鏈結算，並回饋治理費。
      </p>
    </div>
  );
}
