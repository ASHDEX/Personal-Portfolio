export const metadata = {
  title: "Experience | Jayesh Chaudhary — Lead Security Engineer",
  description:
    "7 years of security engineering across Detection Engineering, Cloud Incident Response, Insider Threat, DLP, and Security Architecture at Payatu, Coralogix, and Bank of America.",
  openGraph: {
    title: "Experience | Jayesh Chaudhary",
    description:
      "Timeline of architecture-first security outcomes across incident response, detection engineering, DLP, and SOC modernization.",
    url: "https://ashdex.me/experience",
    type: "website",
  },
};

const roles = [
  {
    title: "Lead Security Engineer",
    company: "Payatu — Gurugram, HR",
    period: "May 2025 – Present",
    bullets: [
      "Built end-to-end threat intelligence automation aggregating 50+ RSS sources with auto-categorization and full-text search, reducing manual triage by 70–80%.",
      "Automated IOC enrichment (IPs, domains, hashes) using AlienVault OTX and VirusTotal with concurrent scoring for faster SOC/IR investigations.",
      "Developed bulk domain intelligence tooling and large-scale website snapshot → PDF reporting for DFIR evidence documentation.",
      "Implemented Microsoft Teams → Azure Logic Apps → SharePoint workflows enabling near real-time advisory reporting.",
      "Led multiple fintech security engagements spanning data protection, detection engineering, IR, and SOC enablement.",
      "Developed MSRPC-specific alerts to identify unauthorized access attempts, reducing missed detections by 20%.",
      "Delivered Microsoft Purview DLP across ~400 endpoints and 15+ data sources with 10+ custom SITs and 25+ DLP policies, improving classification accuracy by ~40% and reducing business-impacting violations by ~30%.",
      "Deployed Defender, Intune, and Wazuh with 30+ security/compliance policies achieving 95% endpoint compliance.",
      "Built 30+ MITRE ATT&CK-mapped Sentinel queries improving detection coverage by ~30%.",
      "Led active breach response reducing MTTC by ~35%.",
      "Designed full incident management program including severity models, escalation matrices, and playbooks (~40% SOC readiness improvement).",
      "Delivered audit-ready artifacts enabling 100% closure of data protection and incident response audit observations.",
    ],
    stack: ["Microsoft Sentinel", "Defender", "Intune", "Purview", "Wazuh", "Azure", "Python", "KQL", "OTX", "VirusTotal"],
  },
  {
    title: "Cloud Incident Response Engineer",
    company: "Coralogix — Gurugram, HR",
    period: "Sep 2024 – May 2025",
    focus: ["Cloud Detection Engineering", "IAM Security", "Automated Containment", "Cloud IR"],
    bullets: [
      "Reduced MTTD by 40% by engineering detections across CloudTrail, IAM, and VPC telemetry.",
      "Decreased MTTR by 35% via automated containment playbooks isolating compromised IAM identities.",
      "Led end-to-end response for high-severity IAM compromise and storage exposure incidents.",
      "Enforced least-privilege IAM guardrails improving cloud posture by 25%.",
      "Built 30+ MITRE ATT&CK (Cloud) use cases reducing false positives by 30%.",
    ],
    stack: ["CloudTrail", "IAM", "VPC", "MITRE ATT&CK (Cloud)", "Automation Playbooks"],
  },
  {
    title: "Insider Threat Management Officer",
    company: "Bank of America — Gurugram, HR",
    period: "Sep 2023 – Sep 2024",
    focus: ["Insider Threat Detection", "DLP", "Threat Intelligence", "Monitoring Engineering"],
    bullets: [
      "Implemented alerts detecting DNS/HTTPS-based exfiltration.",
      "Built password spray long-duration detection logic.",
      "Created detection for Windows tampering and steganography tools.",
      "Reduced insider incidents by 25% via threat intelligence integration.",
      "Reduced IR time by 30% through playbooks & runbooks.",
      "Reduced false positives by 15%.",
      "Created SOPs for stakeholder escalation and control engagement.",
    ],
  },
  {
    title: "Cyber Security Analyst",
    company: "Bank of America — Gurugram, HR",
    period: "Sep 2021 – Aug 2023",
    bullets: [
      "Monitored malicious activity and blocked high-risk IPs/domains.",
      "Prevented data exfiltration by banning access for 7,000+ users.",
      "Proactively blocked high-risk domains with high data exfiltration risk.",
    ],
  },
  {
    title: "Graduate Engineer Trainee",
    company: "CRMNext — Mumbai, MH",
    period: "April 2021 – Aug 2021",
    bullets: [
      "Managed CRM systems improving data accuracy, leading to 15% increase in customer satisfaction.",
      "Designed email campaigns achieving 20% increase in open rates.",
      "Led CRM migrations with minimal business disruption.",
    ],
  },
  {
    title: "Analyst — Detection & Response",
    company: "",
    period: "April 2019 – Mar 2021",
    bullets: [
      "Designed and tuned EDM/regex-based DLP detection policies.",
      "Reduced false positives and improved analyst triage efficiency.",
      "Conducted periodic DLP policy reviews and user guidance.",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <section className="space-y-10 py-24">
      <header className="section-card">
        <h1 className="section-title">Experience</h1>
        <p className="mt-4 text-sm sm:text-base" style={{ color: "var(--ink-muted)" }}>
          Security Architecture · Detection Engineering · Cloud Incident Response · Threat Intelligence Automation
        </p>
      </header>

      <div className="relative space-y-8">
        {/* Teal vertical connector */}
        <div
          className="absolute bottom-0 left-5 top-0 w-px md:left-1/2 md:-translate-x-px"
          style={{ background: "rgba(38,217,184,0.2)" }}
        />

        {roles.map((role) => (
          <article key={`${role.title}-${role.period}`} className="relative grid gap-5 md:grid-cols-2 md:gap-8">
            {/* Left — role info */}
            <div className="md:pr-10 md:text-right">
              <div
                className="rounded-xl p-6 backdrop-blur-sm"
                style={{ border: "1px solid var(--line-soft)", background: "var(--panel)" }}
              >
                <h2 className="text-xl font-bold" style={{ color: "var(--ink)" }}>
                  {role.title}
                </h2>
                {role.company ? (
                  <p className="mt-1.5 text-sm" style={{ color: "var(--ink-muted)" }}>
                    {role.company}
                  </p>
                ) : null}
                <p className="mt-1.5 font-mono text-sm font-semibold" style={{ color: "var(--accent)" }}>
                  {role.period}
                </p>

                {(role.focus ?? role.stack)?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5 md:justify-end">
                    {(role.focus ?? role.stack).map((item) => (
                      <span
                        key={item}
                        className="rounded px-2 py-1 font-mono text-xs"
                        style={{
                          border: "1px solid var(--line-soft)",
                          background: "rgba(13,17,32,0.7)",
                          color: "var(--ink-muted)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Right — bullets */}
            <div className="md:pl-10">
              <div
                className="rounded-xl p-6 backdrop-blur-sm"
                style={{ border: "1px solid var(--line-soft)", background: "var(--panel)" }}
              >
                <ul className="space-y-2.5 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {role.bullets.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }}>›</span>
                      <span>
                        {point
                          .replace(/70–80%|~?40%|~?30%|~?35%|~?20%|95%|100%|25%|15%|30\+|7,000\+|50\+|400/g, (m) => `[[${m}]]`)
                          .split(/(\[\[[^\]]+\]\])/g)
                          .filter(Boolean)
                          .map((chunk, j) =>
                            chunk.startsWith("[[") ? (
                              <strong key={j} style={{ color: "var(--accent-warm)", fontWeight: 700 }}>
                                {chunk.slice(2, -2)}
                              </strong>
                            ) : (
                              <span key={j}>{chunk}</span>
                            )
                          )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Teal timeline dot */}
            <span
              className="absolute left-5 top-8 h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 0 3px #07080f, 0 0 0 5px rgba(38,217,184,0.35)",
              }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
