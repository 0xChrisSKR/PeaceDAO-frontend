export type Address = `0x${string}`;

export interface LikeSnapshot {
  proposalId: string;
  totalLikes: number;
  totalBackers: number;
  txHashes?: string[];         // 鏈上相關交易
  verifiedProofUrl?: string;   // 驗證者上傳的收據連結（圖片或雲端）
  lastLikedAt?: number;        // ms timestamp
}

export interface UserLikeState {
  hasLiked: boolean;
  isVerifier: boolean; // 是否為驗證者
}

export interface LikeBarProps {
  proposalId: string;
  snapshot: LikeSnapshot;
  user: UserLikeState;
  onLikeToggle?: (next: boolean) => Promise<void> | void;
  onSubmitVerification?: (payload: { proofUrl: string; note?: string }) => Promise<void> | void;
}
