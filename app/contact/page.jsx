export default function ContactPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <article className="section-card space-y-3 text-sm text-slate-700">
        <p>Interested in collaborating or hiring? Reach out directly.</p>
        <p>
          Email: <a className="font-semibold text-teal-700 hover:underline" href="mailto:hello@example.com">hello@example.com</a>
        </p>
        <p>
          LinkedIn: <a className="font-semibold text-teal-700 hover:underline" href="https://linkedin.com" target="_blank" rel="noreferrer">linkedin.com/in/ashdex</a>
        </p>
        <p>
          GitHub: <a className="font-semibold text-teal-700 hover:underline" href="https://github.com/ASHDEX" target="_blank" rel="noreferrer">github.com/ASHDEX</a>
        </p>
      </article>
    </section>
  );
}
