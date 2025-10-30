"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LikeBar from "@/components/proposal/LikeBar";
import { useLanguage } from "@/components/LanguageProvider";
import type { LikeSnapshot, UserLikeState } from "@/types/like";

interface LikeSectionProps {
  proposalId: string;
  initialSnapshot?: LikeSnapshot;
  initialUser?: UserLikeState;
  reactionsEnabled?: boolean;
}

const createFallbackSnapshot = (proposalId: string): LikeSnapshot => ({
  proposalId,
  totalLikes: 0,
  totalBackers: 0
});

export default function LikeSection({
  proposalId,
  initialSnapshot,
  initialUser,
  reactionsEnabled = false
}: LikeSectionProps) {
  const { dictionary } = useLanguage();
  const [snapshot, setSnapshot] = useState<LikeSnapshot>(initialSnapshot ?? createFallbackSnapshot(proposalId));
  const [user, setUser] = useState<UserLikeState>(initialUser ?? { hasLiked: false, isVerifier: false });
  const [loading, setLoading] = useState(reactionsEnabled && !initialSnapshot);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setSnapshot(initialSnapshot ?? createFallbackSnapshot(proposalId));
  }, [initialSnapshot, proposalId]);

  useEffect(() => {
    setUser(initialUser ?? { hasLiked: false, isVerifier: false });
  }, [initialUser]);

  useEffect(() => {
    if (!reactionsEnabled || initialSnapshot) return;
    let cancelled = false;

    const fetchLatest = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/governance/proposals/${encodeURIComponent(proposalId)}`, { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (cancelled) return;
        if (data?.proposal?.likeSnapshot) {
          setSnapshot(data.proposal.likeSnapshot as LikeSnapshot);
        }
        if (data?.proposal?.user) {
          setUser(data.proposal.user as UserLikeState);
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 15_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [initialSnapshot, proposalId, reactionsEnabled]);

  const disabled = !reactionsEnabled;

  async function refreshLatest() {
    try {
      const response = await fetch(`/api/governance/proposals/${encodeURIComponent(proposalId)}`, { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      if (data?.proposal?.likeSnapshot) {
        setSnapshot(data.proposal.likeSnapshot as LikeSnapshot);
      }
      if (data?.proposal?.user) {
        setUser(data.proposal.user as UserLikeState);
      }
    } catch {
      // ignore
    }
  }

  async function handleToggle(next: boolean) {
    if (disabled) {
      toast.error(dictionary.proposalLikes.unavailable);
      return;
    }
    try {
      setPending(true);
      const response = await fetch(`/api/governance/proposals/${encodeURIComponent(proposalId)}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ like: next })
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error ?? "toggle-failed");
      }
      if (data.snapshot) {
        setSnapshot(data.snapshot as LikeSnapshot);
      }
      if (data.user) {
        setUser(data.user as UserLikeState);
      }
    } catch (error) {
      console.error(error);
      toast.error(dictionary.proposalLikes.toggleError);
      await refreshLatest();
    } finally {
      setPending(false);
    }
  }

  async function handleSubmitVerification(payload: { proofUrl: string; note?: string }) {
    if (disabled) {
      toast.error(dictionary.proposalLikes.unavailable);
      return;
    }
    try {
      setPending(true);
      const response = await fetch(`/api/governance/proposals/${encodeURIComponent(proposalId)}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error ?? "verification-failed");
      }
      if (data.snapshot) {
        setSnapshot(data.snapshot as LikeSnapshot);
      }
      if (data.user) {
        setUser(data.user as UserLikeState);
      }
      toast.success(dictionary.proposalLikes.submitSuccess);
    } catch (error) {
      console.error(error);
      toast.error(dictionary.proposalLikes.submitError);
    } finally {
      setPending(false);
      await refreshLatest();
    }
  }

  if (disabled) {
    return (
      <div className="mt-6 text-sm text-slate-600">
        {dictionary.proposalLikes.unavailable}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <LikeBar
        proposalId={proposalId}
        snapshot={snapshot}
        user={user}
        onLikeToggle={handleToggle}
        onSubmitVerification={handleSubmitVerification}
        disabled={disabled}
        loading={loading || pending}
      />
    </div>
  );
}
