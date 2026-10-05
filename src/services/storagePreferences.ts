export type OptionalStorageChoice = 'accepted' | 'rejected'

const CONSENT_KEY = 'autotracker-storage-consent'
const THEME_KEY = 'autotracker-theme'

export const getOptionalStorageChoice = (): OptionalStorageChoice | null => {
  try {
    const choice = localStorage.getItem(CONSENT_KEY)
    return choice === 'accepted' || choice === 'rejected' ? choice : null
  } catch {
    return null
  }
}

export const getRememberedTheme = (): 'light' | 'dark' | null => {
  try {
    if (getOptionalStorageChoice() !== 'accepted') {
      localStorage.removeItem(THEME_KEY)
      return null
    }

    const theme = localStorage.getItem(THEME_KEY)
    return theme === 'light' || theme === 'dark' ? theme : null
  } catch {
    return null
  }
}

export const rememberTheme = (theme: 'light' | 'dark'): void => {
  if (getOptionalStorageChoice() !== 'accepted') return

  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // The theme still applies for this visit when browser storage is unavailable.
  }
}

export const setOptionalStorageChoice = (choice: OptionalStorageChoice): void => {
  try {
    localStorage.setItem(CONSENT_KEY, choice)

    if (choice === 'rejected') {
      localStorage.removeItem(THEME_KEY)
      return
    }

    const currentTheme = document.documentElement.dataset.theme
    if (currentTheme === 'light' || currentTheme === 'dark') {
      localStorage.setItem(THEME_KEY, currentTheme)
    }
  } catch {
    // Keep the app usable if browser storage is disabled.
  }
}
