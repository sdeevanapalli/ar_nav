import { motion as Motion } from 'framer-motion'
import ARMarker from './ARMarker'

function ARViewport({ waypoints, arColor, showWaypoints = true, guidanceLabel = 'STRAIGHT 180m' }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-hudGlow/20 bg-bgSurface">
      <div className="ar-radial-shift absolute inset-0" />
      <div className="holo-scanlines pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 left-[-20%] h-24 w-[70%] -rotate-12 bg-gradient-to-r from-transparent via-hudGlow/18 to-transparent blur-sm animate-[beamSweep_5s_linear_infinite]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="roadCore" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="roadEdge" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <polygon
            points="39,100 61,100 53.2,29 46.8,29"
            fill="url(#roadCore)"
            className="holo-road-glow"
          />
          <line x1="46.8" y1="29" x2="39" y2="100" stroke="url(#roadEdge)" strokeWidth="0.5" />
          <line x1="53.2" y1="29" x2="61" y2="100" stroke="url(#roadEdge)" strokeWidth="0.5" />
          <line x1="50" y1="29" x2="50" y2="100" stroke="#00E5FF" strokeWidth="0.34" className="holo-road-dash" />
          <path
            d="M50 31 C52 38, 58 44, 65 49"
            stroke="#00E5FF"
            strokeOpacity="0.85"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <Motion.div
          className="absolute left-[50%] top-[37%] -translate-x-1/2 rounded-full border border-hudGlow/55 bg-bgPrimary/70 px-3 py-1 font-hud text-[10px] tracking-[0.16em] text-hudGlow backdrop-blur-sm"
          animate={{ y: [0, -8, 0], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {guidanceLabel}
        </Motion.div>

        <Motion.div
          className="absolute left-[63%] top-[47%] rounded-xl border border-hudGlow/50 bg-bgPrimary/75 px-3 py-2 text-[11px] text-hudGlow shadow-[0_0_16px_rgba(0,229,255,0.25)]"
          animate={{ y: [0, -7, 0], x: [0, 3, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        >
          <span className="font-hud tracking-[0.12em]">TURN RIGHT</span>
          <p className="mt-1 font-hud text-[10px] text-textPrimary">in 120m</p>
        </Motion.div>

        <Motion.div
          className="absolute left-[33%] top-[56%] rounded-xl border border-success/40 bg-success/15 px-2.5 py-1.5 text-[10px] font-hud tracking-[0.08em] text-success"
          animate={{ y: [0, -6, 0], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
        >
          LANE OK
        </Motion.div>

        <Motion.div
          className="absolute left-1/2 top-[57%] z-[5]"
          animate={{ y: [0, -40, -76], x: [0, 1.5, -1.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="holo-walker -translate-x-1/2">
            <span className="walker-head" />
            <span className="walker-body" />
            <span className="walker-arm-left" />
            <span className="walker-arm-right" />
            <span className="walker-leg-left" />
            <span className="walker-leg-right" />
          </div>
        </Motion.div>
      </div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gridFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {Array.from({ length: 10 }).map((_, idx) => {
          const y = 10 + idx * 9
          return <line key={`h-${idx}`} x1="0" y1={y} x2="100" y2={90 + idx * 1.4} stroke="url(#gridFade)" strokeWidth="0.25" />
        })}
        {Array.from({ length: 9 }).map((_, idx) => {
          const x = 10 + idx * 10
          return <line key={`v-${idx}`} x1={x} y1="20" x2={50 + (idx - 4) * 8} y2="100" stroke="#00E5FF" strokeWidth="0.2" opacity="0.3" />
        })}
      </svg>

      {showWaypoints ? (
        <div className="absolute inset-0 z-[6]">
          {waypoints.map((waypoint) => (
            <ARMarker key={waypoint.id} {...waypoint} color={arColor} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ARViewport
