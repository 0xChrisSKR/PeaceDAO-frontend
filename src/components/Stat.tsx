import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  helper?: ReactNode;
}

export function Stat({ label, value, helper, className, ...props }: StatProps) {
  return (
    <div className={clsx("rounded-2xl border border-slate-200/70 bg-white/80 p-5 backdrop-blur", className)} {...props}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      {helper ? <p className="mt-2 text-xs text-slate-500">{helper}</p> : null}
    </div>
  );
}
