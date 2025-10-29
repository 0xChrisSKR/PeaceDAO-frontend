import clsx from "clsx";
import { HTMLAttributes } from "react";

interface PageTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle, className, ...props }: PageTitleProps) {
  return (
    <div className={clsx("space-y-2", className)} {...props}>
      <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h1>
      {subtitle ? <p className="max-w-3xl text-base text-slate-600">{subtitle}</p> : null}
    </div>
  );
}
