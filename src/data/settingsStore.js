import { mockSettings } from './mockData'

export const SETTINGS_STORAGE_KEY = 'ar-nav-settings'

export function getStoredSettings() {
  if (typeof window === 'undefined') return mockSettings

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) return mockSettings

    const parsed = JSON.parse(raw)
    return { ...mockSettings, ...parsed }
  } catch {
    return mockSettings
  }
}

export function saveStoredSettings(settings) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  window.dispatchEvent(new CustomEvent('app-settings-updated', { detail: settings }))
}
