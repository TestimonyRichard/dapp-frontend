'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useConnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WalletSection() {
  const { connectors, connectAsync, isPending } = useConnect();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch wallet list dynamically
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await fetch(
          'https://explorer-api.walletconnect.com/v3/wallets?projectId=f135ca3627ea9e19cc8be1721b2837bd'
        );

        if (!res.ok) throw new Error('Failed to fetch wallets');
        const data = await res.json();

        // Safely access listings and limit to 40 most popular wallets
        const walletList = Object.values(data.listings || {})
          .slice(0, 40)
          .map((wallet) => ({
            id: wallet.id,
            name: wallet.name,
            image: wallet.image_url.md,
            homepage: wallet.homepage,
          }));

        setWallets(walletList);
      } catch (err) {
        console.error('Error fetching wallets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  // ✅ Handle connect
  const handleConnect = async (walletName) => {
    const connector = connectors.find((c) =>
      c.name.toLowerCase().includes(walletName.toLowerCase())
    );

    if (!connector) {
      alert(`Connector not found for ${walletName}`);
      return;
    }

    try {
      await connectAsync({ connector });
      alert(`✅ Connected successfully with ${walletName}`);
    } catch (err) {
      console.error(`❌ Error connecting ${walletName}:`, err);
      alert(`Failed to connect ${walletName}. Try again.`);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100 text-gray-800 flex flex-col items-center py-12">
      <h2 className="text-4xl font-bold text-sky-700 mb-10 drop-shadow-sm">
        Connect Your Wallet
      </h2>

      {/* 🌀 Loading shimmer */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl px-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-32 bg-sky-100 animate-pulse rounded-2xl"
            ></div>
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl px-6"
        >
          {wallets.map((wallet) => (
            <motion.button
              key={wallet.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleConnect(wallet.name)}
              disabled={isPending}
              className="flex flex-col items-center justify-center p-4 rounded-2xl backdrop-blur-lg bg-white/70 hover:bg-white shadow-md hover:shadow-lg border border-sky-100 transition-all duration-200"
            >
              <div className="w-16 h-16 relative mb-3">
                <Image
                  src={wallet.image}
                  alt={wallet.name}
                  fill
                  className="object-contain rounded-xl"
                  unoptimized
                />
              </div>
              <span className="font-medium text-sky-800 text-center text-sm">
                {wallet.name}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Manual Fallback */}
      <div className="mt-10 text-center">
        <ConnectButton showBalance={false} chainStatus="none" />
        <p className="text-gray-500 text-sm mt-3">
          Having issues? Try connecting manually.
        </p>
      </div>
    </section>
  );
}
