import Address from '@/components/address';
import AddressBalance from '@/components/address-balance';
import { TREASURY_ADDRESS, DONATION_ADDRESS } from '@/lib/contracts';

export const revalidate = false;

export default function TreasuryPage() {
  return (
    <>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Treasury</h1>
      <div style={{display:'grid', gap: 12, gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))'}}>
        <Address label="Treasury Address" value={TREASURY_ADDRESS} />
        <Address label="Donation Address" value={DONATION_ADDRESS} />
        <AddressBalance label="Treasury Native Balance" address={TREASURY_ADDRESS} />
        <AddressBalance label="Donation Native Balance" address={DONATION_ADDRESS} />
      </div>
      <p className="small" style={{marginTop:12}}>Configure addresses via Vercel env: <code>NEXT_PUBLIC_TREASURY_ADDRESS</code>, <code>NEXT_PUBLIC_DONATION_ADDRESS</code>.</p>
    </>
  );
}
