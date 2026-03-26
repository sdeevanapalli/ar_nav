import { motion as Motion } from 'framer-motion'
import { AlertTriangle, Gauge, Navigation2, Timer } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

function WindshieldHUD() {
  const [speed, setSpeed] = useState(34)
  const [etaMin, setEtaMin] = useState(6)
  const [lanePulse, setLanePulse] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSpeed((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1
        return Math.min(42, Math.max(28, prev + delta))
      })
      setEtaMin((prev) => (prev <= 5 ? 7 : prev - 0.05))
      setLanePulse((prev) => (prev + 1) % 100)
    }, 250)

    return () => clearInterval(timer)
  }, [])

  const laneOffset = useMemo(() => (lanePulse % 20) * 1.4, [lanePulse])

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <div className="absolute inset-x-[8%] bottom-[23%] top-[22%] rounded-[2.5rem] border border-hudGlow/25">
        <div className="hud-vignette absolute inset-0 rounded-[2.5rem]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M50 16 L18 100" stroke="#00E5FF" strokeOpacity="0.22" strokeWidth="0.45" />
          <path d="M50 16 L82 100" stroke="#00E5FF" strokeOpacity="0.22" strokeWidth="0.45" />
          <line x1="50" y1="16" x2="50" y2="100" stroke="#00E5FF" strokeOpacity="0.2" strokeWidth="0.35" />
          <line x1="33" y1="62" x2="67" y2="62" stroke="#00E5FF" strokeOpacity="0.25" strokeWidth="0.32" />
        </svg>

        <div className="absolute bottom-[12%] left-1/2 w-[38%] -translate-x-1/2">
          {[0, 1, 2].map((index) => (
            <Motion.div
              key={index}
              className="mx-auto mb-2 h-[2px] rounded-full bg-hudGlow/75"
              animate={{
                width: ['20%', '100%', '20%'],
                opacity: [0.1, 0.7, 0.1],
                y: [0, -10, -22],
              }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                delay: index * 0.28,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-x-[18%] top-[45%] h-px bg-gradient-to-r from-transparent via-hudGlow/70 to-transparent"
          style={{ transform: `translateY(${laneOffset}px)` }}
        />
      </div>

      <Motion.div
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 rounded-2xl border border-hudGlow/35 bg-bgPrimary/70 px-5 py-3 backdrop-blur-md"
        animate={{ boxShadow: ['0 0 12px rgba(0,229,255,0.2)', '0 0 22px rgba(0,229,255,0.45)', '0 0 12px rgba(0,229,255,0.2)'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="flex items-end gap-3">
          <div>
            <p className="font-hud text-[10px] tracking-[0.25em] text-hudGlow">SPEED</p>
            <div className="mt-1 flex items-end gap-1">
              <span className="font-hud text-3xl leading-none text-hudGlow">{speed}</span>
              <span className="mb-1 font-hud text-xs text-textMuted">km/h</span>
            </div>
          </div>
          <Gauge size={16} className="mb-1 text-hudGlow" />
        </div>
      </Motion.div>

      <div className="absolute left-[8%] top-[31%] rounded-xl border border-hudGlow/25 bg-bgPrimary/60 px-3 py-2 backdrop-blur-sm">
        <p className="font-hud text-[10px] tracking-[0.2em] text-hudGlow">TURN</p>
        <div className="mt-1 flex items-center gap-2 text-textPrimary">
          <Navigation2 size={14} className="rotate-45 text-hudGlow" />
          <span className="font-hud text-xs">LEFT 120m</span>
        </div>
      </div>

      <div className="absolute right-[8%] top-[31%] rounded-xl border border-hudGlow/25 bg-bgPrimary/60 px-3 py-2 backdrop-blur-sm">
        <p className="font-hud text-[10px] tracking-[0.2em] text-hudGlow">ETA</p>
        <div className="mt-1 flex items-center gap-2 text-textPrimary">
          <Timer size={14} className="text-hudGlow" />
          <span className="font-hud text-xs">{etaMin.toFixed(1)} min</span>
        </div>
      </div>

      <Motion.div
        className="absolute right-[10%] top-[48%] rounded-xl border border-alert/45 bg-alert/15 px-3 py-2 text-[11px] text-alert backdrop-blur-sm"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.9, repeat: Infinity }}
      >
        <span className="inline-flex items-center gap-1.5 font-hud tracking-[0.08em]">
          <AlertTriangle size={13} /> SAFE GAP LOW
        </span>
      </Motion.div>
    </div>
  )
}

export default WindshieldHUD
