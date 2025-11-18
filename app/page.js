'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F3F0FF] to-[#EEF2FF] text-[#334155]">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-[#6D28D9] mb-4"
        >
          Welcome to Web3 DApp
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-[#475569] max-w-xl mx-auto mb-8"
        >
          A next-generation decentralized application built for seamless wallet connectivity, 
          asset management, and secure blockchain interaction — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#4338CA] font-semibold italic"
        >
          Click “Connect Wallet” on the Navbar to get started!
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white/60 backdrop-blur-md rounded-t-3xl shadow-inner">
        <h2 className="text-3xl font-semibold text-center text-[#4338CA] mb-12">
          Why Choose Our DApp?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Secure Transactions',
              desc: 'All operations are verified on-chain, ensuring full transparency and trust.',
              icon: '🔒',
            },
            {
              title: 'Multi-Chain Compatibility',
              desc: 'Effortlessly connect wallets from EVM and Solana networks.',
              icon: '🌐',
            },
            {
              title: 'Lightning Fast',
              desc: 'Optimized architecture for blazing fast blockchain interactions.',
              icon: '⚡',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="panel-hero rounded-2xl shadow-md p-6 text-center border border-[#EDEBFF]"
            >
              <div className="text-5xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#6D28D9] mb-2">{feature.title}</h3>
              <p className="text-[#475569]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-[#6D28D9] mb-10">Platform Highlights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Active Users', value: '12.5K+' },
            { label: 'Transactions', value: '48K+' },
            { label: 'Wallets Supported', value: '50+' },
            { label: 'Networks', value: '10+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 rounded-2xl p-6 shadow-md border border-white/40"
            >
              <p className="text-3xl font-bold text-[#4338CA]">{stat.value}</p>
              <p className="text-[#64748B] text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-[#475569] text-sm footer-bg">
        <p>© {new Date().getFullYear()}  DApp . All rights reserved.</p>
      </footer>
    </main>
  );
}
