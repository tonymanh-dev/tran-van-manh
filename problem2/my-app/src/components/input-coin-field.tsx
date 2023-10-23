import React from 'react'
import { WalletIcon } from '@heroicons/react/24/outline'
import Select from './select'
import { formatWithCommas, getUSDPrice } from '../utils'
import { Token, SelectTypes } from '../types'

interface InputFieldProps {
  name: 'pay' | 'receive'
  value?: string
  token?: Token
  loading?: boolean
  onOpenTokenList: (e: SelectTypes) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({
  name,
  value,
  token,
  loading,
  onChange,
  onOpenTokenList,
}: InputFieldProps): JSX.Element => {
  return (
    <div>
      <div className="flex justify-between w-full text-sm mb-2">
        <label className=" text-slate-500">
          {name === 'pay' ? 'Spend' : 'Receive (estimated)'}
        </label>
        <div className="flex items-center space-x-2">
          <WalletIcon className="w-4 h-4" />

          <p>{formatWithCommas(token?.balance)}</p>
        </div>
      </div>
      <div className="w-full h-16 flex items-center justify-between bg-slate-800 rounded-xl hover:ring-1 hover:ring-primary focus:ring-1 focus:ring-primary hover:shadow-color-sm">
        <div className="flex-1">
          <input
            type="text"
            onChange={onChange}
            name={name}
            value={value}
            pattern="^[0-9]*[.,]?[0-9]*$"
            inputMode="decimal"
            placeholder="0.0"
            className="w-full py-1 px-4 rounded-3xl bg-transparent text-2xl font-medium placeholder:text-slate-600 text-slate-50 focus-visible:outline-none select-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {value && (
            <p className="text-xs pl-4 pb-2">
              ~ ${getUSDPrice(value.toString(), token?.price)}
            </p>
          )}
        </div>
        <Select
          token={token}
          loading={loading}
          onClick={() => onOpenTokenList(name)}
        />
      </div>
    </div>
  )
}

export default InputField
