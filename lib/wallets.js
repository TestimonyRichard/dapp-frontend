// frontend/lib/wallets.js
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
  braveWallet,
  argentWallet,
  rainbowWallet
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '7a793c5a4406b350bea1f892405f8626';

export const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains: [mainnet, sepolia] }),
      coinbaseWallet({ appName: 'My Dapp', chains: [mainnet, sepolia] }),
      walletConnectWallet({ projectId, chains: [mainnet, sepolia] }),
      rainbowWallet({ projectId, chains: [mainnet, sepolia] }),
      injectedWallet({ chains: [mainnet, sepolia] }),
    ],
  },
  {
    groupName: 'Other',
    wallets: [
      braveWallet({ chains: [mainnet, sepolia] }),
      argentWallet({ projectId, chains: [mainnet, sepolia] }),
    ],
  },
]);
