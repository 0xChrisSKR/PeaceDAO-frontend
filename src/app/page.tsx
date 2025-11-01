import Hero from '@/components/Hero'
import ConnectWallet from '@/components/ConnectWallet'
import AddressBalance from '@/components/AddressBalance'
import DonateButton from '@/components/DonateButton'
import FeatureGrid from '@/components/FeatureGrid'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Hero />
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ConnectWallet />
        <div className="flex gap-4">
          <AddressBalance />
          <DonateButton />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">功能</h2>
        <p className="text-white/70">所有收款/捐款僅支援 <b className="text-yellow-300">BNB (BSC)</b>。Swap 將在下一步接 AMM。</p>
      </div>
      <FeatureGrid />
    </main>
  )
}
