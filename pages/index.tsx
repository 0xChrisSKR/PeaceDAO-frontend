import Head from 'next/head';
import ConnectButton from '@/components/ConnectButton';
import DonateBNB from '@/components/DonateBNB';
import CreateProposal from '@/components/CreateProposal';
import Proposals from '@/components/Proposals';
import SwapForm from '@/components/SwapForm';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PeaceDAO Portal</title>
        <meta name="description" content="PeaceDAO community portal" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>PeaceDAO Portal</h1>
        <p className={styles.description}>
          Manage your membership, donate to the treasury, participate in governance, and trade DAO tokens.
        </p>
        <section className={styles.section}>
          <h2>Wallet</h2>
          <ConnectButton />
        </section>
        <section className={styles.section}>
          <h2>Donate BNB</h2>
          <DonateBNB />
        </section>
        <section className={styles.section}>
          <h2>Create Proposal</h2>
          <CreateProposal />
        </section>
        <section className={styles.section}>
          <h2>Active Proposals</h2>
          <Proposals />
        </section>
        <section className={styles.section}>
          <h2>Token Swap</h2>
          <SwapForm />
        </section>
      </main>
    </div>
  );
}
