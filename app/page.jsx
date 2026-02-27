import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Home | ASHDEX Cybersecurity",
  description:
    "Security architecture, detection engineering, and SOC automation focused on measurable risk reduction.",
  openGraph: {
    title: "ASHDEX | Detection Engineering & CTI Automation",
    description:
      "Engineering-first cybersecurity portfolio with measurable outcomes across SOC automation, detection coverage, and IR readiness.",
    url: "https://ashdex.me",
    type: "website",
  },
};

export default function HomePage() {
  const valueProps = [
    { metric: "70–80%", label: "reduction in manual SOC triage effort" },
    { metric: "~30%", label: "improvement in ATT&CK-aligned detection coverage" },
    { metric: "~35%", label: "faster MTTC during incident response engagements" },
    { metric: "50+", label: "threat feeds normalized and enriched via CTI automation" },
  ];

  const services = [
    "Security Architecture & Engineering",
    "Threat Intel Automation",
    "Detection Engineering & Threat Hunting",
    "Security Tooling & Automation",
    "Cloud Security & Incident Response",
  ];

  const projects = [
    {
      title: "Open Source Threat Intelligence Platform",
      stack: "OpenCTI, STIX, MISP, Docker",
      summary: "Built a unified CTI stack for ingestion, relationship mapping, and analyst-driven investigations.",
    },
    {
      title: "Threat Intelligence Dashboard",
      stack: "STIX/TAXII + MITRE ATT&CK mapping",
      summary: "Delivered contextualized threat visualization to prioritize detections and hunting opportunities.",
    },
    {
      title: "Brand & Domain Monitoring + IOC Enrichment Automation",
      stack: "Automation + IOC enrichment",
      summary: "Automated suspicious domain detection and IOC enrichment to accelerate incident triage.",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="section-card border-cyan-300/40 bg-gradient-to-br from-cyan-400/15 via-surface-900/80 to-violet-400/15">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Cybersecurity Engineering Portfolio</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Security Architecture, Detection Engineering &amp; SOC Automation
            </h1>
            <p className="mt-4 max-w-3xl text-base text-slate-200 sm:text-lg">
              I design secure systems from first principles, then translate architecture into operational detection and automation pipelines that reduce risk with measurable outcomes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/projects" className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25">
                View Projects
              </Link>
              <Link href="/contact" className="rounded-full border border-violet-300/50 bg-violet-400/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-400/20">
                Contact Me
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
      </section>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">Impact Snapshot</h2>
        <ul className="mt-4 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
          {valueProps.map((item) => (
            <li key={item.label} className="rounded-xl border border-cyan-400/20 bg-surface-800/60 p-4">
              <p className="text-2xl font-black text-cyan-200">{item.metric}</p>
              <p className="mt-1 text-sm text-slate-300">{item.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-cyan-100">What I Build</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service}
              href="/services"
              className="section-card block border-cyan-300/30 transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
            >
              <p className="font-semibold text-cyan-100">{service}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">Security Architecture &amp; Engineering</h2>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          Architecture-first delivery across identity, network segmentation, telemetry strategy, and incident-ready control planes.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
            <p className="text-sm font-semibold text-cyan-300">Reference Architectures</p>
            <p className="mt-2 text-sm text-slate-300">Security blueprints for SIEM, EDR, CTI, and automation workflows.</p>
          </article>
          <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
            <p className="text-sm font-semibold text-cyan-300">Detection-by-Design</p>
            <p className="mt-2 text-sm text-slate-300">ATT&CK-aligned telemetry and rule strategy embedded into platform architecture.</p>
          </article>
          <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
            <p className="text-sm font-semibold text-cyan-300">SOC Operationalization</p>
            <p className="mt-2 text-sm text-slate-300">Playbooks, escalation models, and automation paths designed for analyst efficiency.</p>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-cyan-100">Selected Projects</h2>
          <Link href="/projects" className="text-sm font-semibold text-cyan-300 hover:underline">
            See all projects
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href="/projects"
              className="section-card block border-cyan-300/25 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
            >
              <p className="text-sm font-semibold text-cyan-300">{project.stack}</p>
              <h3 className="mt-1 text-lg font-bold text-cyan-100">{project.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">Credibility</h2>
        <p className="mt-3 text-sm text-slate-200">
          <span className="font-semibold text-cyan-300">Certifications:</span> CISSP, CISM, CISA
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Additional certifications: AWS Certified Cloud Practitioner, Google Cybersecurity Professional Certificate, Meta Front-End Developer Certificate
        </p>
        <p className="mt-3 text-sm text-slate-200">
          <span className="font-semibold text-cyan-300">Focus Areas:</span> CTI, Detection Engineering, Cloud IR, Security Automation
        </p>
      </section>

      <section className="section-card border-violet-300/35 bg-gradient-to-r from-violet-400/15 via-surface-900/80 to-cyan-400/15">
        <h2 className="text-2xl font-bold text-white">Want to improve your threat detection or automate threat intelligence?</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/25">
            Contact Me
          </Link>
          <Link href="/services" className="rounded-full border border-violet-300/55 bg-violet-300/10 px-5 py-2.5 text-sm font-semibold text-violet-100 hover:bg-violet-300/20">
            Explore Services
          </Link>
        </div>
      </section>
    </div>
  );
}
