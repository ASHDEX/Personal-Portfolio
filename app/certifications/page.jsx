const credlyProfileUrl = "https://www.credly.com/users/jayesh-chaudhary.3248ecac";

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    verifyUrl: credlyProfileUrl,
  },
  {
    name: "Google Cybersecurity Professional Certificate",
    verifyUrl: credlyProfileUrl,
  },
  {
    name: "Meta Front-End Developer Certificate",
    verifyUrl: credlyProfileUrl,
  },
  {
    name: "CompTIA Security+ (Planned)",
    verifyUrl: credlyProfileUrl,
  },
];

export default function CertificationsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
      <p className="text-slate-600">Professional learning milestones and certifications.</p>

      <a
        className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-100"
        href={credlyProfileUrl}
        target="_blank"
        rel="noreferrer"
      >
        View Credly Profile
      </a>

      <div className="grid gap-3 md:grid-cols-2">
        {certifications.map((cert) => (
          <article key={cert.name} className="section-card space-y-2 text-sm">
            <p className="font-medium text-slate-900">{cert.name}</p>
            <a
              className="font-semibold text-teal-700 hover:underline"
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
            >
              Credential Verification Link
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
