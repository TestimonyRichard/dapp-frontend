'use client'

import { createContext, useContext, useState } from 'react'

const WalletModalContext = createContext(null)

export function WalletModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <WalletModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </WalletModalContext.Provider>
  )
}

export function useWalletModal() {
  const ctx = useContext(WalletModalContext)
  if (!ctx) throw new Error('useWalletModal must be used inside WalletModalProvider')
  return ctx
}
