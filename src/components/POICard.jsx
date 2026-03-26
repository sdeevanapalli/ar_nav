import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Clock3, MapPinned } from 'lucide-react'

function POICard({ poi, expanded, onToggle }) {
  return (
    <Motion.article
      layout
      className="rounded-2xl border border-white/10 bg-bgSurface/80 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_14px_30px_rgba(0,0,0,0.4)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={onToggle} className="w-full text-left" type="button">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-2xl">{poi.emoji}</span>
            <h3 className="mt-2 text-sm font-semibold text-textPrimary">{poi.name}</h3>
            <p className="mt-1 text-xs text-textMuted">{poi.distance}</p>
          </div>
          <span className="rounded-full border border-hudGlow/40 bg-hudGlow/10 px-2 py-0.5 text-[10px] font-medium text-hudGlow">
            {poi.category}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <Motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2 border-t border-white/10 pt-3 text-xs text-textMuted">
              <p>{poi.description}</p>
              <div className="flex items-center gap-1.5">
                <MapPinned size={14} className="text-hudGlow" /> Floor: {poi.floor}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock3 size={14} className="text-hudGlow" /> {poi.hours}
              </div>
            </div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </Motion.article>
  )
}

export default POICard
