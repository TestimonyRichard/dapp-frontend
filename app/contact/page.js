'use client';
import SupportForm from '@/components/SupportForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6">Contact Admin</h1>
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-lg">
        <SupportForm />
      </div>
    </main>
  );
}
