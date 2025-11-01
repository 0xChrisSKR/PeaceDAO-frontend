export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 text-sm text-white/60">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div>© {new Date().getFullYear()} WorldPeace DAO • 目前僅支援 <b className="text-yellow-300">BNB Smart Chain (BSC)</b>，所有捐款/收款只接受 BNB。</div>
      </div>
    </footer>
  );
}
