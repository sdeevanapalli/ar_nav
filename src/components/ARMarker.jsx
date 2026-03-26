import { motion as Motion } from 'framer-motion'

const typeColors = {
  exit: 'bg-alert',
  food: 'bg-accentBlue',
  facility: 'bg-success',
  medical: 'bg-alert',
}

function ARMarker({ label, distance, x, y, type, color = '#00E5FF' }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      <Motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Motion.span
          className="absolute h-12 w-12 rounded-full border"
          style={{ borderColor: color }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
        <span
          className="relative z-10 h-3.5 w-3.5 rounded-full shadow-[0_0_16px_rgba(0,229,255,0.8)]"
          style={{ backgroundColor: color }}
        />
        <span className="mt-2 rounded-full border border-hudGlow/60 bg-bgSurface/90 px-2 py-0.5 font-hud text-[11px] text-textPrimary">
          {distance}
        </span>
        <span className="mt-1 rounded-full px-2 py-0.5 text-[11px] text-textPrimary backdrop-blur-sm">
          <span className={`inline-block h-2 w-2 rounded-full ${typeColors[type] || 'bg-hudGlow'} mr-1.5`} />
          {label}
        </span>
      </Motion.div>
    </div>
  )
}

export default ARMarker
