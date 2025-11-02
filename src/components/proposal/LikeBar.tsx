'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { useI18n } from '@/lib/i18n';

interface LikeBarProps {
  proposalId: string;
  initialLiked: boolean;
  initialCount: number;
}

export default function LikeBar({ proposalId, initialLiked, initialCount }: LikeBarProps) {
  const { isConnected, address } = useAccount();
  const { t } = useI18n(); // ✅ 不再解構 dictionary

  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [submitting, setSubmitting] = useState(false);

  async function handleToggleLike() {
    if (!isConnected || !address) {
      toast.error(t('proposalLikes.needWallet', '請先連接錢包'));
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    const optimisticLiked = !liked;
    setLiked(optimisticLiked);
    setCount((prev) => prev + (optimisticLiked ? 1 : -1));

    try {
      // TODO: 換成實際 API
      await new Promise((r) => setTimeout(r, 600));
      toast.success(t('proposalLikes.toggleSuccess', '操作成功'));
    } catch (e) {
      toast.error(t('proposalLikes.toggleError', '操作失敗，請稍後再試'));
      // rollback
      setLiked(!optimisticLiked);
      setCount((prev) => prev - (optimisticLiked ? 1 : -1));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex items-center gap-3 mt-3">
      <button
        onClick={handleToggleLike}
        disabled={submitting}
        className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
          liked
            ? 'bg-pink-600 text-white border-pink-500 hover:bg-pink-700'
            : 'bg-transparent text-white/70 border-white/40 hover:text-white hover:border-white/60'
        }`}
      >
        ❤️ {liked ? t('proposalLikes.liked', '已按讚') : t('proposalLikes.like', '按讚')}
      </button>
      <span className="text-white/60 text-sm">{count}</span>
    </div>
  );
}
