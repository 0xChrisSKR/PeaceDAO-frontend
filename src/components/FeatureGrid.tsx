import Link from 'next/link';
export default function FeatureGrid() {
  const items = [
    { title: 'Swap', desc: '即將上線：BSC 路由聚合 + 治理費回饋', href: '/swap' },
    { title: 'Docs/白皮書', desc: '只收 BNB、手續費與治理規則', href: '/whitepaper' },
    { title: '治理等級', desc: '連錢包後自動計算階級與權限', href: '/peace' }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {items.map((it) => (
        <Link key={it.title} href={it.href} className="group rounded-xl border border-white/10 bg-white/5 p-5 hover:border-emerald-400/40">
          <div className="text-lg font-semibold">{it.title}</div>
          <div className="mt-1 text-white/70">{it.desc}</div>
          <div className="mt-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition">進入 →</div>
        </Link>
      ))}
    </div>
  );
}
