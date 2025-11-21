// 'use client';

// import { motion } from 'framer-motion';

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-gradient-to-b from-brand-1 via-brand-6/10 to-brand-10 text-brand-text">
//       {/* Hero Section */}
//       <section className="text-center py-20 px-6">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-5xl font-extrabold text-brand-7 mb-4"
//         >
//           Welcome to Web3 DApp
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="text-lg text-brand-muted max-w-xl mx-auto mb-8"
//         >
//           A next-generation decentralized application built for seamless wallet connectivity, 
//           asset management, and secure blockchain interaction — all in one place.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-brand-8 font-bold italic"
//         >
//           Click “Connect Wallet” on the Navbar to get started!
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-8 bg-white/20 backdrop-blur-md rounded-t-3xl">
//         <h2 className="text-3xl font-semibold text-center text-brand-7 mb-12">
//           Why Choose Our DApp?
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             { title: 'Secure Transactions', desc: 'All operations are verified on-chain, ensuring full transparency and trust.', icon: '🔒' },
//             { title: 'Multi-Chain Compatibility', desc: 'Effortlessly connect wallets from EVM and Solana networks.', icon: '🌐' },
//             { title: 'Lightning Fast', desc: 'Optimized architecture for blazing fast blockchain interactions.', icon: '⚡' },
//           ].map((feature, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.03 }}
//               className="bg-gradient-to-br from-brand- to-brand-6 rounded-2xl p-6 text-center border border-brand-2"
//             >
//               <div className="text-5xl mb-3">{feature.icon}</div>
//               <h3 className="text-xl font-bold text-brand-10 mb-2">{feature.title}</h3>
//               <p className="text-brand-muted">{feature.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-6 text-center">
//         <h2 className="text-3xl font-semibold text-brand-10 mb-10">Platform Highlights</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto  text-brand-10">
//           {[
//             { label: 'Active Users', value: '12.5K+' },
//             { label: 'Transactions', value: '48K+' },
//             { label: 'Wallets Supported', value: '50+' },
//             { label: 'Networks', value: '10+' },
//           ].map((stat, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white/20 rounded-2xl p-6 border border-white/30"
//             >
//               <p className="text-3xl font-bold text-brand-7">{stat.value}</p>
//               <p className="text-brand-muted text-sm mt-1">{stat.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <footer className="py-10 text-center text-brand-muted text-sm bg-brand-1/70 border-t border-brand-6/20">
//         <p>© {new Date().getFullYear()} DApp. All rights reserved.</p>
//       </footer>
//     </main>
//   );
// }

'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-brand-accentLight mb-4"
        >
          Welcome to Web3 DApp
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-brand-muted max-w-xl mx-auto mb-8"
        >
          Seamless wallet connectivity, secure blockchain interaction, and next-gen Web3 experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-brand-accent font-semibold italic"
        >
          Tap “Connect Wallet” to begin.
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-16 px-8 bg-brand-bgLight rounded-t-3xl border-t border-brand-surface">
        <h2 className="text-3xl font-semibold text-center text-brand-accentLight mb-12">
          Why Choose Our DApp?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Secure Transactions', desc: 'On-chain verified operations.', icon: '🔒' },
            { title: 'Multi-Chain Ready', desc: 'Compatible with EVM & Solana.', icon: '🌐' },
            { title: 'Fast Performance', desc: 'Optimized for speed.', icon: '⚡' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-brand-surface border border-brand-bgLight p-6 rounded-xl text-center"
            >
              <div className="text-5xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-brand-accentLight mb-2">{feature.title}</h3>
              <p className="text-brand-muted">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-brand-accentLight mb-10">
          Platform Highlights
        </h2>

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
              className="bg-brand-bgLight p-6 rounded-xl border border-brand-surface"
            >
              <p className="text-3xl font-bold text-brand-accentLight">{stat.value}</p>
              <p className="text-brand-muted mt-1 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-10 text-center text-brand-muted text-sm bg-brand-bgLight border-t border-brand-surface">
        <p>© {new Date().getFullYear()} DApp. All rights reserved.</p>
      </footer>
    </main>
  );
}
