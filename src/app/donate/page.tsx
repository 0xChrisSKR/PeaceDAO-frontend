export const revalidate = false;
export default function DonatePage() {
  const addr = process.env.NEXT_PUBLIC_DONATION_ADDRESS || '0x0000000000000000000000000000000000000000';
  return (
    <>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Donate</h1>
      <p>Send on-chain donations to:</p>
      <pre style={{background: '#f7f7f7', padding: 12, borderRadius: 8, marginTop: 8, overflow: 'auto'}}>{addr}</pre>
      <p style={{marginTop: 12, opacity: .8}}>Set <code>NEXT_PUBLIC_DONATION_ADDRESS</code> in Vercel Project → Settings → Environment Variables.</p>
    </>
  );
}
