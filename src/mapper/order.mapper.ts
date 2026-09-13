import type { AppOrder } from '@/types/AppOrder'
import type { EntityOrder } from '@/types/EntityOrder'

export class OrderMapper {
  entityToApp(entity: EntityOrder): AppOrder {
    const appOrder: AppOrder = {
      id: entity.id,
      merchant: entity.merchant ?? entity.company,
      orderNumber: entity.order_id ?? '',
      total: entity.total,
      currency: entity.currency,
      trackingNumber: entity.tracking_number,
      carrier: entity.carrier,
      status: entity.status ?? 'unknown',
      estimatedDelivery: entity.estimated_delivery ? new Date(entity.estimated_delivery) : null,
      createdAt: new Date(entity.created_at),
    }
    return appOrder
  }
}
