import { useEffect, useState } from 'react'
import { Compass, Navigation, Satellite, Signal } from 'lucide-react'

function HUDOverlay() {
  const [heading, setHeading] = useState(12)

  useEffect(() => {
    const timer = setInterval(() => {
      setHeading((prev) => (prev + 2.4) % 360)
    }, 120)

    return () => clearInterval(timer)
  }, [])

  const now = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-3">
      <div className="flex items-center justify-between rounded-2xl border border-hudGlow/30 bg-bgSurface/65 px-3 py-2 backdrop-blur-md">
        <div className="flex items-center gap-1 text-hudGlow">
          <Satellite size={14} />
          <Signal size={14} />
          <span className="font-hud text-[10px] tracking-widest text-success">GPS LOCK</span>
        </div>

        <div className="flex items-center gap-2 font-hud text-hudGlow">
          <Compass size={15} />
          <div className="relative flex h-8 w-24 items-center justify-center rounded-full border border-hudGlow/35 bg-bgPrimary/70 text-[11px] tracking-[0.3em]">
            N E S W
            <Navigation
              size={13}
              className="absolute text-hudGlow"
              style={{ transform: `rotate(${heading}deg)` }}
            />
          </div>
        </div>

        <div className="flex flex-col items-end font-hud text-[10px] tracking-wide text-textPrimary">
          <span>{now}</span>
          <span>{Math.round((heading % 90) + 10)}% BAT</span>
        </div>
      </div>
    </div>
  )
}

export default HUDOverlay
