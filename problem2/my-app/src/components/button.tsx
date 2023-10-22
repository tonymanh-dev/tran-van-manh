import React, { ReactNode } from 'react'
import { cn } from '../utils'
import { Loading } from './icons'

interface Props {
  children: ReactNode
  onClick?: () => void
  variants?: 'outline' | 'ghost'
  size?: 'sm' | 'lg'
  className?: string
  disabled?: boolean
  isLoading?: boolean
}

const Button = ({
  onClick,
  variants,
  size,
  className,
  children,
  disabled,
  isLoading,
}: Props) => {
  const styles = cn(
    'inline-flex items-center justify-center rounded-xl ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-75',
    variants
      ? variants === 'outline'
        ? 'border border-slate-600 hover:bg-slate-600 hover:text-white bg-transparent'
        : 'bg-transparent hover:text-primary '
      : 'bg-gradient-to-l from-fuchsia-500 to-indigo-500 text-white ',
    size ? (size === 'sm' ? 'h-9 px-3' : 'h-11 px-8') : 'h-10 px-4 py-2',
    className
  )
  return (
    <button
      disabled={disabled || isLoading}
      className={styles}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
