import Link from "next/link";

export const metadata = {
  title: "Jayesh Chaudhary — Security Architect",
  description:
    "CISSP · CISM · CISA. Security Architecture, Detection Engineering, SOC Automation, and Threat Intelligence.",
};

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jayesh-chaudhary-cissp-cism-cisa-5b563519b/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:kh4r4nshu@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/ASHDEX",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <div
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4"
      style={{ background: "#07080f" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(38,217,184,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Atmospheric glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 15% 0%, rgba(38,217,184,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 85% 0%, rgba(124,139,255,0.09) 0%, transparent 55%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-medium tracking-widest uppercase"
          style={{
            border: "1px solid rgba(38,217,184,0.3)",
            background: "rgba(38,217,184,0.06)",
            color: "var(--accent, #26d9b8)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: "var(--accent, #26d9b8)" }}
          />
          Available for engagements
        </div>

        {/* Name */}
        <div>
          <h1
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            style={{ color: "#f0f4ff", fontFamily: "var(--font-space)" }}
          >
            Jayesh Chaudhary
          </h1>
          <p
            className="mt-3 font-mono text-base sm:text-lg"
            style={{ color: "var(--accent, #26d9b8)" }}
          >
            Security Architect &amp; Detection Engineer
          </p>
          <p className="mt-2 text-sm" style={{ color: "rgba(180,190,220,0.6)" }}>
            CISSP · CISM · CISA · CASP+ · SC-100
          </p>
        </div>

        {/* Browser mockup */}
        <div
          className="w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
          style={{
            border: "1px solid rgba(38,217,184,0.2)",
            background: "rgba(13,17,32,0.8)",
            boxShadow: "0 0 60px rgba(38,217,184,0.08), 0 32px 64px rgba(0,0,0,0.5)",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(7,8,15,0.8)",
            }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
            <div
              className="mx-auto flex items-center gap-2 rounded-md px-3 py-1 text-xs font-mono"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              ashdex.me
            </div>
          </div>

          {/* Mockup preview — hero section replica */}
          <div className="px-8 py-10 text-left">
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--accent, #26d9b8)" }}
            >
              Lead Security Engineer · Payatu
            </p>
            <h2
              className="mt-3 text-2xl font-bold leading-snug"
              style={{ color: "#e8eeff" }}
            >
              Building security systems<br />
              that <span style={{ color: "var(--accent, #26d9b8)" }}>actually work</span>.
            </h2>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "rgba(180,190,220,0.55)" }}
            >
              7+ years engineering detection, threat intel automation,<br />
              and SOC operations for enterprise environments.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Detection Engineering", "Threat Intel", "SOC Automation", "Security Architecture"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs font-mono"
                  style={{
                    background: "rgba(38,217,184,0.08)",
                    border: "1px solid rgba(38,217,184,0.2)",
                    color: "rgba(38,217,184,0.8)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/home"
            className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: "var(--accent, #26d9b8)",
              color: "#07080f",
              boxShadow: "0 0 20px rgba(38,217,184,0.3)",
            }}
          >
            View Full Portfolio →
          </Link>
          <a
            href="mailto:kh4r4nshu@gmail.com"
            className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: "1px solid rgba(38,217,184,0.35)",
              color: "rgba(240,244,255,0.85)",
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-5">
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="flex items-center gap-1.5 text-xs transition-colors duration-150 hover:text-white"
              style={{ color: "rgba(180,190,220,0.45)" }}
            >
              {icon}
              <span className="font-mono">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
