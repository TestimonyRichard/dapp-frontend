export default function Features() {
  const features = [
    { title: 'Fast Wallet Connect', desc: 'Connect multiple wallets instantly.' },
  ];

  return (
    <section className="py-5 container mx-auto grid md:grid-cols-1 gap-5">
      {features.map(f => (
        <div key={f.title} className="p-8 bg-primary rounded-lg text-white">
          <h3 className="text-2xl font-bold mb-2">{f.title}</h3>
          <p className="opacity-80">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}
