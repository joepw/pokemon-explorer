export function BerryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="15" cy="19" r="9" fill="#f43f5e" />
      <circle cx="11.5" cy="16.5" r="1.5" fill="#fecdd3" opacity="0.7" />
      <path
        d="M15 10c0-4.5 3-7 8-7 0 4.5-3 7-8 7z"
        fill="#22c55e"
      />
      <path d="M15 10v3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}