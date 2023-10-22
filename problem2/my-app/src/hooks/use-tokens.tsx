import { useEffect, useState } from 'react'
import { Token } from '../types'
import { updatedTokenBalance } from '../utils'

const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  // Define the URL and options for the coin data API from https://rapidapi.com/
  // In this case get 20 coins
  const url =
    'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=20&offset=0'
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2c5da9d3d1msh49811ae1164755ep1d8547jsnb282acfeb01f',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    },
  }
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const js = await res.json()
      const updatedBalance: Token[] = js?.data?.coins.map((coin: Token) => {
        return { ...coin, balance: updatedTokenBalance(coin.symbol) }
      })

      setTokens(updatedBalance)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(error as Error)
      setLoading(false)
    }
  }

  // Fetch data only on the first render
  useEffect(() => {
    fetchData()
  }, [])

  return { tokens, loading, error }
}
export default useTokens
