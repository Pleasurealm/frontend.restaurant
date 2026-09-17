// Naturum Echo — Explore: the playful, public-facing companion app.
// Schools, families and communities listen to habitats, collect the species
// they hear ("Echoes"), and add their own captures to the field mesh.

export type Rarity = 'common' | 'rare' | 'legendary'

export interface Echo {
  id: string
  name: string
  emoji: string
  group: 'Birds' | 'Insects' | 'Amphibians' | 'Mammals' | 'Plants'
  rarity: Rarity
  collected: boolean
  habitat: string
  fact: string
  color: string
}

export const echoes: Echo[] = [
  { id: 'e1', name: 'Nightingale', emoji: '🎶', group: 'Birds', rarity: 'legendary', collected: true, habitat: 'Wet woodland', fact: 'Sings after dark — one of the loudest voices for its size.', color: '#8b6fd6' },
  { id: 'e2', name: 'Skylark', emoji: '🕊️', group: 'Birds', rarity: 'common', collected: true, habitat: 'Grassland', fact: 'Sings while hovering high above the meadow.', color: '#4bbd63' },
  { id: 'e3', name: 'Common frog', emoji: '🐸', group: 'Amphibians', rarity: 'common', collected: true, habitat: 'Fen', fact: 'A spring chorus can be heard 500m away.', color: '#3aa6e0' },
  { id: 'e4', name: 'Bittern', emoji: '🪶', group: 'Birds', rarity: 'rare', collected: true, habitat: 'Reedbed', fact: 'Its booming call is the deepest of any UK bird.', color: '#f4b52a' },
  { id: 'e5', name: 'Marsh fritillary', emoji: '🦋', group: 'Insects', rarity: 'rare', collected: true, habitat: 'Meadow', fact: 'A sign of healthy, flower-rich grassland.', color: '#f4744e' },
  { id: 'e6', name: 'Otter', emoji: '🦦', group: 'Mammals', rarity: 'rare', collected: false, habitat: 'Saltmarsh', fact: 'Returning to rivers as water quality improves.', color: '#5f7d8b' },
  { id: 'e7', name: 'Nightjar', emoji: '🌙', group: 'Birds', rarity: 'legendary', collected: false, habitat: 'Heath', fact: 'Churrs at dusk — a sound like a distant engine.', color: '#8b6fd6' },
  { id: 'e8', name: 'Natterjack toad', emoji: '🐸', group: 'Amphibians', rarity: 'legendary', collected: false, habitat: 'Dune', fact: 'The UK’s loudest amphibian.', color: '#4bbd63' },
  { id: 'e9', name: 'Reed warbler', emoji: '🐦', group: 'Birds', rarity: 'common', collected: true, habitat: 'Reedbed', fact: 'Weaves a nest slung between reed stems.', color: '#4bbd63' },
  { id: 'e10', name: 'Field cricket', emoji: '🦗', group: 'Insects', rarity: 'rare', collected: false, habitat: 'Grassland', fact: 'Chirps by rubbing its wings together.', color: '#f4b52a' },
  { id: 'e11', name: 'Curlew', emoji: '🪶', group: 'Birds', rarity: 'rare', collected: true, habitat: 'Saltmarsh', fact: 'Its bubbling call is a sound of wild wetlands.', color: '#3aa6e0' },
  { id: 'e12', name: 'Barbastelle bat', emoji: '🦇', group: 'Mammals', rarity: 'legendary', collected: false, habitat: 'Woodland', fact: 'Hunts by whispering — very quiet echolocation.', color: '#8b6fd6' },
]

export interface Question {
  id: string
  answer: string
  emoji: string
  options: string[]
  hint: string
  waveform: number[]
}

const w = (seed: number): number[] =>
  Array.from({ length: 40 }, (_, i) => {
    const a = Math.sin((i + seed) * 0.6) * 0.5 + 0.5
    const b = Math.sin((i + seed) * 1.7) * 0.22
    return Math.min(1, Math.max(0.12, a * 0.7 + b + 0.3))
  })

export const questions: Question[] = [
  { id: 'q1', answer: 'Nightingale', emoji: '🎶', options: ['Robin', 'Nightingale', 'Blackbird', 'Wren'], hint: 'Sings after dark in wet woodland.', waveform: w(2) },
  { id: 'q2', answer: 'Common frog', emoji: '🐸', options: ['Common frog', 'Cricket', 'Moorhen', 'Toad'], hint: 'A spring chorus from the fen.', waveform: w(7) },
  { id: 'q3', answer: 'Curlew', emoji: '🪶', options: ['Gull', 'Lapwing', 'Curlew', 'Oystercatcher'], hint: 'A bubbling call over the saltmarsh.', waveform: w(11) },
  { id: 'q4', answer: 'Skylark', emoji: '🕊️', options: ['Skylark', 'Swallow', 'Pipit', 'Finch'], hint: 'Sings while hovering over the meadow.', waveform: w(15) },
  { id: 'q5', answer: 'Bittern', emoji: '🪶', options: ['Heron', 'Bittern', 'Coot', 'Grebe'], hint: 'A deep boom from deep in the reeds.', waveform: w(19) },
]

export interface Badge {
  id: string
  name: string
  emoji: string
  desc: string
  earned: boolean
  progress?: string
}

export const badges: Badge[] = [
  { id: 'b1', name: 'Dawn Riser', emoji: '🌅', desc: 'Listened to a dawn chorus', earned: true },
  { id: 'b2', name: 'First Echo', emoji: '⭐', desc: 'Collected your first species', earned: true },
  { id: 'b3', name: 'Sharp Ears', emoji: '👂', desc: 'Score 5 in a row in Listen', earned: true },
  { id: 'b4', name: 'Field Scout', emoji: '📡', desc: 'Added a capture over the mesh', earned: true },
  { id: 'b5', name: 'Reedbed Ranger', emoji: '🌾', desc: 'Collect all reedbed species', earned: false, progress: '2 / 3' },
  { id: 'b6', name: 'Night Owl', emoji: '🦉', desc: 'Collect 3 nocturnal species', earned: false, progress: '1 / 3' },
]

// Nearby captures are no longer static — MapScreen derives them live from the
// Overview pulse (see src/explore/nearby.ts).

// Days of the week with visit state; streak counts consecutive true days.
export const streak = {
  current: 5,
  best: 12,
  days: [
    { d: 'M', done: true },
    { d: 'T', done: true },
    { d: 'W', done: true },
    { d: 'T', done: true },
    { d: 'F', done: true },
    { d: 'S', done: false, today: true },
    { d: 'S', done: false },
  ] as { d: string; done: boolean; today?: boolean }[],
}

export const rarityLabel: Record<Rarity, string> = {
  common: 'Common',
  rare: 'Rare',
  legendary: 'Legendary',
}

export const collectedCount = echoes.filter((e) => e.collected).length
