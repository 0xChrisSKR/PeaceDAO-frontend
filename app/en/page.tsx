import Image from "next/image";
import Link from "next/link";

export default function HomeEn() {
  return (
    <main className="relative min-h-screen text-center text-white">
      <Image
        src="/assets/images/ui/home-bg.png"
        alt="World Peace DAO Background"
        fill
        className="object-cover -z-10"
      />
      <section className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">🌍 World Peace DAO</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          A decentralized donation platform where every act of kindness is transparent and verifiable.
        </p>
        <div className="flex gap-4">
          <Link href="/en/proposal" className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600">
            Create Proposal
          </Link>
          <Link href="/en/treasury" className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600">
            View Treasury
          </Link>
        </div>
      </section>
    </main>
  );
}
