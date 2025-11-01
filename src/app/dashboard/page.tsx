import TopNav from "@/components/TopNav";
import { Metric } from "@/components/Metric";

export const dynamic = "force-static";

export default function Page() {
  const kpis = [
    { label: "Total Users", value: "18,245" },
    { label: "24h Volume", value: "$38,204,112" },
    { label: "Open Interest", value: "$12,480,330" },
    { label: "Treasury", value: "$1,203,500", sub: "WorldPeace Fund (mock)" },
  ];
  return (
    <main className="min-h-screen text-white">
      <TopNav />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <Metric key={k.label} label={k.label} value={k.value} sub={k.sub} />
          ))}
        </div>

        <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-900/50">
          <div className="font-semibold mb-2">Announcements</div>
          <ul className="list-disc pl-5 text-sm text-neutral-300 space-y-1">
            <li>🎉 Launching mock exchange UI. All actions are disabled.</li>
            <li>🔐 Wallet connection placeholder only. No chain calls.</li>
            <li>🗳️ Governance & Donate pages use built-in demo API.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
