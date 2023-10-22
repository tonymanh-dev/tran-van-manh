import React, { useState } from 'react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import Button from './button'

type Active = 'swap' | 'order'

const Tabs = () => {
  const [active, setActive] = useState<Active>('swap')
  return (
    <div className="flex items-center justify-between -mt-2">
      <div className="-ml-4 relative flex w-fit items-center justify-center space-x-2 rounded-[10px] bg-transparent">
        <Button
          variants="ghost"
          className={`${active === 'swap' && 'text-primary'}`}
          onClick={() => setActive('swap')}
        >
          Swap
        </Button>
        <Button
          variants="ghost"
          className={`${active === 'order' && 'text-primary'}`}
          onClick={() => setActive('order')}
        >
          Order
        </Button>
      </div>
      <button className="border-none outline-none p-2 -mr-2 hover:text-slate-300 transition-colors">
        <AdjustmentsHorizontalIcon className="h-6 w-6" />
      </button>
    </div>
  )
}

export default Tabs
