import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/40 bg-white/70 p-6 shadow-sm backdrop-blur", 
        "dark:border-white/10 dark:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
