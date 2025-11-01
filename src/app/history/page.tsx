import TopNav from "@/components/TopNav";
import { Table } from "@/components/Table";

export const dynamic = "force-static";

export default function Page() {
  const header = ["Time", "Type", "Pair/Asset", "Amount", "Price", "Status"];
  const rows = [
    ["2025-11-01 18:20", "Trade", "BTC/USDT", "0.05 BTC", "$67,400", "Filled"],
    ["2025-11-01 17:55", "Deposit", "USDT", "5,000", "-", "Completed"],
    ["2025-11-01 16:10", "Withdraw", "SOL", "120", "-", "Completed"],
  ];
  return (
    <main className="min-h-screen text-white">
      <TopNav />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold">History</h1>
        <Table header={header} rows={rows} />
      </div>
    </main>
  );
}
