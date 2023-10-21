// @ts-nocheck

interface WalletBalance {
  currency: string
  amount: number
  // Refactored: Add 'blockchain' property
  blockchain: string
}

// Extend the WalletBalance interface to add the 'formatted' property
interface FormattedWalletBalance extends WalletBalance {
  formatted: string
}

// Refactored: Define children as type ReactNode to hold any React element
interface Props {
  children: ReactNode
  // Add any additional props if needed
}

// Destructuring props
const WalletPage = ({ children, ...rest }: Props) => {
  const balances = useWalletBalances()
  const prices = usePrices()

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      // Combine case with same output
      case 'Zilliqa':
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // 1. Issue: 'blockchain' not exist in WalletBalnce
        // 2. Refactored: Add 'blockchain' property above
        const balancePriority = getPriority(balance.blockchain)

        // 1. Issue: a value 'lhsPriority' is not defined
        //   if (lhsPriority > -99) {
        //     if (balance.amount <= 0) {
        //       return true;
        //     }
        //  }
        // 2. Refactored: Use 'balancePriority' instead
        // and simplified filter condition using logical operators
        return balancePriority > -99 && balance.amount >= 0
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)

        // Refactored: Sort array in descending order of priority
        return rightPriority - leftPriority
      })
  }, [balances, prices])

  //Refactored:  Use object literal shorthand
  const formattedBalances: FormattedWalletBalance = sortedBalances.map(
    (balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    })
  )

  // 1. Issue: 'sortedBalances' has no 'formatted' property
  // 2. Refactored: Use "formattedBalances" instead
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }
  )

  return <div {...rest}>{rows}</div>
}
