import Address from '@/components/address';
import { DONATION_ADDRESS } from '@/lib/contracts';

export const revalidate = false;

export default function DonatePage() {
  return (
    <>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Donate</h1>
      <Address label="Donation Address" value={DONATION_ADDRESS} />
      <p className="small" style={{marginTop: 12}}>
        Set <code>NEXT_PUBLIC_DONATION_ADDRESS</code> in Vercel → Project → Settings → Environment Variables.
      </p>
    </>
  );
}
