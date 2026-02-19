import Image from 'next/image';
import PageShell from '../../components/PageShell';

const certs = [
  {
    name: 'Certified Information Security Manager® (CISM)',
    verifyUrl: 'https://www.credly.com/badges/7e9d4e30-36bf-430c-aa91-81df3f2f0e3d',
    imageUrl: 'https://images.credly.com/images/d0891dee-6360-496c-9981-40652523b502/dbdea6794f1a6bbcc18d90eea923421aac7df6b5.png'
  },
  {
    name: 'Certified Information Systems Security Professional (CISSP)',
    verifyUrl: 'https://www.credly.com/badges/0141688e-c006-4f90-b938-aed0464509e6',
    imageUrl: 'https://images.credly.com/images/6eeb0a98-33cb-4f72-bfc3-f89d65a3286c/image.png'
  },
  {
    name: 'CompTIA Security+ ce Certification',
    verifyUrl: 'https://www.credly.com/badges/40656177-3a3d-4613-a6ef-a923382f1515',
    imageUrl: 'https://images.credly.com/images/80d8a06a-c384-42bf-ad36-db81bce5adce/blob'
  }
];

export default function CertificationsPage() {
  return (
    <PageShell title="Certifications" subtitle="Verification links and badge logos from Credly.">
      <div className="grid gap-4 md:grid-cols-3">
        {certs.map((cert) => (
          <article key={cert.verifyUrl} className="rounded-xl border border-slate-200 bg-white p-4">
            <Image src={cert.imageUrl} alt={`${cert.name} logo`} width={64} height={64} className="h-16 w-16 object-contain" />
            <h2 className="mt-3 text-sm font-semibold text-slate-900">{cert.name}</h2>
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-medium text-slate-700 underline">Verify credential</a>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
