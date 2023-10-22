import React from 'react'
import { Toaster } from 'react-hot-toast'
import Nav from './components/nav'
import Swap from './components/swap-form'

function App() {
  return (
    <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#141d34] via-slate-900 to-slate-900 min-h-screen w-full pb-32">
      <Nav />
      <Swap />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#1e293b',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

export default App
