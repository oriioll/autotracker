export type AppOrder = {
  id: string
  merchant: string
  orderNumber: string
  total: number | null
  currency: string | null
  trackingNumber: string | null
  carrier: string | null
  status: string
  estimatedDelivery: Date | null
  createdAt: Date
}
