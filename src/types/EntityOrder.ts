export type EntityOrder = {
  id: string
  user_id: string
  company: string
  merchant: string | null
  order_id: string | null
  total: number | null
  currency: string | null
  tracking_number: string | null
  carrier: string | null
  status: string | null
  estimated_delivery: string | null
  created_at: string
  updated_at: string
  gmail_message_id: string | null
}
