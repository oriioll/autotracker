import type { AppUser } from '@/types/AppUser'
import type { User } from '@supabase/supabase-js'
export class UserMapper {
  public supabaseUserToAppUser = (user: User): AppUser => {
    const appUser: AppUser = {
      id: user.id,
      name: user.user_metadata.full_name ?? '',
      avatar: user.user_metadata.avatar_url ?? '',
      email: user.email ?? '',
    }
    return appUser
  }
}
