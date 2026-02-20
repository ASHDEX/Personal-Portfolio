export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="page-shell py-6 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Ashdex. Built with Next.js + Tailwind CSS.</p>
      </div>
    </footer>
  );
}
