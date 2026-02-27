import Link from "next/link";

export const metadata = {
  title: "Services | ASHDEX Cybersecurity",
  description:
    "Productized cybersecurity consulting services across detection engineering, DFIR readiness, CTI automation, and security architecture.",
  openGraph: {
    title: "Services | ASHDEX",
    description:
      "Engineering-first services for SOC modernization, detection coverage, incident response readiness, and automation outcomes.",
    url: "https://ashdex.me/services",
    type: "website",
  },
};

const services = [
  {
    name: "Security Architecture Design & Modernization",
    audience: "Organizations building or restructuring their security stack.",
    includes: [
      "Architecture blueprint (SIEM, EDR, CTI, SOAR-lite)",
      "Detection coverage mapping",
      "IR severity & escalation model",
      "Tool integration strategy",
      "Architecture diagrams",
      "Runbooks",
    ],
    outcomes: [
      "Cohesive security ecosystem",
      "Reduced blind spots",
      "Faster containment",
      "Audit-ready governance",
    ],
  },
  {
    name: "Detection Engineering Sprint (2–4 Weeks)",
    audience: "SOC teams with logs but weak detections",
    includes: [
      "Log source review",
      "MITRE ATT&CK–mapped detection rules (Sigma/SIEM)",
      "Threat hunting queries",
      "False-positive tuning",
    ],
    outcomes: ["Higher-fidelity alerts", "Improved ATT&CK coverage"],
  },
  {
    name: "Incident Response Engineering",
    audience: "Teams improving readiness and containment consistency",
    includes: [
      "IR playbooks & severity models",
      "DFIR tooling setup",
      "Evidence collection workflows",
      "Tabletop exercise (optional)",
    ],
    outcomes: ["Faster MTTC", "Consistent response processes"],
  },
  {
    name: "SOC Automation",
    audience: "Teams drowning in manual triage",
    includes: [
      "IOC enrichment automation",
      "Alert triage workflows",
      "Reporting automation (e.g., Teams → Azure Logic Apps → SharePoint)",
    ],
    outcomes: ["Reduced manual work", "Faster investigations"],
  },
  {
    name: "Threat Intelligence Automation",
    audience: "Teams overwhelmed by feeds",
    includes: [
      "CTI feed ingestion (RSS/APIs)",
      "Deduplication, enrichment, scoring",
      "Export to SIEM/Slack/Excel",
    ],
    outcomes: ["Actionable CTI", "Less noise, more signal"],
  },
];

const process = [
  {
    step: "Discover",
    description:
      "Assess current telemetry, tooling, detection coverage, and incident workflows to identify operational gaps.",
  },
  {
    step: "Design",
    description:
      "Define an engineering plan with architecture, detection/automation priorities, and measurable delivery outcomes.",
  },
  {
    step: "Build",
    description:
      "Implement detections, automations, IR workflows, and integrations with iterative tuning and stakeholder alignment.",
  },
  {
    step: "Operationalize",
    description:
      "Deploy workflows into day-to-day SOC operations with tuning loops, ownership models, and measurable KPIs.",
  },
  {
    step: "Knowledge Transfer",
    description:
      "Provide runbooks, architecture context, and team enablement sessions to ensure long-term operational continuity.",
  },
];

const proofPoints = [
  "Built ATT&CK-mapped detections",
  "Automated CTI pipelines & SOC workflows",
  "Led cloud IR engagements",
  "Certifications: CISSP, CISM, CISA",
];

export default function ServicesPage() {
  return (
    <section className="space-y-6">
      <header className="section-card">
        <h1 className="section-title">Services</h1>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          Engineering-first security services for detection, IR, and automation.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.name}
            className="section-card flex flex-col border-cyan-300/25 transition hover:border-cyan-300/45 hover:bg-cyan-300/5"
          >
            <h2 className="text-lg font-bold text-cyan-100">{service.name}</h2>
            <p className="mt-2 text-sm text-slate-300">
              <span className="font-semibold text-cyan-300">For:</span> {service.audience}
            </p>

            <div className="mt-4">
              <p className="text-sm font-semibold text-cyan-300">What’s Included</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-200">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-cyan-300">Typical Outcomes</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-200">
                {service.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="mt-5 inline-flex w-fit rounded-full border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
            >
              Contact Me
            </Link>
          </article>
        ))}
      </section>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">How Engagements Work</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {process.map((item) => (
            <article key={item.step} className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-300">{item.step}</p>
              <p className="mt-2 text-sm text-slate-200">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">Proof Points</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {proofPoints.map((point) => (
            <span
              key={point}
              className="rounded-full border border-violet-300/35 bg-violet-300/10 px-3 py-1.5 text-xs font-semibold text-violet-100 sm:text-sm"
            >
              {point}
            </span>
          ))}
        </div>
      </section>

      <section className="section-card border-violet-300/35 bg-gradient-to-r from-violet-400/15 via-surface-900/80 to-cyan-400/15">
        <h2 className="text-2xl font-bold text-white">Want to improve detections or automate your SOC?</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
          >
            Contact Me
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-violet-300/55 bg-violet-300/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-300/20"
          >
            View Projects
          </Link>
        </div>
      </section>
    </section>
  );
}
