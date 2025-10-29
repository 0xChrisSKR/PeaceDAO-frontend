'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const MetaMaskSDKInitializer = dynamic(
  () =>
    import('@metamask/sdk').then(({ default: MetaMaskSDK }) => {
      const MetaMaskComponent = () => {
        useEffect(() => {
          if (typeof window === 'undefined') return;

          const globalWindow = window as typeof window & {
            ethereum?: unknown;
            __META_MASK_SDK__?: {
              terminate?: () => void;
            };
          };

          if (globalWindow.__META_MASK_SDK__ || globalWindow.ethereum) {
            return;
          }

          const sdk = new MetaMaskSDK({
            dappMetadata: {
              name: 'PeaceDAO',
              url: window.location.origin
            },
            checkInstallationImmediately: false
          });

          const provider = sdk.getProvider();
          if (provider && !globalWindow.ethereum) {
            globalWindow.ethereum = provider;
          }

          globalWindow.__META_MASK_SDK__ = sdk;

          return () => {
            globalWindow.__META_MASK_SDK__?.terminate?.();
            delete globalWindow.__META_MASK_SDK__;
          };
        }, []);

        return null;
      };

      return { default: MetaMaskComponent };
    }),
  { ssr: false }
);

export default MetaMaskSDKInitializer;
