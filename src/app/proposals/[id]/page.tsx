import React from 'react';
import LikeSection from './LikeSection';

export default async function ProposalDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  // TODO: 這裡拉取提案內容（你既有的程式）
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* 你的提案內容區 */}
      <h1 className="text-2xl font-bold">提案 #{id}</h1>
      {/* 其他細節… */}
      <LikeSection proposalId={id} />
    </div>
  );
}
