// Naturum Echo — acoustic biodiversity monitoring data.
// Representative sample data for the platform dashboard. In production this
// would be served from the acoustic monitoring API / Supabase.

export type SiteStatus = 'restoring' | 'established' | 'baseline'

export interface HabitatSite {
  id: string
  name: string
  region: string
  habitat: string
  status: SiteStatus
  areaHa: number
  recorders: number
  recordersActive: number
  // Acoustic Complexity Index (0–100), the platform's headline "nature returning" score.
  index: number
  // Change in index over the last 12 months (percentage points).
  indexChange: number
  speciesRichness: number
  lastRecording: string
  // 12-month index history, used for the per-site sparkline.
  trend: number[]
}

export const sites: HabitatSite[] = [
  {
    id: 'wyckham-fen',
    name: 'Wyckham Fen',
    region: 'Cambridgeshire',
    habitat: 'Lowland fen',
    status: 'restoring',
    areaHa: 142,
    recorders: 8,
    recordersActive: 8,
    index: 71,
    indexChange: 14.2,
    speciesRichness: 96,
    lastRecording: '6 min ago',
    trend: [52, 54, 53, 57, 59, 58, 62, 64, 65, 67, 69, 71],
  },
  {
    id: 'alder-carr',
    name: 'Alder Carr',
    region: 'Norfolk',
    habitat: 'Wet woodland',
    status: 'established',
    areaHa: 88,
    recorders: 6,
    recordersActive: 6,
    index: 83,
    indexChange: 6.1,
    speciesRichness: 121,
    lastRecording: '2 min ago',
    trend: [74, 75, 77, 76, 78, 79, 80, 80, 81, 82, 82, 83],
  },
  {
    id: 'blackmoor-heath',
    name: 'Blackmoor Heath',
    region: 'Surrey',
    habitat: 'Lowland heath',
    status: 'restoring',
    areaHa: 210,
    recorders: 10,
    recordersActive: 9,
    index: 64,
    indexChange: 18.7,
    speciesRichness: 78,
    lastRecording: '11 min ago',
    trend: [41, 43, 45, 47, 48, 51, 53, 55, 57, 60, 62, 64],
  },
  {
    id: 'silverdale-meadow',
    name: 'Silverdale Meadow',
    region: 'Lancashire',
    habitat: 'Species-rich grassland',
    status: 'restoring',
    areaHa: 54,
    recorders: 4,
    recordersActive: 4,
    index: 58,
    indexChange: 21.4,
    speciesRichness: 63,
    lastRecording: '19 min ago',
    trend: [34, 36, 38, 39, 42, 44, 46, 49, 51, 53, 56, 58],
  },
  {
    id: 'tarn-hollow',
    name: 'Tarn Hollow',
    region: 'Cumbria',
    habitat: 'Upland mire',
    status: 'baseline',
    areaHa: 176,
    recorders: 5,
    recordersActive: 5,
    index: 47,
    indexChange: 2.3,
    speciesRichness: 41,
    lastRecording: '34 min ago',
    trend: [44, 45, 44, 46, 45, 46, 45, 47, 46, 47, 46, 47],
  },
  {
    id: 'estuary-reach',
    name: 'Estuary Reach',
    region: 'Kent',
    habitat: 'Coastal saltmarsh',
    status: 'established',
    areaHa: 133,
    recorders: 7,
    recordersActive: 6,
    index: 79,
    indexChange: 8.9,
    speciesRichness: 108,
    lastRecording: '4 min ago',
    trend: [67, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
  },
]

// Categorical species groups. Colours are validated for CVD safety and
// paired with direct labels throughout (relief rule from the palette).
export interface SpeciesGroup {
  key: string
  label: string
  detections: number
  color: string
}

export const speciesGroups: SpeciesGroup[] = [
  { key: 'birds', label: 'Birds', detections: 48210, color: '#1baf7a' },
  { key: 'insects', label: 'Insects', detections: 21640, color: '#eda100' },
  { key: 'amphibians', label: 'Amphibians', detections: 9870, color: '#2a78d6' },
  { key: 'mammals', label: 'Mammals', detections: 6120, color: '#eb6834' },
]

// Network-wide monthly Acoustic Complexity Index over 18 months — the core
// "nature returning" trend. Values rise as habitats are restored.
export interface TrendPoint {
  month: string
  index: number
  species: number
}

export const networkTrend: TrendPoint[] = [
  { month: 'Mar 25', index: 51, species: 214 },
  { month: 'Apr 25', index: 53, species: 226 },
  { month: 'May 25', index: 56, species: 248 },
  { month: 'Jun 25', index: 58, species: 261 },
  { month: 'Jul 25', index: 59, species: 270 },
  { month: 'Aug 25', index: 60, species: 274 },
  { month: 'Sep 25', index: 61, species: 279 },
  { month: 'Oct 25', index: 62, species: 283 },
  { month: 'Nov 25', index: 62, species: 285 },
  { month: 'Dec 25', index: 63, species: 288 },
  { month: 'Jan 26', index: 64, species: 291 },
  { month: 'Feb 26', index: 65, species: 296 },
  { month: 'Mar 26', index: 66, species: 304 },
  { month: 'Apr 26', index: 67, species: 312 },
  { month: 'May 26', index: 68, species: 319 },
  { month: 'Jun 26', index: 69, species: 327 },
  { month: 'Jul 26', index: 70, species: 334 },
  { month: 'Aug 26', index: 72, species: 341 },
]

// Mean acoustic activity across a 24h cycle (0–100), highlighting the dawn
// and dusk choruses. Index into the array by hour.
export const dailyActivity: number[] = [
  12, 9, 8, 10, 18, 42, 78, 94, 88, 71, 58, 49,
  44, 41, 43, 47, 52, 61, 74, 83, 66, 41, 24, 16,
]

// Recent soundscape recordings surfaced on the platform.
export interface Recording {
  id: string
  site: string
  siteId: string
  time: string
  period: 'Dawn' | 'Morning' | 'Midday' | 'Dusk' | 'Night'
  durationMin: number
  dominant: string
  species: number
  index: number
  // Normalised amplitude envelope (0–1) driving the waveform.
  waveform: number[]
}

const wave = (seed: number): number[] =>
  Array.from({ length: 48 }, (_, i) => {
    const a = Math.sin((i + seed) * 0.7) * 0.5 + 0.5
    const b = Math.sin((i + seed) * 0.23) * 0.3
    const c = Math.sin((i + seed) * 1.9) * 0.18
    return Math.min(1, Math.max(0.08, a * 0.6 + b + c + 0.35))
  })

export const recordings: Recording[] = [
  {
    id: 'r1',
    site: 'Alder Carr',
    siteId: 'alder-carr',
    time: '05:12',
    period: 'Dawn',
    durationMin: 20,
    dominant: 'Nightingale',
    species: 27,
    index: 86,
    waveform: wave(3),
  },
  {
    id: 'r2',
    site: 'Wyckham Fen',
    siteId: 'wyckham-fen',
    time: '05:47',
    period: 'Dawn',
    durationMin: 20,
    dominant: 'Reed warbler',
    species: 22,
    index: 74,
    waveform: wave(9),
  },
  {
    id: 'r3',
    site: 'Estuary Reach',
    siteId: 'estuary-reach',
    time: '19:03',
    period: 'Dusk',
    durationMin: 15,
    dominant: 'Curlew',
    species: 19,
    index: 80,
    waveform: wave(15),
  },
  {
    id: 'r4',
    site: 'Blackmoor Heath',
    siteId: 'blackmoor-heath',
    time: '21:30',
    period: 'Night',
    durationMin: 30,
    dominant: 'Nightjar',
    species: 11,
    index: 63,
    waveform: wave(21),
  },
  {
    id: 'r5',
    site: 'Silverdale Meadow',
    siteId: 'silverdale-meadow',
    time: '08:15',
    period: 'Morning',
    durationMin: 15,
    dominant: 'Skylark',
    species: 17,
    index: 58,
    waveform: wave(27),
  },
]

// Headline platform figures.
export const kpis = {
  sites: sites.length,
  recordersActive: sites.reduce((n, s) => n + s.recordersActive, 0),
  recordersTotal: sites.reduce((n, s) => n + s.recorders, 0),
  recordingHours: 18420,
  recordingHoursChange: 12.4,
  speciesDetected: 341,
  speciesChange: 27,
  meanIndex: Math.round(sites.reduce((n, s) => n + s.index, 0) / sites.length),
  meanIndexChange: 11.6,
}

export const statusLabels: Record<SiteStatus, string> = {
  restoring: 'Restoring',
  established: 'Established',
  baseline: 'Baseline',
}
