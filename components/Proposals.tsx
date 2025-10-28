import { useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import styles from '@/styles/Home.module.css';
import { DAO_ABI, createContract, env, getReadProvider } from '@/lib/contracts';
import { useEthereum } from '@/contexts/EthereumContext';
import { shortenAddress } from '@/utils/format';

interface Proposal {
  id: number;
  title: string;
  description: string;
  proposer: string;
  amount: string;
  recipient: string;
  deadline: number;
  forVotes: string;
  againstVotes: string;
  executed: boolean;
}

const useNormalizeProposal = () => {
  return useCallback((raw: any, index: number): Proposal => {
    const value = (key: string, fallbackIndex: number) => {
      if (raw && typeof raw === 'object') {
        if (raw[key] !== undefined) return raw[key];
        if (raw[fallbackIndex] !== undefined) return raw[fallbackIndex];
      }
      return undefined;
    };

    const id = value('id', 0);
    const title = value('title', 1) ?? '';
    const description = value('description', 2) ?? '';
    const proposer = value('proposer', 3) ?? ethers.constants.AddressZero;
    const amount = value('amount', 4) ?? ethers.constants.Zero;
    const recipient = value('recipient', 5) ?? ethers.constants.AddressZero;
    const deadline = value('deadline', 6) ?? ethers.constants.Zero;
    const forVotes = value('forVotes', 7) ?? ethers.constants.Zero;
    const againstVotes = value('againstVotes', 8) ?? ethers.constants.Zero;
    const executed = value('executed', 9) ?? false;

    const toNumber = (input: any, fallback: number) => {
      if (ethers.BigNumber.isBigNumber(input)) return input.toNumber();
      if (typeof input === 'number') return input;
      if (typeof input === 'string') return Number(input);
      return fallback;
    };

    const toStringValue = (input: any) => {
      if (ethers.BigNumber.isBigNumber(input)) return ethers.utils.formatEther(input);
      if (typeof input === 'string') return input;
      if (typeof input === 'number') return input.toString();
      return '0';
    };

    return {
      id: toNumber(id, index),
      title,
      description,
      proposer,
      amount: toStringValue(amount),
      recipient,
      deadline: toNumber(deadline, 0),
      forVotes: toStringValue(forVotes),
      againstVotes: toStringValue(againstVotes),
      executed: Boolean(executed)
    };
  }, []);
};

const Proposals: React.FC = () => {
  const { provider, signer, account, connect } = useEthereum();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const readProvider = useMemo(() => {
    try {
      return getReadProvider();
    } catch {
      return null;
    }
  }, []);

  const normalizeProposal = useNormalizeProposal();

  const fetchProposals = useCallback(async () => {
    if (!env.DAO) {
      setError('DAO contract address (NEXT_PUBLIC_DAO) is not configured.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const baseProvider = provider ?? readProvider;
      if (!baseProvider) {
        throw new Error('No provider available. Configure NEXT_PUBLIC_RPC or connect a wallet.');
      }
      const dao = createContract<ethers.Contract>(env.DAO, DAO_ABI, baseProvider);
      const count: ethers.BigNumber = await dao.proposalCount();
      const total = count.toNumber();
      const ids = Array.from({ length: total }, (_, i) => i);
      const entries = await Promise.all(ids.map((id) => dao.proposals(id)));
      const normalized = entries.map((entry, index) => normalizeProposal(entry, index));
      setProposals(normalized.reverse());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load proposals';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [normalizeProposal, provider, readProvider]);

  useEffect(() => {
    fetchProposals().catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, [fetchProposals]);

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

  const handleVote = useCallback(
    async (proposalId: number, support: boolean) => {
      if (!env.DAO) {
        setActionMessage('DAO contract address (NEXT_PUBLIC_DAO) is not configured.');
        return;
      }
      try {
        setActionMessage('Submitting vote…');
        if (!account) {
          await connect();
        }
        const activeSigner = await ensureSigner();
        const dao = createContract<ethers.Contract>(env.DAO, DAO_ABI, activeSigner);
        const tx = await dao.vote(proposalId, support);
        await tx.wait();
        setActionMessage('Vote submitted successfully.');
        await fetchProposals();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to submit vote';
        setActionMessage(message);
      }
    },
    [account, connect, ensureSigner, fetchProposals]
  );

  return (
    <div>
      <div className={styles.inlineActions}>
        <button className={styles.button} type="button" onClick={() => fetchProposals()} disabled={loading}>
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {actionMessage && <p className={styles.message}>{actionMessage}</p>}
      <div className={styles.proposals}>
        {proposals.length === 0 && !loading && <p className={styles.textMuted}>No proposals found.</p>}
        {proposals.map((proposal) => (
          <article key={proposal.id} className={styles.proposalCard}>
            <header className={styles.proposalHeader}>
              <h3>{proposal.title || `Proposal #${proposal.id}`}</h3>
              <span className={styles.badge}>{proposal.executed ? 'Executed' : 'Active'}</span>
            </header>
            <p>{proposal.description}</p>
            <p className={styles.textMuted}>Recipient: {shortenAddress(proposal.recipient)}</p>
            <p className={styles.textMuted}>Requested: {proposal.amount} BNB</p>
            <p className={styles.textMuted}>Proposer: {shortenAddress(proposal.proposer)}</p>
            <p className={styles.textMuted}>
              Deadline: {proposal.deadline ? new Date(proposal.deadline * 1000).toLocaleString() : 'N/A'}
            </p>
            <div className={styles.cardFooter}>
              <span className={styles.textMuted}>
                ✅ {proposal.forVotes} / ❌ {proposal.againstVotes}
              </span>
              <div className={styles.inlineActions}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => handleVote(proposal.id, true)}
                  disabled={proposal.executed}
                >
                  Vote For
                </button>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => handleVote(proposal.id, false)}
                  disabled={proposal.executed}
                >
                  Vote Against
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Proposals;
