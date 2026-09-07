type IconProps = { className?: string };

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function OverviewIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

export function SalesIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 19V9" />
      <path d="M10 19V4" />
      <path d="M16 19v-7" />
      <path d="M20 19V11" />
      <path d="M3 19h18" />
    </svg>
  );
}

export function RisksIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 3v18" />
      <path d="M4 4h13l-2.5 4L17 12H4" />
    </svg>
  );
}
