import { motion as Motion } from 'framer-motion'
import { CheckCircle2, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { mockSettings } from '../data/mockData'

const swatches = ['#00E5FF', '#FF4D6D', '#00C853', '#FFD600', '#FFFFFF']

function Settings() {
  const [settings, setSettings] = useState(mockSettings)
  const [saved, setSaved] = useState(false)

  const saveSettings = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <Motion.section
      className="h-full overflow-y-auto px-3 pb-28 pt-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ fontSize: `${settings.fontSize}px` }}
    >
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/10 bg-bgSurface/80 p-4">
          <p className="font-hud text-xs tracking-[0.2em] text-hudGlow">UNITS</p>
          <div className="mt-3 inline-flex rounded-full border border-white/15 bg-bgPrimary/70 p-1 text-sm">
            {['meters', 'feet'].map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => setSettings((prev) => ({ ...prev, units: unit }))}
                className={`rounded-full px-4 py-1.5 capitalize transition ${
                  settings.units === unit
                    ? 'bg-hudGlow/20 text-hudGlow'
                    : 'text-textMuted'
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-bgSurface/80 p-4">
          <p className="font-hud text-xs tracking-[0.2em] text-hudGlow">VOICE GUIDANCE</p>
          <button
            type="button"
            onClick={() =>
              setSettings((prev) => ({
                ...prev,
                voiceGuidance: !prev.voiceGuidance,
              }))
            }
            className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-bgPrimary/70 px-3 py-2"
          >
            <span className="flex items-center gap-2 text-textPrimary">
              <Volume2 size={16} className="text-hudGlow" />
              Enabled
            </span>
            <span
              className={`relative h-6 w-11 rounded-full transition ${
                settings.voiceGuidance ? 'bg-success/70' : 'bg-white/20'
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  settings.voiceGuidance ? 'left-6' : 'left-1'
                }`}
              />
            </span>
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-bgSurface/80 p-4">
          <p className="font-hud text-xs tracking-[0.2em] text-hudGlow">AR OVERLAY COLOR</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {swatches.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSettings((prev) => ({ ...prev, arColor: color }))}
                className={`h-9 w-9 rounded-full border-2 ${
                  settings.arColor === color ? 'border-white' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-bgSurface/80 p-4">
          <p className="font-hud text-xs tracking-[0.2em] text-hudGlow">FONT SIZE</p>
          <input
            type="range"
            min={12}
            max={20}
            step={1}
            value={settings.fontSize}
            onChange={(event) =>
              setSettings((prev) => ({
                ...prev,
                fontSize: Number(event.target.value),
              }))
            }
            className="mt-3 w-full accent-hudGlow"
          />
          <p className="mt-1 text-xs text-textMuted">{settings.fontSize}px</p>
        </div>
      </div>

      <button
        type="button"
        onClick={saveSettings}
        className="mt-4 w-full rounded-xl bg-accentBlue px-4 py-3 font-semibold text-white"
      >
        Save Preferences
      </button>

      {saved ? (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full border border-success/50 bg-success/20 px-3 py-1.5 text-sm text-success backdrop-blur-md">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Settings saved
          </span>
        </div>
      ) : null}
    </Motion.section>
  )
}

export default Settings
