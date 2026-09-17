/**
 * Formats a date from supabase to adapt it to the ui
 * @param date The date from supabase to parse
 * @returns {string} Adapted ui date string to display
 * @author Oriol Plazas León
 * @since 17/09/2026
 */
export const formatLastSync = (date: string): string => {
  const syncDate = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - syncDate.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes} min ago`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours} h ago`
  return syncDate.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Formats an order date for the dashboard
 * @param date The date to format
 * @returns A readable date or a fallback when the date is missing
 */
export const formatDate = (date: Date | null): string => {
  if (!date) return '-'

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
