export function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-900/50">
      <div className="text-neutral-400 text-xs">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub ? <div className="text-xs text-neutral-400 mt-1">{sub}</div> : null}
    </div>
  );
}
