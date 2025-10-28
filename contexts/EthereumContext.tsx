import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';

interface EthereumContextValue {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  account: string | null;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
}

const EthereumContext = createContext<EthereumContextValue | undefined>(undefined);

export const EthereumProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ethereum = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return (window as any).ethereum ?? null;
  }, []);

  const initializeProvider = useCallback(async () => {
    if (!ethereum) {
      setError('No Ethereum wallet detected. Install MetaMask.');
      return null;
    }
    const web3Provider = new ethers.providers.Web3Provider(ethereum, 'any');
    setProvider(web3Provider);
    return web3Provider;
  }, [ethereum]);

  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);
      const web3Provider = (await initializeProvider()) ?? undefined;
      if (!web3Provider) {
        throw new Error('Unable to connect to wallet');
      }
      await web3Provider.send('eth_requestAccounts', []);
      const nextSigner = web3Provider.getSigner();
      const address = await nextSigner.getAddress();
      setSigner(nextSigner);
      setAccount(address);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown wallet error';
      setError(message);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, [initializeProvider]);

  useEffect(() => {
    if (!ethereum) return;
    const web3Provider = new ethers.providers.Web3Provider(ethereum, 'any');
    setProvider(web3Provider);
    web3Provider
      .listAccounts()
      .then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setSigner(web3Provider.getSigner());
        }
      })
      .catch(() => undefined);

    const handleAccountsChanged = (accounts: string[]) => {
      setAccount(accounts[0] ?? null);
      if (accounts[0]) {
        setSigner(web3Provider.getSigner());
      } else {
        setSigner(null);
      }
    };

    const handleDisconnect = () => {
      setAccount(null);
      setSigner(null);
    };

    ethereum.on?.('accountsChanged', handleAccountsChanged);
    ethereum.on?.('disconnect', handleDisconnect);

    return () => {
      ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
      ethereum.removeListener?.('disconnect', handleDisconnect);
    };
  }, [ethereum]);

  const value = useMemo(
    () => ({ provider, signer, account, connect, isConnecting, error }),
    [provider, signer, account, connect, isConnecting, error]
  );

  return <EthereumContext.Provider value={value}>{children}</EthereumContext.Provider>;
};

export const useEthereum = () => {
  const context = useContext(EthereumContext);
  if (!context) {
    throw new Error('useEthereum must be used within an EthereumProvider');
  }
  return context;
};
