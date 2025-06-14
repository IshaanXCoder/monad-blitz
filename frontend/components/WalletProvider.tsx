"use client"
import { WagmiConfig } from "wagmi"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'viem'
import { mainnet } from 'wagmi/chains'
import '@rainbow-me/rainbowkit/styles.css'
import React from 'react'

const config = getDefaultConfig({
  appName: 'WalletTherapist',
  projectId: process.env.NEXT_PUBLIC_CLOUD_PROJECT_ID || '',
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
} 