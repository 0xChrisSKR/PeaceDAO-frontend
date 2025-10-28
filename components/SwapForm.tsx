import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import styles from '@/styles/Home.module.css';
import { useEthereum } from '@/contexts/EthereumContext';
import { ERC20_ABI, ROUTER_ABI, createContract, env, getReadProvider } from '@/lib/contracts';

interface TokenInfo {
  symbol: string;
  decimals: number;
}

const defaultTokenInfo: TokenInfo = {
  symbol: 'TOKEN',
  decimals: 18
};

const SwapForm: React.FC = () => {
  const { provider, signer, account, connect } = useEthereum();
  const [fromToken, setFromToken] = useState(env.TOKEN);
  const [toToken, setToToken] = useState('');
  const [amountIn, setAmountIn] = useState('');
  const [quote, setQuote] = useState<string | null>(null);
  const [minAmountOut, setMinAmountOut] = useState('');
  const [minOutEdited, setMinOutEdited] = useState(false);
  const [slippage, setSlippage] = useState('1');
  const [feeOut, setFeeOut] = useState('0');
  const [feeRecipient, setFeeRecipient] = useState(env.FUND ?? '');
  const [deadlineMinutes, setDeadlineMinutes] = useState('20');
  const [status, setStatus] = useState<string | null>(null);
  const [allowance, setAllowance] = useState('0');
  const [fromTokenInfo, setFromTokenInfo] = useState<TokenInfo>(defaultTokenInfo);
  const [toTokenInfo, setToTokenInfo] = useState<TokenInfo>(defaultTokenInfo);
  const [isApproving, setIsApproving] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const readProvider = useMemo(() => {
    try {
      return getReadProvider();
    } catch {
      return null;
    }
  }, []);

  const baseReadProvider = provider ?? readProvider;

  const loadTokenInfo = useCallback(
    async (tokenAddress: string, setter: (info: TokenInfo) => void) => {
      if (!tokenAddress || !baseReadProvider) {
        setter(defaultTokenInfo);
        return;
      }
      try {
        const token = createContract<ethers.Contract>(tokenAddress, ERC20_ABI, baseReadProvider);
        const [symbol, decimals] = await Promise.all([
          token.symbol().catch(() => 'TOKEN'),
          token.decimals().catch(() => 18)
        ]);
        setter({ symbol, decimals });
      } catch {
        setter(defaultTokenInfo);
      }
    },
    [baseReadProvider]
  );

  useEffect(() => {
    loadTokenInfo(fromToken, setFromTokenInfo).catch(() => setFromTokenInfo(defaultTokenInfo));
  }, [fromToken, loadTokenInfo]);

  useEffect(() => {
    if (!toToken) {
      setToTokenInfo(defaultTokenInfo);
      return;
    }
    loadTokenInfo(toToken, setToTokenInfo).catch(() => setToTokenInfo(defaultTokenInfo));
  }, [toToken, loadTokenInfo]);

  useEffect(() => {
    if (!fromToken || !account || !env.ROUTER || !baseReadProvider) {
      setAllowance('0');
      return;
    }
    const fetchAllowance = async () => {
      try {
        const token = createContract<ethers.Contract>(fromToken, ERC20_ABI, baseReadProvider);
        const value: ethers.BigNumber = await token.allowance(account, env.ROUTER);
        setAllowance(ethers.utils.formatUnits(value, fromTokenInfo.decimals));
      } catch {
        setAllowance('0');
      }
    };
    fetchAllowance().catch(() => setAllowance('0'));
  }, [account, baseReadProvider, fromToken, fromTokenInfo.decimals]);

  useEffect(() => {
    if (!env.ROUTER || !fromToken || !toToken || !amountIn || !baseReadProvider) {
      setQuote(null);
      return;
    }
    const fetchQuote = async () => {
      try {
        const router = createContract<ethers.Contract>(env.ROUTER, ROUTER_ABI, baseReadProvider);
        const parsedAmount = ethers.utils.parseUnits(amountIn, fromTokenInfo.decimals);
        const amounts: ethers.BigNumber[] = await router.getAmountsOut(parsedAmount, [fromToken, toToken]);
        const output = amounts[amounts.length - 1];
        const formatted = ethers.utils.formatUnits(output, toTokenInfo.decimals);
        setQuote(formatted);
      } catch (err) {
        console.warn('Quote error', err);
        setQuote(null);
      }
    };
    fetchQuote().catch(() => setQuote(null));
  }, [amountIn, baseReadProvider, fromToken, fromTokenInfo.decimals, toToken, toTokenInfo.decimals]);

  useEffect(() => {
    if (!quote || minOutEdited) return;
    const slipValue = Number.parseFloat(slippage);
    const tolerance = Number.isFinite(slipValue) ? Math.max(0, 1 - slipValue / 100) : 0.99;
    const quoteValue = Number.parseFloat(quote);
    const computed = quoteValue * tolerance;
    if (Number.isFinite(computed)) {
      const decimals = Math.min(6, toTokenInfo.decimals);
      setMinAmountOut(computed.toFixed(decimals));
    }
  }, [quote, slippage, minOutEdited, toTokenInfo.decimals]);

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

  const refreshAllowance = useCallback(
    async (tokenAddress: string, holder: string, baseSigner: ethers.Signer) => {
      try {
        const token = createContract<ethers.Contract>(tokenAddress, ERC20_ABI, baseSigner);
        const value: ethers.BigNumber = await token.allowance(holder, env.ROUTER);
        setAllowance(ethers.utils.formatUnits(value, fromTokenInfo.decimals));
      } catch {
        setAllowance('0');
      }
    },
    [fromTokenInfo.decimals]
  );

  const handleApprove = async () => {
    if (!env.ROUTER) {
      setStatus('Router address (NEXT_PUBLIC_ROUTER) is not configured.');
      return;
    }
    if (!fromToken || !amountIn) {
      setStatus('Specify the input token and amount.');
      return;
    }
    try {
      setIsApproving(true);
      setStatus('Approving token allowance…');
      if (!account) {
        await connect();
      }
      const activeSigner = await ensureSigner();
      const holder = await activeSigner.getAddress();
      const token = createContract<ethers.Contract>(fromToken, ERC20_ABI, activeSigner);
      const parsedAmount = ethers.utils.parseUnits(amountIn, fromTokenInfo.decimals);
      const tx = await token.approve(env.ROUTER, parsedAmount);
      await tx.wait();
      setStatus('Approval confirmed.');
      await refreshAllowance(fromToken, holder, activeSigner);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Approval failed';
      setStatus(message);
    } finally {
      setIsApproving(false);
    }
  };

  const handleSwap = async (event: FormEvent) => {
    event.preventDefault();
    if (!env.ROUTER) {
      setStatus('Router address (NEXT_PUBLIC_ROUTER) is not configured.');
      return;
    }
    if (!fromToken || !toToken) {
      setStatus('Specify both input and output tokens.');
      return;
    }
    if (!amountIn) {
      setStatus('Enter an amount to swap.');
      return;
    }
    try {
      setIsSwapping(true);
      setStatus('Submitting swap…');
      if (!account) {
        await connect();
      }
      const activeSigner = await ensureSigner();
      const sender = await activeSigner.getAddress();
      const router = createContract<ethers.Contract>(env.ROUTER, ROUTER_ABI, activeSigner);
      const parsedAmountIn = ethers.utils.parseUnits(amountIn, fromTokenInfo.decimals);
      const minOutValue = minAmountOut ? ethers.utils.parseUnits(minAmountOut, toTokenInfo.decimals) : ethers.constants.Zero;
      const feeValue = feeOut ? ethers.utils.parseUnits(feeOut, toTokenInfo.decimals) : ethers.constants.Zero;
      const recipient = feeRecipient || sender;
      const deadlineSeconds = Math.floor(Date.now() / 1000) + Number(deadlineMinutes || '20') * 60;
      const tx = await router.swapExactTokensForTokensWithFee(
        parsedAmountIn,
        minOutValue,
        [fromToken, toToken],
        sender,
        deadlineSeconds,
        feeValue,
        recipient
      );
      await tx.wait();
      setStatus('Swap executed successfully.');
      setAmountIn('');
      setQuote(null);
      setMinAmountOut('');
      setMinOutEdited(false);
      await refreshAllowance(fromToken, sender, activeSigner);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Swap failed';
      setStatus(message);
    } finally {
      setIsSwapping(false);
    }
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmountIn(event.target.value);
    setMinOutEdited(false);
  };

  const onMinOutChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinAmountOut(event.target.value);
    setMinOutEdited(true);
  };

  const onSlippageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSlippage(event.target.value);
    setMinOutEdited(false);
  };

  return (
    <form className={styles.formControl} onSubmit={handleSwap}>
      <label htmlFor="from-token">From token address</label>
      <input
        id="from-token"
        className={styles.input}
        value={fromToken}
        onChange={(event) => setFromToken(event.target.value)}
        placeholder="0x..."
      />
      <p className={styles.textMuted}>
        Token: {fromTokenInfo.symbol} • Decimals: {fromTokenInfo.decimals} • Allowance: {allowance}
      </p>
      <label htmlFor="to-token">To token address</label>
      <input
        id="to-token"
        className={styles.input}
        value={toToken}
        onChange={(event) => setToToken(event.target.value)}
        placeholder="0x..."
      />
      <p className={styles.textMuted}>Token: {toTokenInfo.symbol} • Decimals: {toTokenInfo.decimals}</p>
      <label htmlFor="amount-in">Amount in ({fromTokenInfo.symbol})</label>
      <input id="amount-in" className={styles.input} type="number" min="0" step="0.0001" value={amountIn} onChange={onAmountChange} />
      {quote && <p className={styles.textMuted}>Estimated output: {quote} {toTokenInfo.symbol}</p>}
      <label htmlFor="slippage">Slippage tolerance (%)</label>
      <input
        id="slippage"
        className={styles.input}
        type="number"
        min="0"
        step="0.1"
        value={slippage}
        onChange={onSlippageChange}
      />
      <label htmlFor="min-amount-out">Minimum received ({toTokenInfo.symbol})</label>
      <input
        id="min-amount-out"
        className={styles.input}
        type="number"
        min="0"
        step="0.0001"
        value={minAmountOut}
        onChange={onMinOutChange}
      />
      <label htmlFor="fee-out">Fee (output token amount)</label>
      <input
        id="fee-out"
        className={styles.input}
        type="number"
        min="0"
        step="0.0001"
        value={feeOut}
        onChange={(event) => setFeeOut(event.target.value)}
      />
      <label htmlFor="fee-recipient">Fee recipient</label>
      <input
        id="fee-recipient"
        className={styles.input}
        value={feeRecipient}
        onChange={(event) => setFeeRecipient(event.target.value)}
        placeholder="0x..."
      />
      <label htmlFor="deadline">Deadline (minutes)</label>
      <input
        id="deadline"
        className={styles.input}
        type="number"
        min="1"
        step="1"
        value={deadlineMinutes}
        onChange={(event) => setDeadlineMinutes(event.target.value)}
      />
      <div className={styles.inlineActions}>
        <button className={styles.button} type="button" onClick={handleApprove} disabled={isApproving}>
          {isApproving ? 'Approving…' : 'Approve'}
        </button>
        <button className={styles.button} type="submit" disabled={isSwapping}>
          {isSwapping ? 'Swapping…' : 'Swap'}
        </button>
      </div>
      {status && <p className={styles.message}>{status}</p>}
    </form>
  );
};

export default SwapForm;
