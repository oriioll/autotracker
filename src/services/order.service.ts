import { type SupabaseClient, FunctionsHttpError } from '@supabase/supabase-js'
import { supabase } from '../supabase/supabase'
import type { AppOrder } from '@/types/AppOrder'
import { AuthService } from './auth.service'
import type { AppUser } from '@/types/AppUser'
import { OrderMapper } from '@/mapper/order.mapper'
import { type EntityOrder } from '../types/EntityOrder'

export class OrderService {
  private readonly supabase: SupabaseClient
  private readonly authService: AuthService
  private readonly orderMapper: OrderMapper
  constructor() {
    this.supabase = supabase
    this.authService = new AuthService()
    this.orderMapper = new OrderMapper()
  }

  /**
   * Loads the orders of the current logged user
   * @returns {Promise<AppOrder[]>} Promise with an array with all the orders of the user
   * @author Oriol Plazas León
   * @since 13/09/2026
   * @throws Error if cannot load user orders
   */
  public async loadUserOrders(): Promise<AppOrder[]> {
    const user: AppUser = await this.authService.getMe()
    //Get all the orders from the user logged
    const orders = await this.supabase.from('orders').select('*').eq('user_id', user.id)
    if (orders.error) {
      throw new Error(orders.error.message)
    }
    //Map each db order to correct type
    const existingOrders: AppOrder[] = orders.data.map((order: EntityOrder) =>
      this.orderMapper.entityToApp(order),
    )
    return existingOrders
  }

  /**
   * Loads the most recent orders of the current logged user
   * @returns {Promise<AppOrder[]>} Promise with an array with all the recent orders of the user
   * @author Oriol Plazas León
   * @since 17/09/2026
   * @throws Error if cannot load user orders
   */
  public async getRecentOrders(): Promise<AppOrder[]> {
    const user: AppUser = await this.authService.getMe()
    const now = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(now.getDate() + 7)
    const { data, error } = await this.supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .gte('estimated_delivery', now.toISOString())
      .lte('estimated_delivery', nextWeek.toISOString())
    if (error) {
      throw new Error(error.message)
    }
    //Map each db order to correct type
    const existingOrders: AppOrder[] = data.map((order: EntityOrder) =>
      this.orderMapper.entityToApp(order),
    )
    return existingOrders
  }

  /**
   * Calls supabase invoke function sync-gmail that reads all the new mails since the lasts syncronization
   * and if it finds any new order Upserts into database
   * @author Oriol Plazas León
   * @since 13/09/2026
   * @throws Error if cannot load supabase invoke sync-gmail function
   */
  public async syncGmail(): Promise<void> {
    let data
    do {
      const res = await this.supabase.functions.invoke('sync-gmail')
      if (res.error) {
        // FunctionsHttpError hides our { error } body inside context (a Response)
        if (res.error instanceof FunctionsHttpError) {
          //Throw error properly with the error message from the function
          const body = await res.error.context.json().catch(() => null)
          throw new Error(body?.error ?? res.error.message)
        }
        throw new Error(res.error.message)
      }
      data = res.data
    } while (data.remaining > 0 && data.processed > 0)
  }
}
