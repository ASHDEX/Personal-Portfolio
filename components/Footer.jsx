export default function Footer() {
  return (
    <footer
      className="backdrop-blur-sm"
      style={{
        borderTop: "1px solid rgba(38, 217, 184, 0.1)",
        background: "rgba(7, 8, 15, 0.7)",
      }}
    >
      <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-6 text-sm">
        <p style={{ color: "var(--ink-muted)" }}>
          © {new Date().getFullYear()} Jayesh Chaudhary. Built with Next.js App Router + Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/jayesh"
            target="_blank"
            rel="noreferrer"
            className="transition hover:-translate-y-0.5 hover:text-accent-glow"
            style={{ color: "var(--ink-muted)" }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Ashdex"
            target="_blank"
            rel="noreferrer"
            className="transition hover:-translate-y-0.5 hover:text-white"
            style={{ color: "var(--ink-muted)" }}
          >
            GitHub
          </a>
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(38, 217, 184, 0.4)" }}
          >
            ashdex.me
          </span>
        </div>
      </div>
    </footer>
  );
}
