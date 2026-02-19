import Link from 'next/link';
import PageShell from '../components/PageShell';

export default function HomePage() {
  return (
    <PageShell
      title="Threat Intelligence Automation, Detection Engineering & Security Automation"
      subtitle="I design and build custom threat intelligence pipelines, detection logic, and security automation for security teams and startups."
    >
      <p className="text-slate-600">From noisy feeds and manual triage to actionable intelligence and automated workflows.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/projects" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">View My Work</Link>
        <Link href="/contact" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">Work With Me</Link>
      </div>
    </PageShell>
  );
}
