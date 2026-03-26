import { Camera, Compass, Map, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../lib/cn'

const navItems = [
  { label: 'AR View', to: '/ar', icon: Camera },
  { label: 'Route', to: '/route', icon: Map },
  { label: 'Explore', to: '/poi', icon: Compass },
  { label: 'Settings', to: '/settings', icon: Settings },
]

function BottomNav() {
  return (
    <nav className="border-t border-[#333] bg-bgSurface/95 px-3 pb-3 pt-2 backdrop-blur-sm">
      <ul className="grid grid-cols-4 gap-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center rounded-xl py-2 text-[11px] transition-colors',
                  isActive ? 'text-hudGlow' : 'text-textMuted hover:text-textPrimary',
                )
              }
            >
              <item.icon size={18} />
              <span className="mt-1">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BottomNav
