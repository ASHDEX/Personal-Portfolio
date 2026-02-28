import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Home | ASHDEX Cybersecurity",
  description:
    "Security Architecture, Detection Engineering, and SOC modernization consulting for enterprise teams with measurable operational outcomes.",
  openGraph: {
    title: "ASHDEX | Security Architecture & SOC Modernization",
    description:
      "Architecture-first cybersecurity delivery for consulting engagements and senior security architecture leadership outcomes.",
    url: "https://ashdex.me",
    type: "website",
  },
};

export default function HomePage() {
  const valueProps = [
    { metric: "70–80%", label: "reduction in manual SOC triage" },
    { metric: "30%", label: "improvement in MITRE ATT&CK detection coverage" },
    { metric: "35%", label: "reduction in Mean Time to Contain" },
    { metric: "95%", label: "endpoint compliance in regulated environments" },
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
    "Security teams modernizing Microsoft security stacks",
    "Organizations preparing for audit & compliance reviews",
    "Teams scaling from reactive SOC to engineered detection",
  ];

  const projects = [
    {
      title: "Security Architecture Design",
      stack: "Architecture Modernization",
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

  return (
    <div>
      <section className="section-block">
        <div className="section-card border-cyan-300/40 bg-gradient-to-br from-cyan-400/15 via-surface-900/80 to-violet-400/15">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Enterprise Security Consulting</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Security Architecture, Detection Engineering &amp; SOC Modernization
              </h1>
              <p className="mt-4 max-w-3xl text-base text-slate-200 sm:text-lg">
                I help security teams design resilient architectures, improve detection coverage, and automate incident response workflows with measurable operational impact.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/projects" className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/25">
                  View Case Studies
                </Link>
                <Link href="/consulting" className="rounded-full border border-violet-300/50 bg-violet-400/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-400/20">
                  Discuss an Engagement
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-cyan-300/25 bg-surface-900/70">
              <Image
                src="/cyber-ops.svg"
                alt="Cybersecurity operations dashboard preview"
                width={800}
                height={560}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-card">
          <h2 className="section-subtitle">Impact Snapshot</h2>
          <ul className="mt-4 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
            {valueProps.map((item) => (
              <li key={item.label} className="rounded-xl border border-cyan-400/20 bg-surface-800/60 p-4">
                <p className="text-2xl font-black text-cyan-200">{item.metric}</p>
                <p className="mt-1 text-sm text-slate-300">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-block space-y-4">
        <h2 className="section-subtitle">Security Systems I Design</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {systems.map((service) => (
            <Link
              key={service}
              href="/services"
              className="section-card interactive-card block border-cyan-300/30"
            >
              <p className="font-semibold text-cyan-100">{service}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-card">
          <h2 className="section-subtitle">Who I Work With</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {whoIWorkWith.map((item) => (
              <article key={item} className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
                <p className="text-sm text-slate-200 sm:text-base">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="section-subtitle">Selected Projects</h2>
          <Link href="/projects" className="text-sm font-semibold text-cyan-300 hover:underline">
            See all projects
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href="/projects"
              className="section-card interactive-card block border-cyan-300/25"
            >
              <p className="text-sm font-semibold text-cyan-300">{project.stack}</p>
              <h3 className="mt-1 text-lg font-bold text-cyan-100">{project.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-card">
          <h2 className="section-subtitle">Credibility</h2>
          <p className="mt-3 text-sm text-slate-200">
            <span className="font-semibold text-cyan-300">Certifications:</span> CISSP, CISM, CISA
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Additional certifications: AWS Certified Cloud Practitioner, Google Cybersecurity Professional Certificate, Meta Front-End Developer Certificate
          </p>
          <p className="mt-3 text-sm text-slate-200">
            <span className="font-semibold text-cyan-300">Focus Areas:</span> Security Architecture, Detection Engineering, Cloud IR, Security Automation
          </p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-card border-violet-300/35 bg-gradient-to-r from-violet-400/15 via-surface-900/80 to-cyan-400/15">
          <h2 className="text-2xl font-bold text-white">Looking to modernize your security operations?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/25">
              View Case Studies
            </Link>
            <Link href="/consulting" className="rounded-full border border-violet-300/55 bg-violet-300/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-300/20">
              Discuss an Engagement
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
