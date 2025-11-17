// 'use client';
// import { useEffect, useRef } from 'react';
// import { useAccount, useChainId } from 'wagmi';

// export default function WalletNotifier() {
//   const { address, isConnected } = useAccount();
//   const chainId = useChainId();
//   const sentRef = useRef(false);

//   useEffect(() => {
//     if (!isConnected || !address || sentRef.current) return;

//     const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
//     if (!backend) {
//       console.error('❌ NEXT_PUBLIC_BACKEND_URL is not set');
//       return;
//     }

//     const payload = {
//       address,
//       chainId,
//       userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
//       ts: new Date().toISOString(),
//     };

//     const sendNotification = async () => {
//       try {
//         const res = await fetch(`${backend}/notify/wallet-connected`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//           const err = await res.text();
//           throw new Error(`Backend error: ${err}`);
//         }

//         sentRef.current = true;
//         console.log('✅ Wallet connection sent to backend');
//       } catch (err) {
//         console.error('❌ Failed to notify backend:', err);
//       }
//     };

//     sendNotification();
//   }, [isConnected, address, chainId]);

//   return null;
// }
