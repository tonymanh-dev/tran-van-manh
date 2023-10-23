import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import Tabs from './tabs'
import Footer from './footer'
import Button from './button'
import TokenList from './token-list'
import useTokens from '../hooks/use-tokens'
import InputField from './input-coin-field'
import { Token, SelectTypes } from '../types'
import { calculateConversionRate, checkNumericValue } from '../utils'

const SwapForm = () => {
  const [isOpenTokenList, setIsOpenTokenList] = useState(false)
  const [type, setType] = useState<SelectTypes>()
  const [inputPay, setInputPay] = useState<string>('')
  const [inputReceive, setInputReceive] = useState<string>('')

  const [payToken, setPayToken] = useState<Token>()
  const [receiveToken, setReceiveToken] = useState<Token>()
  const [isSwapping, setIsSwapping] = useState<boolean>(false)

  const { tokens, loading, error } = useTokens()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: SelectTypes
  ) => {
    const { value } = e.target

    if (!checkNumericValue(value)) {
      toast.error('Invalid input. Please enter a valid numeric value.', {
        duration: 2000,
      })
      return
    }

    if (inputType === 'pay') {
      setInputPay(value)
      const conversion = calculateConversionRate(
        value,
        payToken?.price,
        receiveToken?.price
      )
      setInputReceive(conversion ?? '')
    } else if (inputType === 'receive') {
      setInputReceive(value)
      const conversion = calculateConversionRate(
        value,
        receiveToken?.price,
        payToken?.price
      )
      setInputPay(conversion ?? '')
    }
  }

  const handleOpenTokenList = (type: SelectTypes) => {
    setType(type)
    setIsOpenTokenList(true)
  }

  // Handle the selection of a token. This function updates state "payToken" and "receiveToken"
  // based on the selected token and the input type ("pay" or "receive")
  const handleSelectToken = (token: Token) => {
    if (type === 'pay' && token?.symbol === receiveToken?.symbol) {
      // Swap token
      setPayToken(token)
      setReceiveToken(payToken)
      setInputPay(inputReceive)
      setInputReceive(inputPay)
    } else if (type === 'pay') {
      setPayToken(token)
      // Recalculate conversion
      const conversion = calculateConversionRate(
        inputPay,
        token?.price,
        receiveToken?.price
      )
      setInputReceive(conversion ?? '')
    } else if (type === 'receive' && token.symbol === payToken?.symbol) {
      // Swap token
      setReceiveToken(token)
      setPayToken(receiveToken)
      setInputPay(inputReceive)
      setInputReceive(inputPay)
    } else if (type === 'receive') {
      setReceiveToken(token)
      // Recalculate conversion
      const conversion = calculateConversionRate(
        inputReceive,
        token?.price,
        receiveToken?.price
      )

      setInputPay(conversion ?? '')
    }
    setIsOpenTokenList(false)
  }

  // Swap tokens and input values
  const handleSwapInput = () => {
    setReceiveToken(payToken)
    setPayToken(receiveToken)
    setInputPay(inputReceive)
    setInputReceive(inputPay)
  }

  // Handle show status success after 2 sec to indicate for sending data to backend
  const handleSwap = () => {
    setIsSwapping(true)
    // Replace this logic with real data from an API.
    setTimeout(() => {
      toast.success(
        <div>
          <p>Transaction successfully!</p>
          <p className="hover:underline cursor-pointer text-primary text-xs mt-1">
            View on explorer
          </p>
        </div>
      )
      setIsSwapping(false)
      setInputPay('')
      setInputReceive('')
    }, 2000)
  }

  // Init token value as input form
  useEffect(() => {
    setPayToken(tokens[1])
    setReceiveToken(tokens[2])
  }, [tokens])

  return (
    <>
      <div className="grid items-center p-4">
        <div className="max-w-lg w-full mx-auto ">
          <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-color-lg ">
            <Tabs />
            {!loading && error ? (
              <div className="text-red-500 text-sm h-20 flex items-center justify-center">
                {error?.message.toString() ||
                  'Something went wrong. Please try again!'}
              </div>
            ) : (
              <div className="pt-6">
                <div>
                  <InputField
                    value={inputPay}
                    name="pay"
                    token={payToken}
                    loading={loading}
                    onChange={(e) => handleInputChange(e, 'pay')}
                    onOpenTokenList={(type) => handleOpenTokenList(type)}
                  />
                  <div className="w-fit mx-auto py-2">
                    <button
                      onClick={handleSwapInput}
                      className="hover:text-primary hover:bg-slate-900 transition-colors p-2 rounded-full"
                    >
                      <ArrowsUpDownIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <InputField
                    value={inputReceive}
                    name="receive"
                    token={receiveToken}
                    loading={loading}
                    onChange={(e) => handleInputChange(e, 'receive')}
                    onOpenTokenList={(type) => handleOpenTokenList(type)}
                  />
                </div>
              </div>
            )}
            <div className="pt-10">
              <Button
                disabled={inputPay && inputReceive ? false : true}
                isLoading={isSwapping}
                className="w-full h-14 rounded-xl hover:opacity-75"
                onClick={handleSwap}
              >
                Swap
              </Button>
            </div>
            <Footer
              showValue={inputPay && inputReceive ? true : false}
              recalculate={isOpenTokenList}
              receiveToken={{
                symbol: receiveToken?.symbol,
                value: inputReceive,
              }}
            />
          </div>
        </div>
        {/* Modal show list of tokens to swap*/}
        <TokenList
          isOpen={isOpenTokenList}
          closeModal={() => setIsOpenTokenList(false)}
          tokens={tokens}
          selectToken={(coin: Token) => handleSelectToken(coin)}
        />
      </div>
    </>
  )
}

export default SwapForm
