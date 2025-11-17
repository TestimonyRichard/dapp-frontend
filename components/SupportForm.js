// 'use client';
// import { useState } from 'react';
// import { useAccount } from 'wagmi';

// export default function SupportForm() {
//   const { address } = useAccount();
//   const [form, setForm] = useState({ name: '', email: '', message: '' });
//   const [status, setStatus] = useState('');

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
//     try {
//       const res = await fetch(`${backend}/notify/support`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...form, address }),
//       });
//       setStatus(res.ok ? '✅ Message sent!' : '❌ Failed to send.');
//     } catch {
//       setStatus('⚠️ Error sending message.');
//     }
//   };

//   return (
//     <section className="py-10 bg-gradient-to-b from-sky-50 to-blue-100  min-h-screen">
//       <div className="container mx-auto max-w-lg bg-white rounded-3xl p-10">
//         <form onSubmit={handleSubmit} className="flex flex-col gap-10">
//           <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-3 rounded-lg border border-blue-200 focus:ring focus:ring-sky-300" />
//           <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-3 rounded-lg border border-blue-200 focus:ring focus:ring-sky-300" />
//           <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="p-3 rounded-lg border border-blue-200 focus:ring focus:ring-sky-300 h-32" />
//           <button type="submit" className="btn-primary">Send</button>
//         </form>
//         {status && <p className="mt-4 text-center text-blue-700">{status}</p>}
//       </div>
//     </section>
//   );
// }
