export default function PageShell({ title, subtitle, children }) {
  return (
    <main className="mx-auto w-[min(100%-2rem,1100px)] py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
      {subtitle && <p className="mt-3 max-w-3xl text-slate-600">{subtitle}</p>}
      <section className="mt-8">{children}</section>
    </main>
  );
}
