"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { href: "/home", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/consulting", label: "Consulting" },
  { href: "/services", label: "Services" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) => {
    return pathname === href || (href !== "/home" && pathname?.startsWith(href));
  };

  return (
    <header
      className="sticky top-0 z-20 backdrop-blur-xl"
      style={{
        borderBottom: "1px solid rgba(38, 217, 184, 0.14)",
        background: "rgba(7, 8, 15, 0.85)",
      }}
    >
      <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          aria-label="ASHDEX home"
          className="font-mono text-base font-bold tracking-tight"
          style={{ color: "var(--accent)", letterSpacing: "-0.01em" }}
        >
          ASHDEX
          <span style={{ color: "var(--accent-2)", opacity: 0.85 }}>.SEC</span>
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1.5 text-sm font-medium">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={`rounded-lg px-3 py-1.5 ${isActive(page.href) ? "nav-link-active" : "nav-link"}`}
              aria-current={isActive(page.href) ? "page" : undefined}
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
