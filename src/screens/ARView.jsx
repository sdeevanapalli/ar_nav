import { motion as Motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ARViewport from '../components/ARViewport'
import BottomSheet from '../components/BottomSheet'
import HUDOverlay from '../components/HUDOverlay'
import WindshieldHUD from '../components/WindshieldHUD'
import { arWaypoints } from '../data/mockData'
import { getStoredDestination } from '../data/navigationStore'
import { getStoredSettings } from '../data/settingsStore'

function ARView() {
  const [settings, setSettings] = useState(getStoredSettings())
  const [showWindshieldHUD, setShowWindshieldHUD] = useState(true)
  const [showWaypoints, setShowWaypoints] = useState(true)
  const [guidanceIndex, setGuidanceIndex] = useState(0)
  const [activeDestination, setActiveDestination] = useState(getStoredDestination())
  const [showDestinationPopup, setShowDestinationPopup] = useState(Boolean(getStoredDestination()))

  const guidanceModes = ['STRAIGHT 180m', 'TURN RIGHT 120m', 'TURN LEFT 90m', 'ARRIVE 40m']

  useEffect(() => {
    const refreshSettings = () => setSettings(getStoredSettings())

    window.addEventListener('storage', refreshSettings)
    window.addEventListener('app-settings-updated', refreshSettings)

    return () => {
      window.removeEventListener('storage', refreshSettings)
      window.removeEventListener('app-settings-updated', refreshSettings)
    }
  }, [])

  useEffect(() => {
    const refreshDestination = () => {
      const destination = getStoredDestination()
      setActiveDestination(destination)
      setShowDestinationPopup(Boolean(destination))
    }

    window.addEventListener('storage', refreshDestination)
    window.addEventListener('app-destination-updated', refreshDestination)

    return () => {
      window.removeEventListener('storage', refreshDestination)
      window.removeEventListener('app-destination-updated', refreshDestination)
    }
  }, [])

  return (
    <Motion.section
      className="relative h-full w-full px-3 pb-28 pt-3 lg:px-6 lg:pb-24 lg:pt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ARViewport
        waypoints={arWaypoints}
        arColor={settings.arColor}
        showWaypoints={showWaypoints}
        guidanceLabel={guidanceModes[guidanceIndex]}
      />
      {showWindshieldHUD ? <WindshieldHUD /> : null}

      <div className="absolute left-3 top-20 z-30 flex max-w-[92%] flex-wrap gap-2 lg:left-6 lg:top-24">
        <button
          type="button"
          onClick={() => setShowWindshieldHUD((prev) => !prev)}
          className="rounded-full border border-hudGlow/45 bg-bgPrimary/75 px-3 py-1 text-[11px] font-medium text-hudGlow backdrop-blur-md"
        >
          {showWindshieldHUD ? 'Hide HUD' : 'Show HUD'}
        </button>
        <button
          type="button"
          onClick={() => setShowWaypoints((prev) => !prev)}
          className="rounded-full border border-hudGlow/45 bg-bgPrimary/75 px-3 py-1 text-[11px] font-medium text-hudGlow backdrop-blur-md"
        >
          {showWaypoints ? 'Hide Markers' : 'Show Markers'}
        </button>
        <button
          type="button"
          onClick={() => setGuidanceIndex((prev) => (prev + 1) % guidanceModes.length)}
          className="rounded-full border border-hudGlow/45 bg-bgPrimary/75 px-3 py-1 text-[11px] font-medium text-hudGlow backdrop-blur-md"
        >
          Next Guidance
        </button>
      </div>

      {showDestinationPopup && activeDestination ? (
        <div className="absolute right-3 top-36 z-30 w-[220px] rounded-2xl border border-hudGlow/50 bg-bgPrimary/85 px-3 py-2 backdrop-blur-md lg:right-6 lg:top-24">
          <p className="font-hud text-[10px] tracking-[0.18em] text-hudGlow">NAV TARGET</p>
          <p className="mt-1 text-sm font-semibold text-textPrimary">{activeDestination.name}</p>
          <p className="text-xs text-textMuted">
            {activeDestination.distance} • {activeDestination.category}
          </p>
          <button
            type="button"
            onClick={() => setShowDestinationPopup(false)}
            className="mt-2 rounded-full border border-hudGlow/45 bg-hudGlow/10 px-2.5 py-1 text-[10px] font-semibold text-hudGlow"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="pointer-events-none absolute bottom-32 left-9 hidden rounded-2xl border border-hudGlow/20 bg-bgSurface/65 px-4 py-3 backdrop-blur-md lg:block">
        <p className="font-hud text-[11px] tracking-[0.2em] text-hudGlow">HOLOGRAM TELEMETRY</p>
        <p className="mt-1 text-xs text-textMuted">Depth Layer: 3D Grid Active</p>
        <p className="text-xs text-textMuted">Object Lock: 5 Waypoints</p>
      </div>

      <HUDOverlay />
      <BottomSheet destination={activeDestination} />
    </Motion.section>
  )
}

export default ARView
