import { motion as Motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/ar'), 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <Motion.section
      className="flex h-full flex-col items-center justify-center bg-bgPrimary px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <div className="relative mb-8 h-28 w-28">
        <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(0,229,255,0.15)" strokeWidth="6" />
          <circle
            className="splash-ring"
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h1 className="font-hud text-4xl tracking-[0.25em] text-hudGlow">AR NAV</h1>
      <p className="mt-3 text-sm text-textMuted">Augmented Navigation System</p>
    </Motion.section>
  )
}

export default SplashScreen
