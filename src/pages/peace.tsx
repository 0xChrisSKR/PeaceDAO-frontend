import dynamic from "next/dynamic";
const DonateCard = dynamic(() => import("../components/DonateCard"), { ssr: false });

export default function PeacePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>PeaceDAO</h1>
      <p>這是 demo 頁面：實際按鈕會連到鏈上捐款位。</p>
      <DonateCard />
    </main>
  );
}
