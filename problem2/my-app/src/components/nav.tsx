import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const navLinks = [
  { title: 'Swap', link: '/' },
  { title: 'Pool', link: '/' },
  { title: 'Stake', link: '/' },
]

const Nav = () => {
  return (
    <nav className="w-full z-10 max-w-7xl mx-auto sticky top-0 inset-x-0 backdrop-blur-sm">
      <div className="h-16 w-full px-4 sm:px-8 sticky top-0">
        <div className="hidden sm:flex items-center justify-between h-full w-full">
          <div className="flex items-center space-x-4">
            {navLinks.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="p-2 hover:text-slate-300 transition-all"
              >
                {item.title}
              </a>
            ))}
          </div>
          <div>
            <button
              type="button"
              className="flex items-center space-x-2 hover:bg-slate-700 transition-colors outline-none hover:text-slate-200 border border-slate-700 rounded-xl px-4 py-2"
            >
              <img
                src="https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
                alt="eth"
                className="w-6 h-6 object-contain"
              />
              <span>Ethereum</span>
              <span>
                <ChevronDownIcon className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
