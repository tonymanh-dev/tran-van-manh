import React, { Fragment } from 'react'
import { Token } from '../types'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { formatWithCommas } from '../utils'

interface Props {
  tokens: Token[]
  isOpen: boolean
  closeModal: () => void
  selectToken: (e: Token) => void
}
const TokenList = ({ tokens, isOpen, closeModal, selectToken }: Props) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm overflow-hidden " />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center pb-0 pt-20 sm:py-10">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex max-h-full min-h-[80%] w-full flex-col rounded-2xl rounded-b-none sm:min-h-[400px] sm:max-w-[450px] sm:rounded-b-3xl bg-slate-800">
                <div className="w-full p-6 space-y-4">
                  <div className=" flex items-center justify-between">
                    <h4 className="text-xl text-slate-300">Select a token</h4>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full border-none p-2 text-slate-300 hover:bg-slate-900 focus:outline-none transition-all -mr-2"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div>
                    <input
                      placeholder="Search by name, symbol ..."
                      className="w-full px-4 py-1 rounded-full bg-slate-900 outline-none border-none h-12 placeholder:text-slate-600 hover:ring-2 hover:ring-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="flex-1 h-full min-h-[100px] rounded-2xl p-4 overflow-y-auto">
                  {tokens.map((token) => (
                    <div
                      key={token.uuid}
                      onClick={() => selectToken(token)}
                      className="w-full max-w-md flex items-center justify-between hover:bg-slate-900 transition-all p-2 rounded-xl cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={token.iconUrl}
                          alt={token.name}
                          className="w-8 h-8 rounded-full object-contain"
                        />
                        <div>
                          <h4 className="uppercase text-xl">{token.symbol}</h4>
                          <p className="text-sm">{token.name}</p>
                        </div>
                      </div>
                      {token?.balance && (
                        <p>{formatWithCommas(token.balance)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default TokenList
