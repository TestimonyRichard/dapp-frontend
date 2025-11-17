'use client';

import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWalletModal } from '@/app/context/WalletModalContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const { openModal } = useWalletModal();

  return (
    <motion.nav
      className="navbar shadow-glow"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 90, damping: 15 }}
    >
      <Link href="/" className="flex items-center gap-2 text-sky-700 font-bold text-xl">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} className="drop-shadow-md" />
        <span className="text-gradient">DApp Portal</span>
      </Link>

    

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
          className="btn-primary shadow-glow"
        >
          Connect Wallet
        </motion.button>
       

        <ConnectButton
          showBalance={false}
          chainStatus="none"
          label="Manual Connect"
        />
      </div>
    </motion.nav>
  );
}
