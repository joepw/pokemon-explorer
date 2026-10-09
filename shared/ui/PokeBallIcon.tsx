export function PokeBallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="#ffffff" stroke="#1c1917" strokeWidth="2" />
      <path d="M2 16a14 14 0 0 1 28 0" fill="#ee1515" stroke="#1c1917" strokeWidth="2" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="#1c1917" strokeWidth="2" />
      <circle cx="16" cy="16" r="4.5" fill="#ffffff" stroke="#1c1917" strokeWidth="2" />
    </svg>
  );
}