import PageShell from '../../components/PageShell';

export default function ProjectsPage() {
  return (
    <PageShell title="Projects" subtitle="Real-world projects demonstrating threat intel automation, detection engineering, and security tooling.">
      <div className="space-y-4">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Threat Intelligence Automation & Brand Monitoring</h2>
          <p className="mt-2 text-slate-600">CTI pipeline with enrichment, domain monitoring, and structured investigation outputs.</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Detection Engineering Toolkit</h2>
          <p className="mt-2 text-slate-600">MITRE ATT&CK mapped detections, tuning workflows, and higher-fidelity alerting.</p>
        </article>
      </div>
    </PageShell>
  );
}
