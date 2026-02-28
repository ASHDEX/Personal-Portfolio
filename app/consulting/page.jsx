import Link from "next/link";

export const metadata = {
  title: "Consulting | Security Architecture & Detection Engineering",
  description:
    "Enterprise consulting for security architecture modernization, detection engineering uplift, and SOC automation outcomes.",
  openGraph: {
    title: "Security Architecture & Detection Engineering Modernization",
    description:
      "Architecture-first consulting to improve detection quality, reduce triage load, and modernize incident response operations.",
    url: "https://ashdex.me/consulting",
    type: "website",
  },
};

const challenges = [
  "Alert fatigue",
  "Tool sprawl",
  "Low detection quality",
  "Manual SOC processes",
  "Audit pressure",
];

const approach = [
  "Architecture-first",
  "Detection-driven",
  "Automation-enabled",
  "Risk-aligned",
];

const services = [
  "Security Architecture Design & Modernization",
  "Detection Engineering Uplift",
  "Incident Response Readiness Program",
  "SOC Automation Buildout",
  "Threat Intelligence Automation",
];

const engagementModel = ["Discover", "Design", "Build", "Operationalize", "Knowledge Transfer"];

export default function ConsultingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-calendly-link";

  return (
    <section className="space-y-10">
      <header className="section-card border-cyan-300/35 bg-gradient-to-br from-cyan-400/15 via-surface-900/80 to-violet-400/15">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Consulting</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Security Architecture &amp; Detection Engineering Modernization
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-200 sm:text-lg">
          Transforming security operations through architecture-first design, high-fidelity detections, and
          automation-driven incident response.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#consultation"
            className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
          >
            Book Consultation
          </a>
          <Link
            href="/projects"
            className="rounded-full border border-violet-300/55 bg-violet-300/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-300/20"
          >
            View Case Studies
          </Link>
        </div>
      </header>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">The Challenge</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((item) => (
            <article key={item} className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4 text-sm text-slate-200">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">My Approach</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {approach.map((item) => (
            <article key={item} className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
              <p className="text-sm font-semibold text-cyan-200">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card border-violet-300/30 bg-gradient-to-r from-violet-400/10 via-surface-900/80 to-cyan-400/10">
        <h2 className="text-2xl font-bold text-cyan-100">Case Study: FinTech Security Modernization</h2>
        <p className="mt-3 text-sm text-slate-300">
          Architecture redesign, detection uplift, and SOC automation delivery for a regulated environment.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
            <p className="text-2xl font-black text-cyan-200">70–80%</p>
            <p className="mt-1 text-sm text-slate-300">triage reduction</p>
          </article>
          <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
            <p className="text-2xl font-black text-cyan-200">30%</p>
            <p className="mt-1 text-sm text-slate-300">detection coverage improvement</p>
          </article>
          <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
            <p className="text-2xl font-black text-cyan-200">35%</p>
            <p className="mt-1 text-sm text-slate-300">MTTC reduction</p>
          </article>
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">Services Overview</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {services.map((service) => (
            <article key={service} className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4 text-sm font-medium text-slate-200">
              {service}
            </article>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">Engagement Model</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {engagementModel.map((step) => (
            <article key={step} className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4 text-center text-sm font-semibold text-cyan-200">
              {step}
            </article>
          ))}
        </div>
      </section>

      <section id="consultation" className="section-card border-cyan-300/35 bg-gradient-to-r from-cyan-400/10 via-surface-900/80 to-violet-400/10">
        <h2 className="text-2xl font-bold text-white">Schedule Architecture Consultation</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
          >
            Go to Contact
          </Link>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-300/25 bg-surface-900/70">
          <iframe title="Calendly scheduling" src={calendlyUrl} className="h-[700px] w-full" loading="lazy" />
        </div>
      </section>
    </section>
  );
}

