import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-sm backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
