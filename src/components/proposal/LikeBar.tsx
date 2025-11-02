'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useI18n } from '../../lib/i18n';

type Props = {
  initialLiked?: boolean;
  initialCount?: number;
  onToggle?: (liked: boolean) => Promise<void> | void;
  className?: string;
};

export default function LikeBar({
  initialLiked = false,
  initialCount = 0,
  onToggle,
  className,
}: Props) {
  const { t } = useI18n();
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [count, setCount] = useState<number>(initialCount);
  const [submitting, setSubmitting] = useState(false);

  async function handleToggle() {
    if (submitting) return;
    setSubmitting(true);

    const next = !liked;

    // optimistic UI
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));

    try {
      if (onToggle) await onToggle(next);
      toast.success(next ? t('proposalLikes.on', 'Liked') : t('proposalLikes.off', 'Unliked'));
    } catch (error) {
      console.error(error);
      // 還原
      setLiked(!next);
      setCount((c) => c + (next ? -1 : 1));
      toast.error(t('proposalLikes.toggleError', 'Failed to update like'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={className}>
      <button
        onClick={handleToggle}
        disabled={submitting}
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-all ${
          liked ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-white/10 text-white hover:bg-white/20'
        } disabled:opacity-60`}
        aria-pressed={liked}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 21s-6.716-4.484-9.428-7.2C.86 12.086.5 10.177 1.37 8.77 2.33 7.215 4.61 6.5 6.2 7.34c1.02.55 1.8 1.54 1.8 1.54s.78-.99 1.8-1.54c1.59-.84 3.87-.126 4.83 1.43.87 1.41.51 3.316-1.2 5.03C18.716 16.516 12 21 12 21z" />
        </svg>
        <span>{count}</span>
      </button>
    </div>
  );
}
