'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { toast } from 'react-hot-toast';
import { useI18n } from '../lib/i18n';

export default function WalletControls() {
  const { address, isConnecting, isConnected } = useAccount();
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  async function handleConnect() {
    try {
      const connector = connectors[0];
      await connectAsync({ connector });
      toast.success(t('connected', 'Connected'));
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(t('error', 'Failed to connect'));
    }
  }

  async function handleDisconnect() {
    try {
      await disconnectAsync();
      toast.success(t('disconnect', 'Disconnected'));
    } catch (err: any) {
      console.error(err);
      toast.error(t('error', 'Failed to disconnect'));
    }
  }

  return (
    <div className="flex items-center gap-3 text-white">
      {isConnected ? (
        <>
          <button onClick={handleDisconnect} className="rounded-md bg-red-600 px-3 py-1.5 text-sm hover:bg-red-700 transition-all">
            {t('disconnect', 'Disconnect')}
          </button>
          <span className="text-xs opacity-75">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting || isPending}
          className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm hover:bg-emerald-700 transition-all disabled:opacity-50"
        >
          {isConnecting ? t('connecting', 'Connecting...') : t('connect', 'Connect Wallet')}
        </button>
      )}
    </div>
  );
}
