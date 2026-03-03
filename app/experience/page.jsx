export const metadata = {
  title: "Experience | ASHDEX Cybersecurity",
  description:
    "Security Architecture, Detection Engineering, Cloud Incident Response, and Threat Intelligence Automation delivery across enterprise environments.",
  openGraph: {
    title: "Experience | ASHDEX",
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
      "Led fintech security engagements spanning data protection, detection engineering, IR, and SOC enablement.",
      "Delivered Microsoft Purview DLP across ~400 endpoints and 15+ data sources with 10+ custom SITs and 25+ DLP policies, improving classification accuracy by ~40% and reducing business-impacting violations by ~30%.",
      "Deployed Defender, Intune, and Wazuh with 30+ security/compliance policies achieving 95% endpoint compliance.",
      "Built 30+ MITRE ATT&CK-mapped Sentinel queries improving detection coverage by ~30%.",
      "Led active breach response reducing MTTC by ~35%.",
      "Designed full incident management program including severity models, escalation matrices, and playbooks (~40% SOC readiness improvement).",
      "Delivered audit-ready artifacts enabling 100% closure of audit observations.",
    ],
    stack: ["Microsoft Sentinel", "Defender", "Intune", "Purview", "Wazuh", "Azure", "Python", "KQL", "OTX", "VirusTotal"],
  },
  {
    title: "Cloud Incident Response",
    company: "Coralogix — Gurugram, HR",
    period: "Sep 2024 – May 2025",
    focus: ["Cloud Detection Engineering", "IAM Security", "Automated Containment", "Cloud IR"],
    bullets: [
      "Reduced MTTD by 40% by engineering detections across CloudTrail, IAM, and VPC telemetry.",
      "Decreased MTTR by 35% via automated containment playbooks isolating compromised IAM identities.",
      "Led response for high-severity IAM compromise and storage exposure incidents.",
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
      "Proactively blocked high-risk domains.",
    ],
  },
  {
    title: "Graduate Engineer Trainee",
    company: "CRMNext — Mumbai, MH",
    period: "April 2021 – Aug 2021",
    bullets: [
      "Managed CRM systems improving data accuracy.",
      "Improved email campaign engagement by 20%.",
      "Led CRM migrations with minimal disruption.",
    ],
  },
  {
    title: "Analyst — Detection & Response",
    company: "",
    period: "April 2019 – Mar 2021",
    bullets: [
      "Designed and tuned EDM/regex-based DLP policies.",
      "Reduced false positives and improved triage efficiency.",
      "Conducted DLP reviews and policy improvements.",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <section className="space-y-10 py-24">
      <header className="section-card border-slate-700/70 bg-surface-900/80">
        <h1 className="section-title">Experience</h1>
        <p className="mt-4 text-sm text-slate-300 sm:text-base">
          Security Architecture · Detection Engineering · Cloud Incident Response · Threat Intelligence Automation
        </p>
      </header>

      <div className="relative space-y-8 before:absolute before:bottom-0 before:left-5 before:top-0 before:w-px before:bg-slate-700/80 md:before:left-1/2 md:before:-translate-x-1/2">
        {roles.map((role) => (
          <article key={`${role.title}-${role.period}`} className="relative grid gap-5 md:grid-cols-2 md:gap-8">
            <div className="md:pr-10 md:text-right">
              <div className="rounded-2xl border border-slate-700/80 bg-surface-900/85 p-6">
                <h2 className="text-2xl font-bold text-slate-100">{role.title}</h2>
                {role.company ? <p className="mt-2 text-sm text-slate-300">{role.company}</p> : null}
                <p className="mt-2 text-sm font-semibold text-cyan-200">{role.period}</p>

                {role.focus?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                    {role.focus.map((item) => (
                      <span key={item} className="rounded-full border border-slate-600 bg-surface-800/80 px-3 py-1 text-xs font-medium text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}

                {role.stack?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                    {role.stack.map((item) => (
                      <span key={item} className="rounded-full border border-slate-600 bg-surface-800/80 px-3 py-1 text-xs font-medium text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="md:pl-10">
              <div className="rounded-2xl border border-slate-700/80 bg-surface-900/85 p-6">
                <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-200 sm:text-base">
                  {role.bullets.map((point) => (
                    <li key={point}>
                      {point
                        .replace(/70–80%|95%|30\+|\~40%|\~30%|\~35%|100%|40%|35%|25%|15%|20%|7,000\+/g, (metric) => `[[${metric}]]`)
                        .split(/(\[\[[^\]]+\]\])/g)
                        .filter(Boolean)
                        .map((chunk) => {
                          if (chunk.startsWith("[[") && chunk.endsWith("]]")) {
                            const value = chunk.slice(2, -2);
                            return (
                              <strong key={`${point}-${value}`} className="font-semibold text-cyan-200">
                                {value}
                              </strong>
                            );
                          }
                          return <span key={`${point}-${chunk}`}>{chunk}</span>;
                        })}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <span className="absolute left-5 top-8 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-slate-900 bg-cyan-300 md:left-1/2" />
          </article>
        ))}
      </div>
    </section>
  );
}
