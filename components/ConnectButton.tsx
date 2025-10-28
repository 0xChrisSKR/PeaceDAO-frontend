import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { useEthereum } from '@/contexts/EthereumContext';
import { shortenAddress } from '@/utils/format';
import styles from '@/styles/Home.module.css';
import { ERC20_ABI, env, createContract, getReadProvider } from '@/lib/contracts';

type MembershipState = 'unknown' | 'member' | 'not-member';

const ConnectButton: React.FC = () => {
  const { account, connect, isConnecting, error, provider } = useEthereum();
  const [membership, setMembership] = useState<MembershipState>('unknown');
  const [gateSymbol, setGateSymbol] = useState<string>('GATE');
  const [status, setStatus] = useState<string | null>(null);

  const readProvider = useMemo(() => {
    try {
      return getReadProvider();
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const evaluateMembership = async () => {
      if (!env.GATE || !account) {
        setMembership('unknown');
        return;
      }
      try {
        const baseProvider = provider ?? readProvider;
        if (!baseProvider) {
          setMembership('unknown');
          return;
        }
        const contract = createContract<ethers.Contract>(env.GATE, ERC20_ABI, baseProvider);
        const [balance, symbol] = await Promise.all([
          contract.balanceOf(account),
          contract.symbol().catch(() => 'GATE')
        ]);
        if (!cancelled) {
          setGateSymbol(symbol);
          setMembership(balance.gt(0) ? 'member' : 'not-member');
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to read membership';
          setStatus(message);
          setMembership('unknown');
        }
      }
    };

    evaluateMembership();

    return () => {
      cancelled = true;
    };
  }, [account, provider, readProvider]);

  const handleConnect = async () => {
    setStatus(null);
    if (account) {
      setStatus('Wallet already connected.');
      return;
    }
    try {
      await connect();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect wallet';
      setStatus(message);
    }
  };

  return (
    <div>
      <button className={styles.button} type="button" onClick={handleConnect} disabled={isConnecting}>
        {account ? `Connected: ${shortenAddress(account)}` : isConnecting ? 'Connecting…' : 'Connect Wallet'}
      </button>
      {account && (
        <p className={styles.message}>
          Membership: <strong>{membership === 'member' ? 'Verified' : membership === 'not-member' ? 'Not holding' : 'Unknown'}</strong>
          {gateSymbol ? ` (${gateSymbol})` : ''}
        </p>
      )}
      {status && <p className={`${styles.message} ${status.includes('connected') ? styles.success : styles.error}`}>{status}</p>}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
    </div>
  );
};

export default ConnectButton;
