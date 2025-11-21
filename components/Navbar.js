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
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 15 }}
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-accentLight">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          style={{ filter: "hue-rotate(-300deg)" }}
          className="opacity-90"
        />
        <span>DApp Portal</span>
      </Link>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
          className="btn-primary"
        >
          Connect Wallet
        </motion.button>

      </div>
    </motion.nav>
  );
}
