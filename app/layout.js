'use client'

import Navbar from '@/components/Navbar'; 
import WalletModal from '@/components/WalletModal';
import './globals.css';
import { WagmiProvider, createConfig, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WalletModalProvider } from './context/WalletModalContext'
import { mainnet, polygon, bsc, arbitrum, optimism, base } from '@wagmi/chains'
import '@rainbow-me/rainbowkit/styles.css'

// ✅ Create Query Client
const queryClient = new QueryClient()

// ✅ Use getDefaultConfig directly (NO createConfig wrapper!)
const config = getDefaultConfig({
  appName: 'My DApp',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, polygon, bsc, arbitrum, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <WalletModalProvider>
                <Navbar/>
                <WalletModal/>
                {children}
              </WalletModalProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
