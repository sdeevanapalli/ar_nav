import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import ARView from './screens/ARView'
import POIExplorer from './screens/POIExplorer'
import RoutePlanner from './screens/RoutePlanner'
import Settings from './screens/Settings'
import SplashScreen from './screens/SplashScreen'

function AppLayout() {
  const location = useLocation()
  const showBottomNav = location.pathname !== '/'

  return (
    <div className="relative mx-auto flex h-full w-full max-w-[1320px] items-stretch lg:px-5 xl:px-7">
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="holo-orb left-[6%] top-[8%]" />
        <div className="holo-orb right-[10%] top-[55%]" />
      </div>

      <aside className="holo-card my-6 hidden w-[270px] flex-col justify-between rounded-3xl border border-hudGlow/15 p-5 lg:flex xl:w-[320px]">
        <div>
          <p className="font-hud text-xs tracking-[0.35em] text-hudGlow">SYSTEM</p>
          <h2 className="mt-3 font-hud text-2xl tracking-wide text-textPrimary">AR NAV HUD</h2>
          <p className="mt-2 text-sm text-textMuted">
            Desktop control panel for presentation mode with holographic signal layers.
          </p>
        </div>
        <div className="space-y-2 text-xs text-textMuted">
          <p>Signal Strength: 99%</p>
          <p>Rendering Mode: Simulated AR</p>
          <p>Map Source: OpenStreetMap</p>
        </div>
      </aside>

      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col border-x border-white/10 bg-bgPrimary lg:my-6 lg:max-w-[960px] lg:overflow-hidden lg:rounded-3xl lg:border lg:border-white/15 lg:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_70px_rgba(0,0,0,0.55)]">
        <main className="relative min-h-0 flex-1 overflow-hidden">
          <div className="holo-scanlines pointer-events-none absolute inset-0 z-0 opacity-30" />
          <div className="relative z-10 h-full">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/ar" element={<ARView />} />
              <Route path="/route" element={<RoutePlanner />} />
              <Route path="/poi" element={<POIExplorer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        {showBottomNav ? <BottomNav /> : null}
      </div>

      <aside className="holo-card my-6 hidden w-[270px] rounded-3xl border border-hudGlow/15 p-5 lg:block xl:w-[320px]">
        <p className="font-hud text-xs tracking-[0.3em] text-hudGlow">DESKTOP NOTES</p>
        <ul className="mt-4 space-y-3 text-sm text-textMuted">
          <li>Interactive AR markers pulse in real-time.</li>
          <li>Compass and HUD simulate continuous heading updates.</li>
          <li>Route can switch instantly by map marker selection.</li>
          <li>POI and accessibility preferences are component driven.</li>
        </ul>
      </aside>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
