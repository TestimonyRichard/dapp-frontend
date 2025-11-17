// // app/providers.js
// 'use client';

// import '@rainbow-me/rainbowkit/styles.css';
// import { getDefaultConfig, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
// import { WagmiConfig } from 'wagmi';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import * as chains from 'wagmi/chains'; // we will select many
// import { WalletModalProvider } from './context/WalletModalContext';
// import { Toaster } from 'react-hot-toast';

// // build an array of chains (most default chains)
// const includedChains = [
//   chains.mainnet,
//   chains.sepolia,
//   chains.goerli,
//   chains.polygon,
//   chains.optimism,
//   chains.arbitrum,
//   chains.fantom,
//   chains.avalanche,
//   chains.bsc, // if available in your wagmi version
// ].filter(Boolean);

// const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

// const config = getDefaultConfig({
//   appName: 'My DApp',
//   projectId,
//   chains: includedChains
// });

// const queryClient = new QueryClient();

// export function Providers({ children }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <WagmiConfig config={config}>
//         <RainbowKitProvider
//           modalSize="compact"
//           theme={lightTheme({
//             accentColor: '#38bdf8',
//             accentColorForeground: 'white',
//             borderRadius: 'large',
//             overlayBlur: 'small'
//           })}
//         >
//           <WalletModalProvider>
//             {children}
//             <Toaster position="top-right" />
//           </WalletModalProvider>
//         </RainbowKitProvider>
//       </WagmiConfig>
//     </QueryClientProvider>
//   );
// }

'use client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia, polygon, bsc, arbitrum, optimism, avalanche } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { walletConnectProvider } from '@walletconnect/ethereum-provider';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '7a793c5a4406b350bea1f892405f8626';
const { wallets, connectors } = getDefaultWallets({
  appName: 'My Dapp',
  projectId,
});

const config = createConfig({
  connectors,
  chains: [mainnet, sepolia, polygon, bsc, arbitrum, optimism, avalanche],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [avalanche.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" chains={[mainnet, sepolia, polygon, bsc, arbitrum, optimism, avalanche]}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
