import { motion as Motion } from 'framer-motion'
import { ChevronsUp, Route, Sparkles } from 'lucide-react'

function BottomSheet({ destination }) {
  const routeTitle = destination
    ? `Innovation Block → ${destination.name}`
    : 'Innovation Block → Cafeteria'

  const nextLine = destination
    ? `Next: ${destination.name} • ${destination.distance} • Follow AR lane`
    : 'Next: Junction A • 20m • Turn Left'

  return (
    <Motion.div
      drag="y"
      dragConstraints={{ top: -120, bottom: 0 }}
      dragElastic={0.12}
      className="absolute inset-x-3 bottom-3 z-30 rounded-2xl border border-hudGlow/25 bg-bgSurface/85 p-4 backdrop-blur-xl"
      initial={{ y: 36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
    >
      <div className="mb-3 flex items-center justify-center">
        <ChevronsUp className="text-textMuted" size={14} />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-hud text-xs tracking-[0.2em] text-hudGlow">CURRENT ROUTE</p>
          <h3 className="mt-1 text-sm font-semibold text-textPrimary">{routeTitle}</h3>
          <p className="mt-1 text-xs text-textMuted">{nextLine}</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full border border-success/40 bg-success/20 p-2 text-success">
            <Route size={16} />
          </span>
          <span className="rounded-full border border-hudGlow/40 bg-hudGlow/20 p-2 text-hudGlow">
            <Sparkles size={16} />
          </span>
        </div>
      </div>
    </Motion.div>
  )
}

export default BottomSheet
