export default function Footer() {
  return (
    <footer
      className="backdrop-blur-sm"
      style={{
        borderTop: "1px solid rgba(38, 217, 184, 0.1)",
        background: "rgba(7, 8, 15, 0.7)",
      }}
    >
      <div className="page-shell flex flex-wrap items-center justify-between gap-3 py-6 text-sm">
        <p style={{ color: "var(--ink-muted)" }}>
          © {new Date().getFullYear()} ASHDEX. Built with Next.js App Router + Tailwind CSS.
        </p>
        <span
          className="font-mono text-xs"
          style={{ color: "rgba(38, 217, 184, 0.45)" }}
        >
          ashdex.me
        </span>
      </div>
    </footer>
  );
}
