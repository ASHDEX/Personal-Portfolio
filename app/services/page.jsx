import Link from "next/link";

export const metadata = {
  title: "Services | ASHDEX Cybersecurity",
  description:
    "Enterprise security consulting services for architecture modernization, detection uplift, incident readiness, and SOC automation outcomes.",
  openGraph: {
    title: "Services | ASHDEX",
    description:
      "Architecture-first security services designed for measurable SOC modernization outcomes.",
    url: "https://ashdex.me/services",
    type: "website",
  },
};

const services = [
  {
    name: "Security Architecture Design & Modernization",
    audience: "Security leaders modernizing fragmented security ecosystems in regulated or high-growth environments.",
    includes: [
      "Current-state security architecture assessment",
      "Target-state reference architecture (SIEM, EDR, identity, CTI, automation)",
      "Control-to-detection traceability mapping",
      "Integration design and telemetry strategy",
    ],
    outcomes: [
      "Reduced architecture blind spots",
      "Clear modernization roadmap",
      "Audit-ready governance and ownership clarity",
    ],
    model: "Modernization initiative",
  },
  {
    name: "Detection Engineering Uplift",
    audience: "SOC teams with telemetry but low-fidelity detections and tuning debt.",
    includes: [
      "Detection maturity assessment",
      "ATT&CK-aligned rule design and coverage uplift",
      "Rule tuning and false-positive reduction workflows",
      "Detection QA and lifecycle governance",
    ],
    outcomes: ["Higher-fidelity alerts", "Improved ATT&CK coverage", "Faster analyst triage"],
    model: "Sprint or modernization initiative",
  },
  {
    name: "Incident Response Readiness Program",
    audience: "Organizations needing repeatable incident handling and stronger containment readiness.",
    includes: [
      "IR playbooks, severity matrix, and escalation design",
      "Evidence collection and case-handling standards",
      "Runbook operationalization for SOC and cross-functional teams",
      "Tabletop exercise support",
    ],
    outcomes: ["Reduced Mean Time to Contain", "Consistent response execution", "Improved audit defensibility"],
    model: "Sprint or modernization initiative",
  },
  {
    name: "SOC Automation Buildout",
    audience: "Security operations teams constrained by repetitive triage and manual workflow handoffs.",
    includes: [
      "Alert enrichment and triage automation design",
      "Case routing and response workflow orchestration",
      "Operational reporting automation",
    ],
    outcomes: ["Reduced manual SOC effort", "Faster investigations", "Higher operational consistency"],
    model: "Sprint or modernization initiative",
  },
  {
    name: "Threat Intelligence Automation",
    audience: "Security teams overwhelmed by fragmented intel feeds and inconsistent enrichment quality.",
    includes: [
      "Feed ingestion and normalization architecture",
      "Deduplication, enrichment, and confidence scoring",
      "SOC integration paths for action-ready CTI",
    ],
    outcomes: ["Actionable CTI", "Lower analyst noise", "Faster detection prioritization"],
    model: "Sprint or modernization initiative",
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
          Architecture-first security services for enterprise teams modernizing detection, response, and SOC operations.
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
              <span className="font-semibold text-cyan-300">Who it’s for:</span> {service.audience}
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

            <p className="mt-4 text-sm text-slate-200">
              <span className="font-semibold text-cyan-300">Engagement model:</span> {service.model}
            </p>

            <Link
              href="/consulting"
              className="mt-5 inline-flex w-fit rounded-full border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
            >
              Discuss Engagement
            </Link>
          </article>
        ))}
      </section>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">Engagement Model</h2>
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
        <h2 className="text-2xl font-bold text-white">Need an architecture-first security modernization partner?</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/consulting"
            className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
          >
            Discuss an Engagement
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
