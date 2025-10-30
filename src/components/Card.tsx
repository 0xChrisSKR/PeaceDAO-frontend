import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/10 bg-zinc-900/60 p-6 shadow-lg shadow-black/20 backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
