export function PeaceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="peace-wing" x1="12" y1="8" x2="44" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8bd0ff" />
          <stop offset="1" stopColor="#5ba7d4" />
        </linearGradient>
      </defs>
      <path
        d="M10 30c10 3 20-1 28-12 2 10 10 16 20 18-6 4-12 6-18 6-6 8-14 12-22 12-4 0-8-1-12-3 6-2 10-7 12-13-7 1-12-2-14-8z"
        fill="url(#peace-wing)"
      />
      <path
        d="M20 20c6-2 12-7 14-14 4 6 10 10 16 11-4 4-8 6-12 7-4-1-10-2-18-4z"
        fill="#9be2c4"
      />
      <circle cx="44" cy="14" r="2" fill="#1c4a6d" />
      <path d="M50 16c2 3 4 6 6 9-3-1-6-2-9-4 1-2 2-3 3-5z" fill="#a3d4ff" />
    </svg>
  );
}
