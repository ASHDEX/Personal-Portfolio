import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="section-card bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-teal-100">Portfolio</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Ashdex</h1>
        <p className="mt-3 max-w-2xl text-teal-50">
          Full-stack developer focused on high-performance web applications, clear UX,
          and production-grade delivery.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/projects" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700">
            View Projects
          </Link>
          <Link href="/contact" className="rounded-full border border-white px-4 py-2 text-sm font-semibold text-white">
            Contact Me
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="section-card">
          <h2 className="text-lg font-bold">What I Build</h2>
          <p className="mt-2 text-sm text-slate-600">Scalable web apps, internal tools, and polished user-facing products.</p>
        </article>
        <article className="section-card">
          <h2 className="text-lg font-bold">How I Work</h2>
          <p className="mt-2 text-sm text-slate-600">Fast iterations, clean architecture, and strong focus on maintainability.</p>
        </article>
        <article className="section-card">
          <h2 className="text-lg font-bold">Current Focus</h2>
          <p className="mt-2 text-sm text-slate-600">Next.js, performance optimization, and end-to-end product development.</p>
        </article>
      </section>
    </div>
  );
}
