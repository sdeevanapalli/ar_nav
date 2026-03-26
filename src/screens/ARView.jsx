import { motion as Motion } from 'framer-motion'
import ARViewport from '../components/ARViewport'
import BottomSheet from '../components/BottomSheet'
import HUDOverlay from '../components/HUDOverlay'
import { arWaypoints, mockSettings } from '../data/mockData'

function ARView() {
  return (
    <Motion.section
      className="relative h-full w-full px-3 pb-28 pt-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ARViewport waypoints={arWaypoints} arColor={mockSettings.arColor} />
      <HUDOverlay />
      <BottomSheet />
    </Motion.section>
  )
}

export default ARView
