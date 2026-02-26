export const metadata = {
  title: "About | ASHDEX Cybersecurity",
  description:
    "Detection-first security engineer focused on automation, threat intelligence pipelines, and resilient security architecture.",
  openGraph: {
    title: "About | ASHDEX",
    description:
      "Engineering philosophy and mission focused on practical security outcomes through automation and detection engineering.",
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

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <h1 className="section-title">About</h1>

      <article className="section-card space-y-4 text-sm muted">
        <h2 className="text-xl font-bold text-cyan-100">Mission</h2>
        <p>
          I build cybersecurity systems that transform fragmented telemetry into reliable detections, fast triage,
          and measurable response outcomes.
        </p>
      </article>

      <article className="section-card space-y-4 text-sm muted">
        <h2 className="text-xl font-bold text-cyan-100">Engineering Philosophy</h2>
        <p>
          I design and build practical cybersecurity systems that close the gap between raw telemetry and analyst action.
          My focus is turning fragmented security signals into reliable, automated detection and response workflows.
        </p>
        <p>
          I work across engineering and security domains: from ingest pipelines and enrichment automation to detection-as-code,
          hardening patterns, and architecture decisions that scale with organizational risk.
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

      <article className="section-card space-y-3 text-sm muted">
        <h2 className="text-xl font-bold text-cyan-100">Professional Bio</h2>
        <p>
          Security engineer specializing in threat intelligence automation, detection engineering, cloud incident response,
          and security architecture. I work with engineering and security teams to build detection pipelines and operating
          models that improve analyst efficiency and reduce response friction.
        </p>
      </article>
    </section>
  );
}
