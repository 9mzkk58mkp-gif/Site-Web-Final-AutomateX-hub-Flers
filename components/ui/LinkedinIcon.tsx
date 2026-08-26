export default function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M8.34 9.5H5.62v9.02h2.72V9.5ZM6.98 5.1a1.58 1.58 0 1 0 0 3.16 1.58 1.58 0 0 0 0-3.16ZM18.5 13.4c0-2.76-1.47-4.05-3.44-4.05-1.59 0-2.3.87-2.69 1.48V9.5H9.65c.04.77 0 9.02 0 9.02h2.72v-5.04c0-.27.02-.54.1-.73.22-.54.71-1.1 1.55-1.1 1.09 0 1.53.83 1.53 2.04v4.83h2.72V13.4Z"
      />
    </svg>
  );
}
