'use client';

import { useAccount } from 'wagmi';

export default function WalletPage() {
  const { address, isConnected } = useAccount();

  return (
    <section className="min-h-screen bg-gradient-to-br from-brand-1 to-brand-10 flex flex-col items-center justify-center text-center px-2">
      <h1 className="text-4xl font-bold text-brand-7 mb-4">Connect Your Wallet</h1>

      <div className="bg-white/20 rounded-2xl p-8 mb-8 w-full max-w-sm border border-brand-3">
        {/* Wallet Connect Modal can go here */}
      </div>

      {isConnected && (
        <div className="mt-8 bg-white/20 rounded-xl p-6 w-full max-w-sm border border-brand-3">
          <p className="text-brand-7 font-medium">Connected Wallet:</p>
          <code className="text-brand-6 text-sm break-all">{address}</code>
        </div>
      )}
    </section>
  );
}
