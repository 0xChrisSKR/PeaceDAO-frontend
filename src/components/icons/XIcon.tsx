export function XIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "h-4 w-4"}
    >
      <path d="M2 2h3.3l6.1 8.2L17.4 2h4.6l-7.8 10.4L22 22h-3.3l-6.3-8.5L6.6 22H2l8-10.7L2 2z" />
    </svg>
  );
}
