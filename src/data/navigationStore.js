export const DESTINATION_STORAGE_KEY = 'ar-nav-destination'

export function getStoredDestination() {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(DESTINATION_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveStoredDestination(destination) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(DESTINATION_STORAGE_KEY, JSON.stringify(destination))
  window.dispatchEvent(new CustomEvent('app-destination-updated', { detail: destination }))
}

export function clearStoredDestination() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(DESTINATION_STORAGE_KEY)
}
