export const metadata = {
  title: "About | ASHDEX Cybersecurity",
  description:
    "Architecture-first security engineer focused on systems design, detection engineering, and resilient SOC operations.",
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
          I design security architectures that connect identity, telemetry, detection logic, and response workflows into
          resilient systems with measurable operational impact.
        </p>
      </article>

      <article className="section-card space-y-4 text-sm muted">
        <h2 className="text-xl font-bold text-cyan-100">Engineering Philosophy</h2>
        <p>
          I approach security as a systems engineering problem. Architecture decisions should define where trust boundaries
          exist, how telemetry is generated, and how detections flow into repeatable response outcomes.
        </p>
        <p>
          My work spans security architecture, detection-as-code, automation pipelines, and incident response engineering—
          always grounded in clear design principles and practical SOC execution.
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
          Security engineer specializing in architecture-first security programs, detection engineering, and automation-led
          SOC operations. I help teams design and implement scalable security systems that improve coverage, reduce operational
          friction, and increase response consistency.
        </p>
      </article>
    </section>
  );
}
