import PageShell from '../../components/PageShell';

const services = [
  'Threat intelligence feed ingestion, enrichment, scoring, and prioritization',
  'Detection engineering with SIEM rule creation and ATT&CK mapping',
  'Security tooling and SOC workflow automation',
  'Cloud security architecture support and integrations'
];

export default function ServicesPage() {
  return (
    <PageShell title="Services" subtitle="Practical, engineer-first security outcomes.">
      <ul className="grid gap-3 md:grid-cols-2">
        {services.map((item) => (
          <li key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">{item}</li>
        ))}
      </ul>
    </PageShell>
  );
}
