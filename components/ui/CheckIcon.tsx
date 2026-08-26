export default function CheckIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="11" fill="rgba(31,217,160,0.14)" />
      <path
        fill="none"
        stroke="#1FD9A0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 12.5l3 3 6-6.5"
      />
    </svg>
  );
}
