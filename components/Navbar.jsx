import Link from 'next/link';

const links = [
  ['Home', '/'],
  ['Projects', '/projects'],
  ['Services', '/services'],
  ['Experience', '/experience'],
  ['Certifications', '/certifications'],
  ['About', '/about'],
  ['Contact', '/contact']
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-[min(100%-2rem,1100px)] flex-wrap items-center justify-between gap-3 py-4">
        <Link href="/" className="text-sm font-bold tracking-tight text-slate-900">
          Jayesh Chaudhary
        </Link>
        <ul className="flex flex-wrap gap-1 text-sm text-slate-600">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="rounded-full px-3 py-1.5 hover:bg-slate-100 hover:text-slate-900">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
