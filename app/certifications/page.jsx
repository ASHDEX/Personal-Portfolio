export const metadata = {
  title: "Certifications | Jayesh Chaudhary",
  description:
    "15 professional security certifications including CISSP, CISM, CISA, CASP+, SC-100, AZ-500, SC-200, CySA+, PenTest+, CSA CCSK, and more.",
  openGraph: {
    title: "Certifications | Jayesh Chaudhary",
    description:
      "Verified credentials spanning security architecture, cloud security, detection engineering, and incident response.",
    url: "https://ashdex.me/certifications",
    type: "website",
  },
};

const credlyProfileUrl = "https://www.credly.com/users/jayesh-chaudhary.3248ecac";

const certTiers = [
  {
    tier: "Elite Security Credentials",
    accent: "var(--accent)",
    accentBg: "rgba(38,217,184,0.06)",
    accentBorder: "rgba(38,217,184,0.2)",
    certs: [
      {
        name: "CISSP",
        full: "Certified Information Systems Security Professional",
        issuer: "ISC2",
        relevance:
          "Proves broad capability in security architecture, governance, and risk-based decision-making for enterprise programs.",
      },
      {
        name: "CISM",
        full: "Certified Information Security Manager",
        issuer: "ISACA",
        relevance:
          "Demonstrates leadership in security program design, incident management, and operational governance alignment.",
      },
      {
        name: "CISA",
        full: "Certified Information Systems Auditor",
        issuer: "ISACA",
        relevance:
          "Validates control evaluation, audit-readiness, and assurance design for resilient security operations.",
      },
      {
        name: "CASP+",
        full: "CompTIA Advanced Security Practitioner",
        issuer: "CompTIA",
        relevance:
          "Advanced security architecture, enterprise risk management, and integration of enterprise security solutions.",
      },
    ],
  },
  {
    tier: "Microsoft Security Stack",
    accent: "var(--accent-2)",
    accentBg: "rgba(124,139,255,0.06)",
    accentBorder: "rgba(124,139,255,0.18)",
    certs: [
      {
        name: "SC-100",
        full: "Microsoft Cybersecurity Architect Expert",
        issuer: "Microsoft",
        relevance:
          "Design Zero Trust strategy and architecture across identity, endpoints, applications, network, and data.",
      },
      {
        name: "AZ-500",
        full: "Microsoft Azure Security Engineer",
        issuer: "Microsoft",
        relevance:
          "Implement and manage security controls, identity, and data protection across Azure cloud workloads.",
      },
      {
        name: "SC-200",
        full: "Microsoft Security Operations Analyst",
        issuer: "Microsoft",
        relevance:
          "Threat investigation and response using Microsoft Sentinel, Defender XDR, and cloud threat hunting.",
      },
      {
        name: "SC-300",
        full: "Microsoft Identity and Access Administrator",
        issuer: "Microsoft",
        relevance:
          "Design and implement Microsoft Entra ID, conditional access, and privileged identity management.",
      },
      {
        name: "SC-900",
        full: "Microsoft Security, Compliance, and Identity Fundamentals",
        issuer: "Microsoft",
        relevance: "Foundation of Microsoft security, compliance, and identity solutions.",
      },
    ],
  },
  {
    tier: "CompTIA & Operational Security",
    accent: "#94a3b8",
    accentBg: "rgba(148,163,184,0.05)",
    accentBorder: "rgba(148,163,184,0.15)",
    certs: [
      {
        name: "CySA+",
        full: "CompTIA Cybersecurity Analyst",
        issuer: "CompTIA",
        relevance:
          "Threat detection, monitoring, and incident response across the security operations lifecycle.",
      },
      {
        name: "PenTest+",
        full: "CompTIA PenTest+",
        issuer: "CompTIA",
        relevance:
          "Penetration testing, vulnerability assessment, and attack simulation methodologies.",
      },
      {
        name: "Security+",
        full: "CompTIA Security+",
        issuer: "CompTIA",
        relevance: "Core security fundamentals, threat management, and hands-on SOC operations.",
      },
      {
        name: "CFR-410",
        full: "CyberSec First Responder",
        issuer: "Logical Operations",
        relevance:
          "Incident response, threat analysis, and forensic investigation for security first responders.",
      },
    ],
  },
  {
    tier: "Cloud & Compliance",
    accent: "var(--accent-warm)",
    accentBg: "rgba(251,191,36,0.05)",
    accentBorder: "rgba(251,191,36,0.16)",
    certs: [
      {
        name: "CCSK V5",
        full: "Certificate of Cloud Security Knowledge V5",
        issuer: "Cloud Security Alliance",
        relevance:
          "Cloud security architecture, control frameworks, and shared responsibility in modern cloud environments.",
      },
      {
        name: "CCSK V4",
        full: "Certificate of Cloud Security Knowledge V4",
        issuer: "Cloud Security Alliance",
        relevance: "Previous generation cloud security standard — architectural foundations.",
      },
      {
        name: "Google IT",
        full: "Google IT Professional Certificate",
        issuer: "Google",
        relevance: "IT support, systems administration, and infrastructure fundamentals.",
      },
    ],
  },
];

export default function CertificationsPage() {
  return (
    <section className="space-y-8">
      <header>
        <h1 className="section-title">Certifications</h1>
        <p className="mt-3 muted text-sm">
          15 verified credentials spanning security architecture, cloud, detection engineering, and incident response.
        </p>
        <a
          className="mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
          href={`${credlyProfileUrl}/badges`}
          rel="noreferrer"
          target="_blank"
          style={{
            border: "1px solid rgba(38,217,184,0.4)",
            background: "rgba(38,217,184,0.07)",
            color: "var(--accent)",
          }}
        >
          Verify all on Credly →
        </a>
      </header>

      {certTiers.map((tier) => (
        <section key={tier.tier} className="space-y-3">
          <h2
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: tier.accent }}
          >
            {tier.tier}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {tier.certs.map((cert) => (
              <article
                key={cert.name}
                className="section-card space-y-2"
                style={{
                  borderColor: tier.accentBorder,
                  background: tier.accentBg,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-lg font-bold" style={{ color: tier.accent }}>
                      {cert.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                      {cert.full}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded px-2 py-0.5 font-mono text-xs"
                    style={{
                      border: `1px solid ${tier.accentBorder}`,
                      color: tier.accent,
                      background: "rgba(0,0,0,0.25)",
                    }}
                  >
                    {cert.issuer}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {cert.relevance}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
