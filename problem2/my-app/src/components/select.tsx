import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Skeleton from './skeleton'
import { Token } from '../types'

interface Props {
  onClick: () => void
  token?: Token
  loading?: boolean
}

const Select = ({ loading, token, onClick, ...props }: Props) => {
  return (
    <div className="px-2">
      {loading ? (
        <Skeleton className="h-8 w-20" />
      ) : (
        <button
          className="flex min-w-fit items-center space-x-2 h-12 px-2 sm:px-4 bg-slate-900 text-sm font-medium rounded-lg hover:bg-slate-900/75 text-slate-300 hover:text-slate-200 transition-all border-none outline-none "
          onClick={onClick}
          {...props}
        >
          <>
            <img
              src={token?.iconUrl || './logo192.png'}
              alt="coins"
              className="w-6 h-6 rounded-full object-contain"
            />
            <span
              className="whitespace-nowrap uppercase
            "
            >
              {token?.symbol ? token.symbol : 'Select token'}
            </span>
            <span>
              <ChevronDownIcon className="w-4 h-4" />
            </span>
          </>
        </button>
      )}
    </div>
  )
}

export default Select
