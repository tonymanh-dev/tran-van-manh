export type SelectTypes = 'pay' | 'receive' | null

export interface Token {
  uuid: string
  symbol: string
  name: string
  iconUrl: string
  price: string
  balance?: number
}
