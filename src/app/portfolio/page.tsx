import TopNav from "@/components/TopNav";
import { Table } from "@/components/Table";

export const dynamic = "force-static";

export default function Page() {
  const header = ["Asset", "Balance", "Value (USDT)", "P/L"];
  const rows = [
    ["USDT", "12,000.00", "$12,000.00", "+$0.00"],
    ["BTC", "0.85", "$57,307.00", "+$1,204.12"],
    ["ETH", "16.2", "$52,554.00", "-$420.11"],
  ];
  return (
    <main className="min-h-screen text-white">
      <TopNav />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold">Portfolio</h1>
        <Table header={header} rows={rows} />
      </div>
    </main>
  );
}
