import PageShell from '../../components/PageShell';

const roles = [
  'Lead Security Engineer — Cybersecurity Consulting Firm (Confidential)',
  'Insider Threat Management Officer — Large US Financial Institution (Confidential)',
  'Cyber Security Analyst — Large US Financial Institution (Confidential)',
  'Graduate Engineer Trainee — Enterprise SaaS Company (Confidential)',
  'Analyst – Detection & Response — Enterprise Organization (Confidential)'
];

export default function ExperiencePage() {
  return (
    <PageShell title="Experience" subtitle="Security engineering experience across threat intel, detection engineering, incident response, and cloud security.">
      <div className="space-y-3">
        {roles.map((role) => (
          <div key={role} className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">{role}</div>
        ))}
      </div>
    </PageShell>
  );
}
