import clsx from "clsx";
import { HTMLAttributes } from "react";

interface PageTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
}

export function PageTitle({ title, subtitle, tone = "dark", className, ...props }: PageTitleProps) {
  const headingClass = tone === "light" ? "text-3xl font-semibold text-white sm:text-4xl" : "text-3xl font-semibold text-slate-900 sm:text-4xl";
  const subtitleClass = tone === "light" ? "max-w-3xl text-base text-slate-200" : "max-w-3xl text-base text-slate-600";

  return (
    <div className={clsx("space-y-2", className)} {...props}>
      <h1 className={headingClass}>{title}</h1>
      {subtitle ? <p className={subtitleClass}>{subtitle}</p> : null}
    </div>
  );
}
