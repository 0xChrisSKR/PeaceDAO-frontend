import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  helper?: ReactNode;
}

export function Stat({ label, value, helper, className, ...props }: StatProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/10 bg-zinc-900/70 p-5 shadow-inner shadow-amber-500/10 backdrop-blur",
        className
      )}
      {...props}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">{label}</p>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {helper ? <p className="mt-2 text-xs text-zinc-400">{helper}</p> : null}
    </div>
  );
}
