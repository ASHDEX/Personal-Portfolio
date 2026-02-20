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
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-teal-700">
          Ashdex
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-full px-3 py-1.5 text-slate-700 transition hover:bg-teal-100 hover:text-teal-800"
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
