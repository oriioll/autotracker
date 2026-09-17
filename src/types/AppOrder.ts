import type { Currency } from './Currency'

export type AppOrder = {
  id: string
  merchant: string
  orderNumber: string
  total: number | null
  currency: Currency | null
  trackingNumber: string | null
  carrier: string | null
  company: string
  status: string
  estimatedDelivery: Date | null
  createdAt: Date
}
