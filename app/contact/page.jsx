import PageShell from '../../components/PageShell';

export default function ContactPage() {
  return (
    <PageShell title="Contact" subtitle="Need help with threat intel automation, detection engineering, or security automation?">
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-700">
        <p><strong>Email:</strong> you@yourdomain.com</p>
        <p className="mt-1"><strong>LinkedIn:</strong> linkedin.com/in/yourname</p>
        <p className="mt-1"><strong>Fiverr:</strong> fiverr.com/yourprofile</p>
      </div>
    </PageShell>
  );
}
