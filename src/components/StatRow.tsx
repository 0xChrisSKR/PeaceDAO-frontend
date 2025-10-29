import clsx from "clsx";

interface StatRowProps {
  goal: string;
  raised: string;
  goalLabel: string;
  raisedLabel: string;
  progressLabel: string;
  className?: string;
}

export function StatRow({ goal, raised, goalLabel, raisedLabel, progressLabel, className }: StatRowProps) {
  const goalValue = Number(goal) || 0;
  const raisedValue = Number(raised) || 0;
  const progress = goalValue > 0 ? Math.min(raisedValue / goalValue, 1) : 0;
  const percent = Math.round(progress * 100);

  return (
    <div
      className={clsx(
        "space-y-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-slate-100 shadow-inner backdrop-blur",
        className
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-200/80">{raisedLabel}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{raisedValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} BNB</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-200/80">{goalLabel}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{goalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} BNB</p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-emerald-200/80">
          <span>{progressLabel}</span>
          <span>{percent}%</span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
