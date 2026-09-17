import type { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../supabase/supabase'
import type { AppUser } from '@/types/AppUser'
import { UserMapper } from '@/mapper/user.mapper'

export class AuthService {
  private readonly supabase: SupabaseClient
  private readonly userMapper: UserMapper
  constructor() {
    this.supabase = supabase
    this.userMapper = new UserMapper()
  }

  /**
   * Logs a user using Google Oauth with supabase.
   * The user gets redirected to Google Login page and then to the dashboard
   * @author Oriol Plazas León
   * @since 12/09/2026
   * @throws Error if the login fails
   */
  public async loginWithGoogle(): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        scopes: 'https://www.googleapis.com/auth/gmail.readonly',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    if (error) {
      throw new Error(error.message)
    }
  }

  /**
   * Logs out the user from supabase
   * @author Oriol Plazas León
   * @since 12/09/2026
   * @throws Error if the logout fails
   */
  public async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  }

  /**
   * Gets the current user logged and throws an error if any user is logged
   * @returns {Promise<AppUser>} Promise of the current user logged
   * @author Oriol Plazas León
   * @since 12/09/2026
   * @throws Error if there is not any user logged or supabase returns an error
   */
  public async getMe(): Promise<AppUser> {
    const { data, error } = await this.supabase.auth.getUser()
    if (error || !data.user) {
      throw new Error(error?.message || 'User not logged')
    }
    return this.userMapper.supabaseUserToAppUser(data.user)
  }

  /**
   * Gets the last sync time for the current user
   * @returns {Promise<string>} Promise of the last sync
   * @author Oriol Plazas León
   * @since 17/09/2026
   * @throws Error if there supabase returns an error
   */
  public async getLastSyncTime(): Promise<string> {
    const { data, error } = await this.supabase.from('sync_state').select('last_synced_at').single()
    if (error) {
      throw new Error(error?.message || 'No sync detected')
    }
    return data.last_synced_at
  }
}
