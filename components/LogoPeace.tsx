export default function LogoPeace(props:{size?:number}) {
  const size = props.size ?? 140;
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" role="img" aria-label="World Peace DAO">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00D1FF"/>
          <stop offset="100%" stopColor="#7C3AED"/>
        </linearGradient>
      </defs>
      <circle cx="70" cy="70" r="66" fill="none" stroke="url(#g)" strokeWidth="8"/>
      <path d="M70 20v100M20 70h100" stroke="url(#g)" strokeWidth="8" strokeLinecap="round"/>
    </svg>
  );
}
