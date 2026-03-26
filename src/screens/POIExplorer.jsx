import { motion as Motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import POICard from '../components/POICard'
import { poiList } from '../data/mockData'

const categories = ['All', 'Food', 'Exits', 'Washrooms', 'Medical', 'Parking']

function POIExplorer() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return poiList
    return poiList.filter((poi) => poi.category === activeFilter)
  }, [activeFilter])

  return (
    <Motion.section
      className="h-full px-3 pb-24 pt-3 lg:px-6 lg:pb-20 lg:pt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-x-visible">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveFilter(category)
              setExpandedId(null)
            }}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs transition ${
              activeFilter === category
                ? 'border-hudGlow bg-hudGlow/20 text-hudGlow'
                : 'border-white/15 bg-bgSurface/70 text-textMuted'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid max-h-[78vh] grid-cols-2 gap-3 overflow-y-auto pr-1 lg:max-h-[70vh] lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((poi) => (
          <POICard
            key={poi.id}
            poi={poi}
            expanded={expandedId === poi.id}
            onToggle={() =>
              setExpandedId((prev) => {
                if (prev === poi.id) return null
                return poi.id
              })
            }
          />
        ))}
      </div>
    </Motion.section>
  )
}

export default POIExplorer
