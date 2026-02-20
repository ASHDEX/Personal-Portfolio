const certifications = [
  "AWS Certified Cloud Practitioner",
  "Google Cybersecurity Professional Certificate",
  "Meta Front-End Developer Certificate",
  "CompTIA Security+ (Planned)",
];

export default function CertificationsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
      <p className="text-slate-600">Professional learning milestones and certifications.</p>
      <div className="grid gap-3 md:grid-cols-2">
        {certifications.map((cert) => (
          <article key={cert} className="section-card text-sm font-medium">
            {cert}
          </article>
        ))}
      </div>
    </section>
  );
}
