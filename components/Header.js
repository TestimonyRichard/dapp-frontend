'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-900 border-b border-gray-800 shadow-md">
      <h1 className="text-2xl font-bold text-white tracking-wide">
        My Dapp
      </h1>
      <div>
        <ConnectButton
          showBalance={false}
          accountStatus="address"
          chainStatus="icon"
        />
      </div>
    </header>
  );
}
