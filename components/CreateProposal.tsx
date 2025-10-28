import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import styles from '@/styles/Home.module.css';
import { useEthereum } from '@/contexts/EthereumContext';
import { DAO_ABI, ERC20_ABI, createContract, env, getReadProvider } from '@/lib/contracts';

const CreateProposal: React.FC = () => {
  const { signer, provider, account, connect } = useEthereum();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState(env.FUND);
  const [status, setStatus] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [gateSymbol, setGateSymbol] = useState<string>('GATE');

  const readProvider = useMemo(() => {
    try {
      return getReadProvider();
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadGateSymbol = async () => {
      if (!env.GATE) return;
      const baseProvider = provider ?? readProvider;
      if (!baseProvider) return;
      try {
        const contract = createContract<ethers.Contract>(env.GATE, ERC20_ABI, baseProvider);
        const symbol = await contract.symbol();
        if (!cancelled) {
          setGateSymbol(symbol);
        }
      } catch {
        // ignore symbol errors
      }
    };
    loadGateSymbol();
    return () => {
      cancelled = true;
    };
  }, [provider, readProvider]);

  const ensureSigner = useCallback(async () => {
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

    if (!env.DAO) {
      setStatus('DAO contract address (NEXT_PUBLIC_DAO) is not configured.');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setStatus('Title and description are required.');
      return;
    }

    if (!recipient) {
      setStatus('Recipient address is required.');
      return;
    }

    try {
      if (!account) {
        await connect();
      }
      const activeSigner = await ensureSigner();
      const proposer = await activeSigner.getAddress();

      if (env.GATE) {
        const gateContract = createContract<ethers.Contract>(env.GATE, ERC20_ABI, activeSigner);
        const balance: ethers.BigNumber = await gateContract.balanceOf(proposer);
        if (balance.isZero()) {
          throw new Error(`A non-zero ${gateSymbol} balance is required to create proposals.`);
        }
      }

      const daoContract = createContract<ethers.Contract>(env.DAO, DAO_ABI, activeSigner);
      const parsedAmount = amount ? ethers.utils.parseEther(amount) : ethers.constants.Zero;
      const tx = await daoContract.createProposal(title, description, parsedAmount, recipient);
      setTxHash(tx.hash);
      setStatus('Proposal submitted. Awaiting confirmation…');
      await tx.wait();
      setStatus('Proposal created successfully.');
      setTitle('');
      setDescription('');
      setAmount('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create proposal';
      setStatus(message);
    }
  };

  return (
    <form className={styles.formControl} onSubmit={handleSubmit}>
      <label htmlFor="proposal-title">Title</label>
      <input
        id="proposal-title"
        className={styles.input}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Fund local peace-building initiative"
      />
      <label htmlFor="proposal-description">Description</label>
      <textarea
        id="proposal-description"
        className={styles.input}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={4}
        placeholder="Explain the proposal goals and requested budget."
      />
      <label htmlFor="proposal-amount">Requested amount (BNB)</label>
      <input
        id="proposal-amount"
        className={styles.input}
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="10"
      />
      <label htmlFor="proposal-recipient">Recipient address</label>
      <input
        id="proposal-recipient"
        className={styles.input}
        value={recipient}
        onChange={(event) => setRecipient(event.target.value)}
        placeholder="0x..."
      />
      <button className={styles.button} type="submit">
        Submit proposal
      </button>
      {status && <p className={`${styles.message} ${status.includes('successfully') ? styles.success : styles.error}`}>{status}</p>}
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

export default CreateProposal;
