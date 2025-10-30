"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/LanguageProvider";
import type { LikeBarProps } from "@/types/like";

export default function LikeBar({
  proposalId,
  snapshot,
  user,
  onLikeToggle,
  onSubmitVerification,
  disabled = false,
  loading = false
}: LikeBarProps) {
  const { dictionary } = useLanguage();
  const [optimisticLiked, setOptimisticLiked] = useState(user.hasLiked);
  const [submitting, setSubmitting] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [proofUrl, setProofUrl] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setOptimisticLiked(user.hasLiked);
  }, [user.hasLiked]);

  const totalLikes = snapshot.totalLikes + (optimisticLiked && !user.hasLiked ? 1 : 0) + (!optimisticLiked && user.hasLiked ? -1 : 0);
  const supporters = snapshot.totalBackers ?? 0;
  const likeDisabled = disabled || loading || submitting;

  async function handleLike() {
    if (likeDisabled) return;
    const nextValue = !optimisticLiked;
    setOptimisticLiked(nextValue);
    try {
      setSubmitting(true);
      await onLikeToggle?.(nextValue);
    } catch (error) {
      console.error(error);
      setOptimisticLiked(user.hasLiked);
      toast.error(dictionary.proposalLikes.toggleError);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmitVerification() {
    if (!proofUrl) {
      toast.error(dictionary.proposalLikes.proofRequired);
      return;
    }
    if (submitting || disabled) return;
    try {
      setSubmitting(true);
      await onSubmitVerification?.({ proofUrl, note });
      setShowVerify(false);
      setProofUrl("");
      setNote("");
    } catch (error) {
      console.error(error);
      toast.error(dictionary.proposalLikes.submitError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white/60 p-4 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/60">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              optimisticLiked
                ? "border-rose-600 bg-rose-600 text-white shadow"
                : "border-neutral-300 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
            }`}
            onClick={handleLike}
            disabled={likeDisabled}
            aria-pressed={optimisticLiked}
          >
            <span aria-hidden>❤️</span>
            <span>{optimisticLiked ? dictionary.proposalLikes.liked : dictionary.proposalLikes.like}</span>
          </button>

          <div className="text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">{totalLikes}</span> {dictionary.proposalLikes.likesLabel}
            {" · "}
            <span className="font-semibold">{supporters}</span> {dictionary.proposalLikes.supportersLabel}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {snapshot.txHashes?.length ? (
            <a
              href={`https://bscscan.com/tx/${snapshot.txHashes[0]}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs underline text-neutral-600 transition hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
              {dictionary.proposalLikes.viewTx}
            </a>
          ) : null}

          {user.isVerifier ? (
            <button
              type="button"
              onClick={() => setShowVerify((x) => !x)}
              disabled={disabled}
              className="text-xs px-3 py-2 rounded-lg border border-neutral-300 text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              {showVerify ? dictionary.proposalLikes.closeVerify : dictionary.proposalLikes.openVerify}
            </button>
          ) : null}
        </div>
      </div>

      {loading ? (
        <p className="mt-3 text-xs text-neutral-500">{dictionary.common.loading}</p>
      ) : null}

      {showVerify && user.isVerifier ? (
        <div className="mt-4 grid gap-2">
          <input
            type="url"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:border-emerald-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder={dictionary.proposalLikes.proofPlaceholder}
            value={proofUrl}
            onChange={(event) => setProofUrl(event.target.value)}
            disabled={submitting}
          />
          <textarea
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:border-emerald-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder={dictionary.proposalLikes.notePlaceholder}
            rows={3}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            disabled={submitting}
          />
          <button
            type="button"
            className="self-start rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
            onClick={handleSubmitVerification}
            disabled={submitting}
          >
            {dictionary.proposalLikes.submit}
          </button>
        </div>
      ) : null}

      {snapshot.verifiedProofUrl ? (
        <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-300">
          ✅ {dictionary.proposalLikes.verifiedLabel}:{" "}
          <a className="underline" href={snapshot.verifiedProofUrl} target="_blank" rel="noreferrer">
            {dictionary.proposalLikes.viewTx}
          </a>
        </div>
      ) : null}
    </div>
  );
}
