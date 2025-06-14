// context/TransactionContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type TransactionResponse = any // Replace with actual type if available

type TransactionContextType = {
  response: TransactionResponse | null
  setResponse: (data: TransactionResponse) => void
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [response, setResponse] = useState<TransactionResponse | null>(null)

  return (
    <TransactionContext.Provider value={{ response, setResponse }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransaction = () => {
  const context = useContext(TransactionContext)
  if (!context) throw new Error("useTransaction must be used within a TransactionProvider")
  return context
}
