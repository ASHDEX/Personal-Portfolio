import Link from "next/link";

export const metadata = {
  title: "Jayesh Chaudhary | Lead Security Engineer — CISSP, CISM, CISA",
  description:
    "Jayesh Chaudhary — Lead Security Engineer at Payatu. CISSP, CISM, CISA. Security Architecture, Detection Engineering, Threat Intelligence Automation, and SOC Modernisation for enterprise teams.",
  openGraph: {
    title: "Jayesh Chaudhary | Security Architect & Engineer",
    description:
      "Architecture-first cybersecurity delivery — Detection Engineering, SOC Automation, Threat Intelligence, and Security Architecture.",
    url: "https://ashdex.me",
    type: "website",
  },
};

const certs = ["CISSP", "CISM", "CISA", "CASP+", "SC-100", "AZ-500"];

const valueProps = [
  { metric: "70–80%", label: "reduction in manual SOC triage" },
  { metric: "30%", label: "improvement in MITRE ATT&CK detection coverage" },
  { metric: "35%", label: "reduction in Mean Time to Contain" },
  { metric: "95%", label: "endpoint compliance in regulated environments" },
];

const skillGroups = [
  {
    label: "Detection & SIEM",
    skills: ["Microsoft Sentinel", "Splunk", "ArcSight", "CrowdStrike", "Wazuh", "Security Onion"],
  },
  {
    label: "Threat Intelligence",
    skills: ["OTX / VirusTotal", "MISP", "OpenCTI", "STIX / TAXII", "Maltego", "FreeIntelhub"],
  },
  {
    label: "Cloud Security",
    skills: ["Azure", "AWS", "GCP", "CloudTrail / IAM", "Logic Apps", "Defender for Cloud"],
  },
  {
    label: "Endpoint & DLP",
    skills: ["Microsoft Purview", "Intune", "Defender", "Trellix EPO", "Symantec", "Proofpoint"],
  },
  {
    label: "Frameworks",
    skills: ["MITRE ATT&CK", "MITRE D3FEND", "NIST CSF", "ISO 27001", "CMMI", "MITRE CAR"],
  },
  {
    label: "Languages & Automation",
    skills: ["Python", "KQL", "Docker", "TheHive", "Elastic", "JIRA / ServiceNow"],
  },
];

const systems = [
  "Security Architecture Design",
  "Detection Engineering",
  "Incident Response Engineering",
  "SOC Automation",
  "Threat Intelligence Automation",
];

const whoIWorkWith = [
  "FinTech & regulated environments",
  "Security teams modernising Microsoft security stacks",
  "Organisations preparing for audit & compliance reviews",
  "Teams scaling from reactive SOC to engineered detection",
];

const projects = [
  {
    title: "Security Architecture Design",
    stack: "Architecture Modernisation",
    summary: "Designed a layered SOC architecture integrating SIEM, EDR, identity telemetry, and response workflows.",
  },
  {
    title: "Detection Engineering Framework",
    stack: "Detection Uplift",
    summary: "Implemented ATT&CK-aligned detection lifecycle standards with measurable quality and tuning controls.",
  },
  {
    title: "SOC Automation Pipeline",
    stack: "Automation Buildout",
    summary: "Automated enrichment, triage, and case routing to reduce analyst workload and improve response speed.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="section-block">
        <div
          className="section-card"
          style={{
            background:
              "linear-gradient(135deg, rgba(38,217,184,0.07) 0%, rgba(13,17,32,0.85) 50%, rgba(124,139,255,0.07) 100%)",
            borderColor: "rgba(38,217,184,0.22)",
          }}
        >
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              {/* Availability badge */}
              <div className="mb-5 flex items-center gap-2.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
                />
                <span
                  className="font-mono text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  Open to Senior Security Roles
                </span>
              </div>

              {/* Identity */}
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">
                Lead Security Engineer · Payatu
              </p>
              <h1
                className="mt-2 text-4xl font-black sm:text-5xl lg:text-6xl"
                style={{ color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
              >
                Jayesh
                <br />
                Chaudhary
              </h1>

              {/* Cert badges */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {certs.map((c) => (
                  <span
                    key={c}
                    className="rounded px-2 py-0.5 font-mono text-xs font-semibold"
                    style={{
                      border: "1px solid rgba(38,217,184,0.28)",
                      color: "var(--accent)",
                      background: "rgba(38,217,184,0.06)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                I help security teams design resilient architectures, improve detection coverage, and automate
                incident response workflows — with measurable operational impact.
              </p>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    border: "1px solid rgba(38,217,184,0.55)",
                    background: "rgba(38,217,184,0.1)",
                    color: "var(--accent)",
                  }}
                >
                  View Case Studies
                </Link>
                <Link
                  href="/consulting"
                  className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    border: "1px solid rgba(124,139,255,0.45)",
                    background: "rgba(124,139,255,0.08)",
                    color: "#a5b0ff",
                  }}
                >
                  Discuss an Engagement
                </Link>
                <a
                  href="https://linkedin.com/in/jayesh"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--ink-muted)",
                  }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Ashdex"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--ink-muted)",
                  }}
                >
                  GitHub
                </a>
                {/* Resume — place your PDF at /public/resume.pdf to activate */}
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    border: "1px solid rgba(251,191,36,0.4)",
                    background: "rgba(251,191,36,0.07)",
                    color: "#fbbf24",
                  }}
                >
                  Download Resume
                </a>
              </div>
            </div>

            {/* Impact snapshot — right column */}
            <div className="space-y-3">
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--ink-muted)" }}
              >
                Impact Snapshot
              </p>
              {valueProps.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4"
                  style={{
                    border: "1px solid rgba(38,217,184,0.12)",
                    background: "rgba(13,17,32,0.7)",
                  }}
                >
                  <p
                    className="text-2xl font-black"
                    style={{ color: "var(--accent-warm)", fontVariantNumeric: "tabular-nums" }}
                  >
                    {item.metric}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug" style={{ color: "var(--ink-muted)" }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS GRID ── */}
      <section className="section-block">
        <div className="section-card">
          <h2 className="section-subtitle">Technical Skills & Tools</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
            7 years of hands-on delivery across detection, cloud, endpoint, and intelligence tooling.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-xl p-4"
                style={{ border: "1px solid rgba(38,217,184,0.1)", background: "rgba(13,17,32,0.6)" }}
              >
                <p
                  className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded px-2 py-1 text-xs"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                        color: "var(--ink-muted)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-block space-y-4">
        <h2 className="section-subtitle">Security Systems I Design</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {systems.map((service) => (
            <Link
              key={service}
              href="/services"
              className="section-card interactive-card block"
              style={{ borderColor: "rgba(38,217,184,0.15)" }}
            >
              <p className="font-semibold text-cyan-100">{service}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHO I WORK WITH ── */}
      <section className="section-block">
        <div className="section-card">
          <h2 className="section-subtitle">Who I Work With</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {whoIWorkWith.map((item) => (
              <article
                key={item}
                className="rounded-xl p-4"
                style={{ border: "1px solid rgba(38,217,184,0.12)", background: "rgba(13,17,32,0.6)" }}
              >
                <p className="text-sm text-slate-200 sm:text-base">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="section-block space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="section-subtitle">Selected Projects</h2>
          <Link href="/projects" className="text-sm font-semibold text-cyan-300 hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href="/projects"
              className="section-card interactive-card block"
              style={{ borderColor: "rgba(38,217,184,0.15)" }}
            >
              <p className="text-sm font-semibold text-cyan-300">{project.stack}</p>
              <h3 className="mt-1 text-lg font-bold text-cyan-100">{project.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CREDIBILITY ── */}
      <section className="section-block">
        <div className="section-card">
          <h2 className="section-subtitle">Credibility</h2>
          <p className="mt-3 text-sm text-slate-200">
            <span className="font-semibold text-cyan-300">Elite certifications:</span>{" "}
            CISSP · CISM · CISA · CASP+ · SC-100 · AZ-500 · SC-200 · CySA+ · PenTest+ and more.
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Cloud security: CSA CCSK V4 & V5 · CompTIA Security+ · CyberSec First Responder CFR-410
          </p>
          <p className="mt-3 text-sm text-slate-200">
            <span className="font-semibold text-cyan-300">Focus areas:</span>{" "}
            Security Architecture · Detection Engineering · Cloud IR · SOC Automation · Threat Intelligence
          </p>
          <div className="mt-4">
            <Link href="/certifications" className="text-sm font-semibold text-cyan-300 hover:underline">
              View all 15 certifications →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-block">
        <div
          className="section-card"
          style={{
            borderColor: "rgba(124,139,255,0.28)",
            background:
              "linear-gradient(135deg, rgba(124,139,255,0.08) 0%, rgba(13,17,32,0.85) 60%, rgba(38,217,184,0.08) 100%)",
          }}
        >
          <h2 className="text-2xl font-bold text-white">Looking to modernise your security operations?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(38,217,184,0.55)",
                background: "rgba(38,217,184,0.1)",
                color: "var(--accent)",
              }}
            >
              View Case Studies
            </Link>
            <Link
              href="/consulting"
              className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(124,139,255,0.45)",
                background: "rgba(124,139,255,0.08)",
                color: "#a5b0ff",
              }}
            >
              Discuss an Engagement
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(251,191,36,0.4)",
                background: "rgba(251,191,36,0.07)",
                color: "#fbbf24",
              }}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
