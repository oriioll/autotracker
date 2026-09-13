import { supabase } from '../supabase/supabase'

export function initGmailAuthBridge(): void {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event !== 'SIGNED_IN') return
    if (!session?.provider_refresh_token) return // already saved before, Google won't resend it

    const { error } = await supabase.functions.invoke('save-gmail-tokens', {
      body: {
        refresh_token: session.provider_refresh_token,
      },
    })

    if (error) {
      console.error('Error saving Gmail tokens:', error.message)
    }
  })
}
