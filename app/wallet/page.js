// 'use client';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useAccount } from 'wagmi';

// export default function WalletPage() {
//   const { address, isConnected } = useAccount();

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex flex-col items-center justify-center text-center px-6">
//       <h1 className="text-4xl font-bold text-blue-700 mb-4">Connect Your Wallet</h1>
//       <p className="text-blue-800 mb-8 text-lg max-w-md">
//         Securely connect your crypto wallet below. If automatic connection fails, you’ll be prompted manually.
//       </p>

//       <div className="bg-white shadow-lg rounded-2xl p-8">
//         <ConnectButton showBalance={false} chainStatus="icon" />
//       </div>

//       {isConnected && (
//         <div className="mt-8 bg-white rounded-xl shadow-md p-6">
//           <p className="text-blue-800 font-medium">Connected Wallet:</p>
//           <code className="text-blue-600 text-sm break-all">{address}</code>
//         </div>
//       )}
//     </section>
//   );
// }

'use client';
// import WalletConnectModal from '@/components/WalletConnectModal';
import { useAccount } from 'wagmi';

export default function WalletPage() {
  const { address, isConnected } = useAccount();

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-500 flex flex-col items-center justify-center text-center px-2">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Connect Your Wallet</h1>

      <div className="bg-primary shadow-lg rounded-2xl p-8 mb-8 w-full max-w-sm">
        {/* <WalletConnectModal /> */}
      </div>

      {isConnected && (
        <div className="mt-8 bg-primary rounded-xl shadow-md p-6 w-full max-w-sm">
          <p className="text-blue-800 font-medium">Connected Wallet:</p>
          <code className="text-blue-600 text-sm break-all">{address}</code>
        </div>
      )}
    </section>
  );
}
