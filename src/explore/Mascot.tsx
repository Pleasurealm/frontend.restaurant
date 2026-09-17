// Pip — the Naturum Echo Explore mascot. A friendly little bird with a leaf.
export default function Mascot({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Pip, the Naturum Echo mascot">
      {/* soundwave halo */}
      <g stroke="#fff" strokeOpacity="0.55" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M14 44a10 10 0 0 0 0 12" />
        <path d="M8 40a17 17 0 0 0 0 20" />
      </g>
      {/* body */}
      <ellipse cx="54" cy="56" rx="30" ry="28" fill="#f6c33d" />
      <ellipse cx="54" cy="62" rx="21" ry="19" fill="#fff4d6" />
      {/* wing */}
      <path d="M74 52c8 2 12 10 9 17-6-2-11-6-13-12Z" fill="#e5a92b" />
      {/* leaf sprout */}
      <path d="M52 26c2-8 9-12 16-11-1 8-7 13-16 13Z" fill="#4bbd63" />
      <path d="M52 28c3-4 8-6 13-6" stroke="#2f8a46" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="46" cy="50" r="4.6" fill="#2a2a2a" />
      <circle cx="62" cy="50" r="4.6" fill="#2a2a2a" />
      <circle cx="47.4" cy="48.6" r="1.5" fill="#fff" />
      <circle cx="63.4" cy="48.6" r="1.5" fill="#fff" />
      {/* beak */}
      <path d="M50 58l8 0-4 5Z" fill="#f2762f" />
      {/* cheek */}
      <circle cx="40" cy="58" r="3.4" fill="#f4a3a0" opacity="0.7" />
      <circle cx="68" cy="58" r="3.4" fill="#f4a3a0" opacity="0.7" />
      {/* feet */}
      <path d="M46 82v5M58 82v5" stroke="#f2762f" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}
