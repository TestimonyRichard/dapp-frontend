'use client';
import { useAccount } from 'wagmi';

export default function WalletPage() {
  const { address, isConnected } = useAccount();

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#EEF2FF] to-[#EDEBFF] flex flex-col items-center justify-center text-center px-2">
      <h1 className="text-4xl font-bold text-[#6D28D9] mb-4">Connect Your Wallet</h1>

      <div className="bg-white/80 shadow-lg rounded-2xl p-8 mb-8 w-full max-w-sm">
        {/* Wallet modal or content */}
      </div>

      {isConnected && (
        <div className="mt-8 bg-white/80 rounded-xl shadow-md p-6 w-full max-w-sm">
          <p className="text-[#059669] font-medium">Connected Wallet:</p>
          <code className="text-[#4338CA] text-sm break-all">{address}</code>
        </div>
      )}
    </section>
  );
}
