import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={clsx("space-y-4", className)} {...props} />;
}
