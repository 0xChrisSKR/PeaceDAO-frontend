'use client';

import { useState } from 'react';
import type { LikeBarProps } from '@/types/like';

export default function LikeBar({
  proposalId,
  snapshot,
  user,
  onLikeToggle,
  onSubmitVerification,
}: LikeBarProps) {
  const [optimisticLiked, setOptimisticLiked] = useState(user.hasLiked);
  const [submitting, setSubmitting] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [proofUrl, setProofUrl] = useState('');
  const [note, setNote] = useState('');

  const totalLikes = snapshot.totalLikes + (optimisticLiked && !user.hasLiked ? 1 : 0) + (!optimisticLiked && user.hasLiked ? -1 : 0);

  async function handleLike() {
    if (submitting) return;
    setOptimisticLiked((x) => !x);
    try {
      setSubmitting(true);
      await onLikeToggle?.(!optimisticLiked);
    } catch (e) {
      // revert on error
      setOptimisticLiked((x) => !x);
      console.error(e);
      alert('按讚失敗，請稍後再試');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmitVerification() {
    if (!proofUrl) {
      alert('請貼上收據/證明的連結（圖片或文件雲端連結）');
      return;
    }
    try {
      setSubmitting(true);
      await onSubmitVerification?.({ proofUrl, note });
      setShowVerify(false);
      setProofUrl('');
      setNote('');
      alert('已提交驗證，感謝你的協助！');
    } catch (e) {
      console.error(e);
      alert('提交驗證失敗，請稍後再試');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full border rounded-xl p-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition
              ${optimisticLiked ? 'bg-rose-600 text-white border-rose-600' : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'}`}
            onClick={handleLike}
            disabled={submitting}
            aria-pressed={optimisticLiked}
          >
            <span aria-hidden>❤️</span>
            <span>{optimisticLiked ? '已按讚' : '按讚支持'}</span>
          </button>

          <div className="text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">{totalLikes}</span> 個讚 ·{' '}
            <span className="font-semibold">{snapshot.totalBackers}</span> 位贊助者
          </div>
        </div>

        <div className="flex items-center gap-2">
          {snapshot.txHashes?.length ? (
            <a
              href={`https://bscscan.com/tx/${snapshot.txHashes[0]}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs underline text-neutral-600 dark:text-neutral-300"
            >
              查看最新匯款交易
            </a>
          ) : null}

          {user.isVerifier && (
            <button
              className="text-xs px-3 py-2 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800"
              onClick={() => setShowVerify((x) => !x)}
            >
              {showVerify ? '關閉驗證表單' : '提交收尾驗證'}
            </button>
          )}
        </div>
      </div>

      {showVerify && user.isVerifier && (
        <div className="mt-4 grid gap-2">
          <input
            type="url"
            className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-neutral-800"
            placeholder="收據/證明連結（如：圖片或雲端硬碟）"
            value={proofUrl}
            onChange={(e) => setProofUrl(e.target.value)}
          />
          <textarea
            className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-neutral-800"
            placeholder="備註（可選）"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            className="self-start px-4 py-2 rounded-lg border bg-emerald-600 text-white disabled:opacity-50"
            onClick={handleSubmitVerification}
            disabled={submitting}
          >
            送出驗證
          </button>
        </div>
      )}

      {snapshot.verifiedProofUrl && (
        <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-300">
          ✅ 已有驗證：<a className="underline" href={snapshot.verifiedProofUrl} target="_blank" rel="noreferrer">查看證明</a>
        </div>
      )}
    </div>
  );
}
