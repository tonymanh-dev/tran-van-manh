import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getUSDPrice = (amount?: string, currentPrice?: string) => {
  if (!amount || !currentPrice) return null

  const toUSD = Number(amount) * Number(currentPrice)

  return toUSD.toFixed(2)
}

export const formatWithCommas = (number?: number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || null
}

export const updatedTokenBalance = (symbol: string) => {
  switch (symbol) {
    case 'ETH':
      return 8.2
    case 'ADA':
      return 2690
    case 'USDT':
      return 3688
    case 'BTC':
      return 1.2
    default:
      return 0
  }
}

export const checkNumericValue = (value: string): RegExpMatchArray | null => {
  const result = value.match(/^[0-9]*[.,]?[0-9]*$/)
  return result
}

export const calculateConversionRate = (
  amountPayToken: string | undefined,
  pricePayToken: string | undefined,
  priceTokenReceive: string | undefined
): string | undefined => {
  if (!amountPayToken || !pricePayToken || !priceTokenReceive) {
    // console.error('Invalid input. Please provide valid numeric values.')
    return undefined
  }

  const conversionRate =
    parseFloat(pricePayToken) / parseFloat(priceTokenReceive)

  const amountReceive = parseFloat(amountPayToken) * conversionRate

  return amountReceive.toFixed(3)
}
