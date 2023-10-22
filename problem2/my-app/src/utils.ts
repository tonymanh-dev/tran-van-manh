import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Token } from './types'

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

export const calculateInputValues = (
  payValue: string,
  receiveValue: string,
  payToken: Token | undefined,
  receiveToken: Token | undefined
) => {
  if (payToken && receiveToken) {
    // Calculate conversion rate of 2 tokens
    const spendToPayConversionRate =
      Number(receiveToken.price) / Number(payToken.price)
    const reveiveToPayConversionRate =
      Number(payToken.price) / Number(receiveToken.price)

    const inputPayValue = Number(receiveValue) * spendToPayConversionRate
    const inputReceiveValue = Number(payValue) * reveiveToPayConversionRate

    return {
      pay: inputPayValue.toFixed(2),
      receive: inputReceiveValue.toFixed(2),
    }
  }

  return { pay: payValue, receive: receiveValue }
}
