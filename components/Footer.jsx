export default function Footer() {
  return (
    <footer className="border-t border-cyan-400/20 bg-surface-950/70 backdrop-blur">
      <div className="page-shell py-6 text-sm text-slate-300">
        <p>© {new Date().getFullYear()} ASHDEX. Built with Next.js App Router + Tailwind CSS.</p>
      </div>
    </footer>
  );
}
