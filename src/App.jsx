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
    <div className="mx-auto flex h-full w-full max-w-[430px] flex-col border-x border-white/10 bg-bgPrimary">
      <main className="relative min-h-0 flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/ar" element={<ARView />} />
          <Route path="/route" element={<RoutePlanner />} />
          <Route path="/poi" element={<POIExplorer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showBottomNav ? <BottomNav /> : null}
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
