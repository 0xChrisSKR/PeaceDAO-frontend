'use client';

import LikeBar from '@/components/proposal/LikeBar';
import type { LikeSnapshot, UserLikeState } from '@/types/like';
import { useState } from 'react';

export default function LikeSection({ proposalId }: { proposalId: string }) {
  // 假資料：正式接鏈時改成從 API / 合約讀
  const [snapshot, setSnapshot] = useState<LikeSnapshot>({
    proposalId,
    totalLikes: 42,
    totalBackers: 17,
    txHashes: ['0x123'],
    verifiedProofUrl: '',
    lastLikedAt: Date.now(),
  });

  const [user, setUser] = useState<UserLikeState>({
    hasLiked: false,
    isVerifier: true, // 測試用：顯示「提交收尾驗證」按鈕
  });

  async function onLikeToggle(next: boolean) {
    // TODO: 呼叫後端/合約 API（例如 /api/proposals/:id/like）
    await new Promise((r) => setTimeout(r, 300)); // 模擬延遲
    setUser((u) => ({ ...u, hasLiked: next }));
    setSnapshot((s) => ({
      ...s,
      totalLikes: s.totalLikes + (next ? 1 : -1),
      lastLikedAt: Date.now(),
    }));
  }

  async function onSubmitVerification(payload: { proofUrl: string; note?: string }) {
    // TODO: 上傳驗證資料（鏈上/後端）
    await new Promise((r) => setTimeout(r, 500));
    setSnapshot((s) => ({ ...s, verifiedProofUrl: payload.proofUrl }));
  }

  return (
    <div className="mt-6">
      <LikeBar
        proposalId={proposalId}
        snapshot={snapshot}
        user={user}
        onLikeToggle={onLikeToggle}
        onSubmitVerification={onSubmitVerification}
      />
    </div>
  );
}
