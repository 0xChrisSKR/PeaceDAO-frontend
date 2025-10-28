import { FormEvent, useCallback, useState } from 'react';
import { ethers } from 'ethers';
import styles from '@/styles/Home.module.css';
import { useEthereum } from '@/contexts/EthereumContext';
import { env } from '@/lib/contracts';

const DonateBNB: React.FC = () => {
  const { signer, provider, account, connect, isConnecting } = useEthereum();
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const getSigner = useCallback(async () => {
    if (signer) return signer;
    if (provider) return provider.getSigner();
    if ((window as any)?.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');
      await web3Provider.send('eth_requestAccounts', []);
      return web3Provider.getSigner();
    }
    throw new Error('Wallet provider unavailable');
  }, [provider, signer]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus(null);
    setTxHash(null);

    if (!env.FUND) {
      setStatus('Treasury address (NEXT_PUBLIC_FUND) is not configured.');
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setStatus('Enter a positive donation amount.');
      return;
    }

    try {
      if (!account) {
        await connect();
      }
      const activeSigner = await getSigner();
      const value = ethers.utils.parseEther(amount);
      const tx = await activeSigner.sendTransaction({
        to: env.FUND,
        value
      });
      setTxHash(tx.hash);
      setStatus('Donation submitted. Awaiting confirmation…');
      await tx.wait();
      setStatus('Donation confirmed. Thank you for supporting PeaceDAO!');
      setAmount('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process donation';
      setStatus(message);
    }
  };

  return (
    <form className={styles.formControl} onSubmit={handleSubmit}>
      <label htmlFor="donation-amount">Amount (BNB)</label>
      <input
        id="donation-amount"
        className={styles.input}
        type="number"
        min="0"
        step="0.0001"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="0.5"
      />
      <button className={styles.button} type="submit" disabled={isConnecting}>
        {isConnecting ? 'Connecting…' : 'Donate'}
      </button>
      {status && <p className={`${styles.message} ${status.includes('confirmed') ? styles.success : styles.error}`}>{status}</p>}
      {txHash && (
        <p className={styles.textMuted}>
          Transaction hash:{' '}
          <a href={`https://bscscan.com/tx/${txHash}`} target="_blank" rel="noreferrer">
            {txHash}
          </a>
        </p>
      )}
    </form>
  );
};

export default DonateBNB;
