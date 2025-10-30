export default function Home() {
  return (
    <>
      <h1 style={{fontSize: 40, fontWeight: 800, marginBottom: 8}}>World Peace DAO</h1>
      <p style={{opacity: .9}}>Site is live. Use the top navigation to explore pages.</p>
      <ul style={{marginTop: 16, lineHeight: 1.9}}>
        <li>Start on <b>Dashboard</b> (/home)</li>
        <li>View <b>Treasury</b> placeholders and link to config (/treasury)</li>
        <li>Explore <b>Governance</b> placeholders (/governance)</li>
        <li>Make a <b>Donate</b> test (/donate)</li>
      </ul>
    </>
  );
}
