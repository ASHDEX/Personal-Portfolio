import Link from "next/link";

const pages = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-cyan-400/20 bg-surface-950/80 backdrop-blur-xl">
      <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-black tracking-tight text-cyan-200">
          ASHDEX<span className="text-accent-glow">.SEC</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-full border border-transparent px-3 py-1.5 text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-cyan-200"
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
