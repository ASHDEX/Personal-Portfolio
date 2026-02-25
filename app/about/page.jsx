export default function AboutPage() {
  return (
    <section className="space-y-5">
      <h1 className="section-title">About</h1>
      <article className="section-card space-y-3 text-sm muted">
        <p>
          I design and build practical cybersecurity systems that close the gap between raw telemetry and analyst action.
          My focus is turning fragmented security signals into reliable, automated detection and response workflows.
        </p>
        <p>
          I work across engineering and security domains: from ingest pipelines and enrichment automation to detection-as-code,
          hardening patterns, and architecture decisions that scale with organizational risk.
        </p>
      </article>
    </section>
  );
}
