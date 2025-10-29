import Image from "next/image";
import Link from "next/link";

export default function HomeZh() {
  return (
    <main className="relative min-h-screen text-center text-white">
      <Image
        src="/assets/images/ui/home-bg.png"
        alt="World Peace DAO Background"
        fill
        className="object-cover -z-10"
      />
      <section className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">🌍 世界和平 DAO</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          去中心化的慈善捐贈平台，讓每一筆善意都可追蹤、可驗證。
        </p>
        <div className="flex gap-4">
          <Link href="/zh/proposal" className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600">
            發起提案
          </Link>
          <Link href="/zh/treasury" className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600">
            查看金庫
          </Link>
        </div>
      </section>
    </main>
  );
}
