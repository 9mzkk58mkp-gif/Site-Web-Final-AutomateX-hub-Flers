export default function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        fill="#fff"
        d="M15.5 12.5h-2.02v7.4h-3.06v-7.4H9v-2.6h1.42V8.36c0-1.86.9-3.28 3.35-3.28.9 0 1.98.15 1.98.15v2.44h-1.13c-1.11 0-1.36.6-1.36 1.32v1.9h2.4l-.16 2.6Z"
      />
    </svg>
  );
}
