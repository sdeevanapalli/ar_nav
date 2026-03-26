import { motion as Motion } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowLeft, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, MapPin, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import { MapContainer, Marker, Polyline, TileLayer, Tooltip } from 'react-leaflet'
import { destinationRoutes, mapMarkers } from '../data/mockData'

const currentLocation = {
  id: 'current',
  name: 'You are here',
  lat: 17.5449,
  lng: 78.5718,
}

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function iconForDirection(direction) {
  if (direction === 'left') return ArrowLeft
  if (direction === 'right') return ArrowRight
  if (direction === 'arrive') return MapPin
  return ArrowUp
}

function RoutePlanner() {
  const [destination, setDestination] = useState(mapMarkers[1])
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const activeRoute = useMemo(() => {
    return destinationRoutes[destination?.name] ?? destinationRoutes.Cafeteria
  }, [destination])

  const routePoints = useMemo(() => {
    if (!destination) return []
    return activeRoute.pathCoordinates
  }, [activeRoute, destination])

  const steps = activeRoute.steps
  const activeStep = steps[activeStepIndex]
  const progressPercent = ((activeStepIndex + 1) / steps.length) * 100

  return (
    <Motion.section
      className="grid h-full grid-rows-[48%_1fr] gap-3 px-3 pb-24 pt-3 lg:grid-cols-2 lg:grid-rows-1 lg:px-6 lg:pb-20 lg:pt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="h-full overflow-hidden rounded-2xl border border-white/10">
        <MapContainer
          center={[17.5449, 78.5718]}
          zoom={16}
          className="h-full w-full"
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker
            position={[currentLocation.lat, currentLocation.lng]}
            icon={markerIcon}
          >
            <Tooltip permanent direction="top" offset={[0, -20]}>
              {currentLocation.name}
            </Tooltip>
          </Marker>

          {mapMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={markerIcon}
              eventHandlers={{
                click: () => {
                  setDestination(marker)
                  setActiveStepIndex(0)
                },
              }}
            >
              <Tooltip>{marker.name}</Tooltip>
            </Marker>
          ))}

          {routePoints.length > 0 ? (
            <Polyline positions={routePoints} pathOptions={{ color: '#00E5FF', weight: 4 }} />
          ) : null}
        </MapContainer>
      </div>

      <div className="h-full rounded-2xl border border-white/10 bg-bgSurface/80 p-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-hud text-xs tracking-[0.25em] text-hudGlow">ROUTE STEPS</h2>
          <span className="text-xs text-textMuted">To: {destination?.name ?? 'Select marker'}</span>
        </div>
        <div className="mb-3 rounded-xl border border-hudGlow/25 bg-bgPrimary/70 p-2.5">
          <p className="text-[11px] text-textMuted">Active Step</p>
          <p className="mt-1 text-xs text-textPrimary">{activeStep?.instruction}</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-hudGlow transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveStepIndex(0)}
              className="inline-flex items-center gap-1 rounded-full border border-hudGlow/35 px-2 py-1 text-[10px] text-hudGlow"
            >
              <Play size={12} /> Start
            </button>
            <button
              type="button"
              onClick={() => setActiveStepIndex((prev) => Math.max(prev - 1, 0))}
              className="inline-flex items-center gap-1 rounded-full border border-white/25 px-2 py-1 text-[10px] text-textPrimary"
            >
              <ChevronLeft size={12} /> Prev
            </button>
            <button
              type="button"
              onClick={() => setActiveStepIndex((prev) => Math.min(prev + 1, steps.length - 1))}
              className="inline-flex items-center gap-1 rounded-full border border-white/25 px-2 py-1 text-[10px] text-textPrimary"
            >
              Next <ChevronRight size={12} />
            </button>
          </div>
        </div>
        <ul className="max-h-[44vh] space-y-2 overflow-y-auto pr-1 lg:max-h-[65vh]">
          {steps.map((step, index) => {
            const StepIcon = iconForDirection(step.direction)
            const isActive = index === activeStepIndex
            return (
              <li
                key={step.id}
                className={`flex cursor-pointer items-start justify-between rounded-xl border px-3 py-2 transition ${
                  isActive
                    ? 'border-hudGlow/45 bg-hudGlow/10'
                    : 'border-white/10 bg-bgPrimary/70 hover:border-white/25'
                }`}
                onClick={() => setActiveStepIndex(index)}
              >
                <div className="flex items-start gap-2">
                  <span className={`mt-0.5 ${isActive ? 'text-hudGlow' : 'text-textMuted'}`}>
                    <StepIcon size={14} />
                  </span>
                  <span className="text-xs text-textPrimary">{step.instruction}</span>
                </div>
                <span className="ml-3 text-[11px] text-textMuted">{step.distance}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </Motion.section>
  )
}

export default RoutePlanner
