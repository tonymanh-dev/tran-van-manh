import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import Tabs from './tabs'
import Footer from './footer'
import Button from './button'
import TokenList from './token-list'
import useTokens from '../hooks/use-tokens'
import InputField from './input-coin-field'
import { Token, InputTypes } from '../types'
import { calculateInputValues } from '../utils'

interface InputProps {
  pay: string
  receive: string
}

const SwapForm = () => {
  const [isOpenTokenList, setIsOpenTokenList] = useState(false)
  const [type, setType] = useState<InputTypes>()
  const [input, setInput] = useState<InputProps>({ pay: '', receive: '' })

  const [payToken, setPayToken] = useState<Token>()
  const [receiveToken, setReceiveToken] = useState<Token>()
  const [isSwapping, setIsSwapping] = useState<boolean>(false)

  const { tokens, loading, error } = useTokens()

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Validate the input using a regex pattern
    if (!value.match(/^[0-9]*[.,]?[0-9]*$/)) {
      return
    }

    setInput((prevInput) => {
      // Create a new object to avoid mutating the previous state
      const newInput = { ...prevInput }

      if (name === 'pay') {
        newInput.pay = value
        const { receive } = calculateInputValues(
          value,
          newInput.receive,
          payToken,
          receiveToken
        )
        newInput.receive = receive
      } else if (name === 'receive') {
        newInput.receive = value
        const { pay } = calculateInputValues(
          newInput.pay,
          value,
          payToken,
          receiveToken
        )
        newInput.pay = pay
      }
      return newInput
    })
  }

  const handleOpenTokenList = (type: 'pay' | 'receive' | null) => {
    setType(type)
    setIsOpenTokenList(true)
  }

  // Handle the selection of a token. This function updates the "payToken" and "receiveToken"
  // based on the selected token and the input type ("pay" or "to")
  const handleSelectToken = (token: Token) => {
    if (type === 'pay' && token?.symbol === receiveToken?.symbol) {
      // Swap "payToken" and "receiveToken"
      setPayToken(token)
      setReceiveToken(payToken)

      // It should be recalculate conversion rate
      setInput({ pay: input.receive, receive: input.pay })
    } else if (type === 'pay') {
      setPayToken(token)
    } else if (type === 'receive' && token.symbol === payToken?.symbol) {
      // Swap "receiveToken" and "payToken"
      setReceiveToken(token)
      setPayToken(receiveToken)

      // It should be recalculate conversion rate
      setInput({ pay: input.receive, receive: input.pay })
    } else if (type === 'receive') {
      setReceiveToken(token)
    }
    setIsOpenTokenList(false)
  }

  // Swap tokens and input values
  const handleSwapInput = () => {
    setReceiveToken(payToken)
    setPayToken(receiveToken)
    setInput({ pay: input.receive, receive: input.pay })
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
      setInput({ pay: '', receive: '' })
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
                    value={input.pay}
                    name="pay"
                    token={payToken}
                    loading={loading}
                    onChange={handleOnChangeInput}
                    onOpenTokenList={(e) => handleOpenTokenList(e)}
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
                    value={input.receive}
                    name="receive"
                    token={receiveToken}
                    loading={loading}
                    onChange={handleOnChangeInput}
                    onOpenTokenList={(e) => handleOpenTokenList(e)}
                  />
                </div>
              </div>
            )}
            <div className="pt-10">
              <Button
                disabled={input.pay && input.receive ? false : true}
                isLoading={isSwapping}
                className="w-full h-14 rounded-xl hover:opacity-75"
                onClick={handleSwap}
              >
                Swap
              </Button>
            </div>
            <Footer
              showValue={input.pay && input.receive ? true : false}
              recalculate={isOpenTokenList}
              receiveToken={{
                symbol: receiveToken?.symbol,
                value: input?.receive,
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
