import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import WalletProvider from "../components/WalletProvider"
import { TransactionProvider } from "@/components/TransactionContext"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "WalletTherapist - Get Rekt by AI",
  description:
    "Connect your wallet and get absolutely demolished by our AI therapist. We'll roast your bags harder than the market.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TransactionProvider><WalletProvider>{children}</WalletProvider></TransactionProvider>
      </body>
    </html>
  )
}
