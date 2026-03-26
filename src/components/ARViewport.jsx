import ARMarker from './ARMarker'

function ARViewport({ waypoints, arColor }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-hudGlow/20 bg-bgSurface">
      <div className="ar-radial-shift absolute inset-0" />

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

      <div className="absolute inset-0">
        {waypoints.map((waypoint) => (
          <ARMarker key={waypoint.id} {...waypoint} color={arColor} />
        ))}
      </div>
    </div>
  )
}

export default ARViewport
