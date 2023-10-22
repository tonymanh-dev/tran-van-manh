import React from 'react'

interface Props {
  className: string
}
const Skeleton = ({ className }: Props) => {
  return (
    <div className={`bg-gray-600 animate-pulse rounded-lg ${className}`}></div>
  )
}

export default Skeleton
