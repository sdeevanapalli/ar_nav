import { motion as Motion } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowLeft, ArrowRight, ArrowUp, MapPin } from 'lucide-react'
import { useMemo, useState } from 'react'
import { MapContainer, Marker, Polyline, TileLayer, Tooltip } from 'react-leaflet'
import { mapMarkers, routeSteps } from '../data/mockData'

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

  const routePoints = useMemo(() => {
    if (!destination) return []
    return [
      [currentLocation.lat, currentLocation.lng],
      [destination.lat, destination.lng],
    ]
  }, [destination])

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
              eventHandlers={{ click: () => setDestination(marker) }}
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
        <ul className="max-h-[44vh] space-y-2 overflow-y-auto pr-1 lg:max-h-[65vh]">
          {routeSteps.map((step) => {
            const StepIcon = iconForDirection(step.direction)
            return (
              <li
                key={step.id}
                className="flex items-start justify-between rounded-xl border border-white/10 bg-bgPrimary/70 px-3 py-2"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-hudGlow">
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
