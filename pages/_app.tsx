import type { AppProps } from 'next/app';
import { EthereumProvider } from '@/contexts/EthereumContext';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EthereumProvider>
      <Component {...pageProps} />
    </EthereumProvider>
  );
}

export default MyApp;
