// Minimal inline icon set (stroke icons, 1.6 weight) so the dashboard ships
// with no external icon dependency.
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const IconWave = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2 12h2M20 12h2" />
    <path d="M6 9v6M9 5v14M12 8v8M15 4v16M18 9v6" />
  </svg>
)

export const IconGrid = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

export const IconPin = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const IconLeaf = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 20c8 1 15-4 16-16C8 4 3 11 4 20Z" />
    <path d="M4 20c3-6 7-9 12-11" />
  </svg>
)

export const IconBird = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M16 7a2 2 0 1 0-2-2" />
    <path d="M20 6c-1 6-5 9-10 9H4c3 4 7 5 10 4 4-1.4 6.5-5 6-13Z" />
    <path d="M8 15v4" />
  </svg>
)

export const IconReport = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 9h8M8 13h8M8 17h5" />
  </svg>
)

export const IconClock = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconMic = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
  </svg>
)

export const IconSpecies = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a15 15 0 0 0 0 18M3 12h18" />
  </svg>
)

export const IconArrowUp = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
)

export const IconPlay = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p} fill="currentColor" stroke="none">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
)

export const IconStop = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p} fill="currentColor" stroke="none">
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
  </svg>
)

export const IconBell = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
)

export const IconSun = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
  </svg>
)

export const IconMoon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M21 13A8.5 8.5 0 1 1 11 3a6.5 6.5 0 0 0 10 10Z" />
  </svg>
)

export const IconChevron = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const IconBluetooth = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M7 8l10 8-5 4V4l5 4L7 16" />
  </svg>
)

export const IconCamera = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
)

export const IconRadio = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="2" />
    <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 19.1a10 10 0 0 0 0-14.2" />
  </svg>
)

export const IconBattery = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="8" width="15" height="8" rx="2" />
    <path d="M21 11v2" />
  </svg>
)

export const IconCompass = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
  </svg>
)

export const IconTrophy = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
    <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 17h6M10 20h4M12 13v4" />
  </svg>
)

export const IconSparkle = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
  </svg>
)
