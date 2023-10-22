import React, { useState, useEffect } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

import Skeleton from './skeleton'

type GeneratedValues = {
  gasFee: string
  priceImpact: string
}

type InformationProps = {
  label: string
  value: string | null | undefined
  calculating: boolean
}

type InforToken = { symbol?: string; value?: string }

interface Props {
  receiveToken?: InforToken
  showValue?: boolean
  recalculate?: boolean
}
const Information = ({ label, value, calculating }: InformationProps) => (
  <div className="flex justify-between items-center text-sm ">
    <div className="flex items-center space-x-2 min-h-[24px]">
      <span className="">{label}</span>
      <InformationCircleIcon className="w-4 h-4" />
    </div>
    {calculating ? (
      <Skeleton className="h-4 w-10 my-1" />
    ) : (
      <span className="text-slate-200 font-medium">{value || '--'}</span>
    )}
  </div>
)

const Footer = ({ receiveToken, showValue, recalculate }: Props) => {
  const [calculating, setCalculating] = useState<boolean>(false)
  const [generatedValues, setGeneratedValues] = useState<GeneratedValues>({
    gasFee: '',
    priceImpact: '',
  })

  //Replace this logic with real data from other API
  useEffect(() => {
    setGeneratedValues({ gasFee: '', priceImpact: '' })

    if (showValue) {
      setCalculating(true)

      setTimeout(() => {
        const priceImpact = (Math.random() * (0.09 - 0.01) + 0.01)
          .toFixed(2)
          .toString()
        const gasFee = (Math.random() * (12 - 0.5) + 0.5).toFixed(2).toString()
        setGeneratedValues({ gasFee, priceImpact })
        setCalculating(false)
      }, 1000)
    }
  }, [showValue, recalculate])

  return (
    <div className=" bg-slate-900 mt-10 space-y-2">
      <h4 className="text-slate-400 font-medium pb-2">More information</h4>

      <Information
        label="Minimum receive"
        value={`${receiveToken?.value} ${receiveToken?.symbol}`}
        calculating={calculating}
      />
      <Information
        label="Price Impact"
        value={generatedValues.priceImpact}
        calculating={calculating}
      />
      <Information
        label="Estimated Gas Fee"
        value={generatedValues.gasFee}
        calculating={calculating}
      />
    </div>
  )
}

export default Footer
