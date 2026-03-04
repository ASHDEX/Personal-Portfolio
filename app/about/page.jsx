export const metadata = {
  title: "About Jayesh Chaudhary | Security Architect",
  description:
    "Jayesh Chaudhary — CISSP, CISM, CISA. Lead Security Engineer with 7 years specialising in Security Architecture, Detection Engineering, and Threat Intelligence Automation.",
  openGraph: {
    title: "About Jayesh Chaudhary | ASHDEX",
    description:
      "Architecture-first security engineer focused on systems design, detection engineering, and resilient SOC operations.",
    url: "https://ashdex.me/about",
    type: "profile",
  },
};

const workingPrinciples = [
  "Detection-first: every control should improve real detection or response outcomes.",
  "Automation over repetition: remove manual bottlenecks before scaling teams.",
  "Evidence-driven engineering: tune using telemetry quality, precision, and analyst feedback loops.",
  "Operational clarity: ship playbooks and runbooks with every technical implementation.",
];

const architecturePhilosophy = [
  "Risk-aligned architecture",
  "Defence-in-depth design",
  "Detection-driven engineering",
  "Cloud-native security principles",
  "Control maturity alignment",
];

const quickFacts = [
  { label: "Current Role", value: "Lead Security Engineer · Payatu" },
  { label: "Location", value: "Gurugram, Haryana, India" },
  { label: "Experience", value: "7 years in security engineering & operations" },
  { label: "Top Certs", value: "CISSP · CISM · CISA · CASP+ · SC-100" },
  { label: "Email", value: "hello@ashdex.me" },
  { label: "Side Project", value: "FreeIntelhub — open threat intelligence platform" },
];

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <h1 className="section-title">About</h1>

      {/* Identity card */}
      <article
        className="section-card"
        style={{
          borderColor: "rgba(38,217,184,0.2)",
          background:
            "linear-gradient(135deg, rgba(38,217,184,0.06) 0%, rgba(13,17,32,0.85) 100%)",
        }}
      >
        <h2
          className="text-3xl font-black"
          style={{ color: "var(--ink)", letterSpacing: "-0.03em" }}
        >
          Jayesh Chaudhary
        </h2>
        <p className="mt-1 font-mono text-sm" style={{ color: "var(--accent)" }}>
          CISSP · CISM · CISA · CASP+ · SC-100
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
          Security engineer with 7 years of hands-on delivery across detection engineering, threat intelligence
          automation, cloud incident response, and enterprise DLP. I build security systems that generate measurable
          outcomes — not just compliance checkboxes. Currently leading security engineering at Payatu and building
          FreeIntelhub as an open threat intelligence platform.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-lg px-3 py-2.5"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(13,17,32,0.6)",
              }}
            >
              <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                {fact.label}
              </p>
              <p className="mt-1 text-xs" style={{ color: "var(--ink-muted)" }}>
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="section-card space-y-4 text-sm muted">
        <h2 className="text-xl font-bold text-cyan-100">Mission</h2>
        <p>
          I design security architectures that connect identity, telemetry, detection logic, and response workflows into
          resilient systems with measurable operational impact.
        </p>
      </article>

      <article className="section-card space-y-4 text-sm muted">
        <h2 className="text-xl font-bold text-cyan-100">Engineering Philosophy</h2>
        <p>
          I approach security as a systems engineering problem. Architecture decisions should define where trust boundaries
          exist, how telemetry is generated, and how detections flow into repeatable response outcomes.
        </p>
        <p>
          My work spans security architecture, detection-as-code, automation pipelines, and incident response
          engineering — always grounded in clear design principles and practical SOC execution.
        </p>
      </article>

      <article className="section-card space-y-4 text-sm muted">
        <h2 className="text-xl font-bold text-cyan-100">Working Principles</h2>
        <ul className="list-disc space-y-2 pl-5">
          {workingPrinciples.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="section-card space-y-4 text-sm muted">
        <h2 className="text-2xl font-black text-cyan-100">Security Architecture Philosophy</h2>
        <p className="text-base font-semibold text-cyan-200">Security should be built, not just audited.</p>
        <ul className="grid gap-2 md:grid-cols-2">
          {architecturePhilosophy.map((item) => (
            <li
              key={item}
              className="rounded-lg px-3 py-2 text-sm"
              style={{
                border: "1px solid rgba(38,217,184,0.15)",
                background: "rgba(13,17,32,0.6)",
                color: "var(--ink-muted)",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
