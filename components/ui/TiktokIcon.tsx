const NOTE_PATH =
  "M14.5 6.5c.4 1.6 1.7 2.8 3.3 3.1v2.4c-1.2-.1-2.3-.5-3.3-1.1v5.6c0 2.5-2 4.5-4.5 4.5S5.5 19 5.5 16.5 7.5 12 10 12c.3 0 .6 0 .9.1v2.5c-.3-.1-.6-.2-.9-.2-1.2 0-2.1 1-2.1 2.1s1 2.1 2.1 2.1 2.1-1 2.1-2.1V4h2.4c.1 1 .5 1.8 1 2.5Z";

export default function TiktokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#000" />
      <path d={NOTE_PATH} fill="#25F4EE" transform="translate(-0.6,-0.6)" />
      <path d={NOTE_PATH} fill="#FE2C55" transform="translate(0.6,0.6)" />
      <path d={NOTE_PATH} fill="#fff" />
    </svg>
  );
}
