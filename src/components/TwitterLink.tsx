"use client";

import Link from "next/link";
import clsx from "clsx";
import { twitterHandle, twitterUrl } from "@/lib/twitter";
import { XIcon } from "@/components/icons/XIcon";

export function TwitterLink({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Link
      href={twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-white",
        className
      )}
    >
      <XIcon className="h-4 w-4" />
      <span className="sr-only">Visit our X account ({twitterHandle})</span>
      <span aria-hidden>{label ?? twitterHandle}</span>
    </Link>
  );
}
