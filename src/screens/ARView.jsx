import { motion as Motion } from 'framer-motion'
import ARViewport from '../components/ARViewport'
import BottomSheet from '../components/BottomSheet'
import HUDOverlay from '../components/HUDOverlay'
import WindshieldHUD from '../components/WindshieldHUD'
import { arWaypoints, mockSettings } from '../data/mockData'

function ARView() {
  return (
    <Motion.section
      className="relative h-full w-full px-3 pb-28 pt-3 lg:px-6 lg:pb-24 lg:pt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ARViewport waypoints={arWaypoints} arColor={mockSettings.arColor} />
      <WindshieldHUD />

      <div className="pointer-events-none absolute bottom-32 left-9 hidden rounded-2xl border border-hudGlow/20 bg-bgSurface/65 px-4 py-3 backdrop-blur-md lg:block">
        <p className="font-hud text-[11px] tracking-[0.2em] text-hudGlow">HOLOGRAM TELEMETRY</p>
        <p className="mt-1 text-xs text-textMuted">Depth Layer: 3D Grid Active</p>
        <p className="text-xs text-textMuted">Object Lock: 5 Waypoints</p>
      </div>

      <HUDOverlay />
      <BottomSheet />
    </Motion.section>
  )
}

export default ARView
