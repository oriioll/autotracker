export type Currency =
  | 'EUR'
  | 'USD'
  | 'GBP'
  | 'JPY'
  | 'CNY'
  | 'INR'
  | 'BRL'
  | 'MXN'
  | 'CHF'
  | 'TRY'
  | 'RUB'
  | 'KRW'
  | 'AED'
  | 'ILS'
  | 'NOK'
  | 'SEK'
  | 'DKK'
  | 'HUF'
  | 'CZK'
  | 'PLN'
  | 'THB'
  | 'MYR'
  | 'IDR'

export const formatCurrency = (amount: number, currency: Currency): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount)
}
