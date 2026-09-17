import { useEffect, useState } from 'react'
import { subscribe, toggle, stop } from '../lib/player'

// Reflects the app-wide soundscape player. `playingId` is the id of the capture
// currently sounding (or null); `toggle`/`stop` control it.
export function usePlayer() {
  const [playingId, setPlayingId] = useState<string | null>(null)
  useEffect(() => subscribe(setPlayingId), [])
  return { playingId, toggle, stop }
}
