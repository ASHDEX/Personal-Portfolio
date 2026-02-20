import Image from 'next/image';
import PageShell from '../../components/PageShell';

const FALLBACK_CERTS = [
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
    name: 'Certificate of Cloud Security Knowledge v.4',
    verifyUrl: 'https://www.credly.com/badges/5c261f95-aaec-49f2-b068-f5759e4e564a',
    imageUrl: 'https://images.credly.com/images/7495098d-c8c3-41a8-a81a-772cdc7e6a95/image.png'
  },
  {
    name: 'Certificate of Cloud Security Knowledge v.5',
    verifyUrl: 'https://www.credly.com/badges/afed2e0e-bafc-42b1-b6e6-113d80c78e92',
    imageUrl: 'https://images.credly.com/images/4377e6e3-3297-4e3a-b8b8-e1ae89b8b0a8/image.png'
  },
  {
    name: 'CompTIA Secure Infrastructure Expert – CSIE Stackable Certification',
    verifyUrl: 'https://www.credly.com/badges/9684650a-3f30-4212-bc03-933b67f8a746',
    imageUrl: 'https://images.credly.com/images/4e8cb067-ff0a-4b3e-bf5d-7290ba25d0d6/CompTIA_CSIE.png'
  },
  {
    name: 'CompTIA Security Analytics Expert – CSAE Stackable Certification',
    verifyUrl: 'https://www.credly.com/badges/4830d6e8-2b4b-4d9c-8ede-782cd1077d64',
    imageUrl: 'https://images.credly.com/images/93d16d4a-223f-41bd-aaad-6a491b7b1fa8/CompTIA_CSAE.png'
  },
  {
    name: 'CompTIA SecurityX ce Certification',
    verifyUrl: 'https://www.credly.com/badges/85c8445e-dde7-46f5-bc31-0fcab52a66aa',
    imageUrl: 'https://images.credly.com/images/5343b652-c9a0-418e-bfaf-7ed5a2ddd0c4/blob'
  },
  {
    name: 'CompTIA Network Security Professional – CNSP Stackable Certification',
    verifyUrl: 'https://www.credly.com/badges/0eef0045-4890-4019-8c4c-a2df8e38f029',
    imageUrl: 'https://images.credly.com/images/6f68e302-2193-4cbc-b2d9-50541a130ffa/CompTIA_CNSP.png'
  },
  {
    name: 'CompTIA Network Vulnerability Assessment Professional – CNVP Stackable Certification',
    verifyUrl: 'https://www.credly.com/badges/0712b871-f59e-4e9c-9ea9-6056b85a11f4',
    imageUrl: 'https://images.credly.com/images/3eaf80a9-a69a-480a-a98b-e9a91796d6cb/CompTIA_CNVP.png'
  },
  {
    name: 'CompTIA PenTest+ ce Certification',
    verifyUrl: 'https://www.credly.com/badges/779ce89e-bbbf-41df-9d2d-26cc49c3977b',
    imageUrl: 'https://images.credly.com/images/c7ac176b-15a3-4726-827a-e8cee8fe44dc/blob'
  },
  {
    name: 'CompTIA CySA+ ce Certification',
    verifyUrl: 'https://www.credly.com/badges/91eb79ad-9237-485f-8a23-6d5d0c294ab9',
    imageUrl: 'https://images.credly.com/images/dcd99b5b-da24-40a6-9364-62126d590c37/blob'
  },
  {
    name: 'CompTIA Security Analytics Professional – CSAP Stackable Certification',
    verifyUrl: 'https://www.credly.com/badges/a46b7efa-5321-4b44-90c9-c8bf163cce8a',
    imageUrl: 'https://images.credly.com/images/ba1b8072-8ebe-432c-88e5-05bc809c624a/CompTIA_CSAP.png'
  },
  {
    name: 'CompTIA Security+ ce Certification',
    verifyUrl: 'https://www.credly.com/badges/40656177-3a3d-4613-a6ef-a923382f1515',
    imageUrl: 'https://images.credly.com/images/80d8a06a-c384-42bf-ad36-db81bce5adce/blob'
  },
  {
    name: 'Microsoft Certified: Azure Data Fundamentals',
    verifyUrl: 'https://www.credly.com/badges/a35c8ff7-d785-479b-8812-3414a905554f',
    imageUrl: 'https://images.credly.com/images/70eb1e3f-d4de-4377-a062-b20fb29594ea/azure-data-fundamentals-600x600.png'
  },
  {
    name: 'ISC2 Candidate',
    verifyUrl: 'https://www.credly.com/badges/330b44f4-9e1a-4a2d-8607-6c545ba71d82',
    imageUrl: 'https://images.credly.com/images/9180921d-4a13-429e-9357-6f9706a554f0/image.png'
  },
  {
    name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals',
    verifyUrl: 'https://www.credly.com/badges/d441c2c3-5b27-42dd-b135-14690bc205c6',
    imageUrl: 'https://images.credly.com/images/fc1352af-87fa-4947-ba54-398a0e63322e/security-compliance-and-identity-fundamentals-600x600.png'
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    verifyUrl: 'https://www.credly.com/badges/b06d874e-3b42-44b1-99e6-5bae28e61a0c',
    imageUrl: 'https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png'
  },
  {
    name: 'Intermediate Purple Teaming',
    verifyUrl: 'https://www.credly.com/badges/8bdcb096-1556-4a33-8e69-4196b5235d04',
    imageUrl: 'https://images.credly.com/images/89667ef7-c108-479b-859a-cd52f7781143/Intermediate_Purple_Teaming_Badge.png'
  },
  {
    name: 'Foundations of Breach & Attack Simulation',
    verifyUrl: 'https://www.credly.com/badges/32257e2c-abfc-44d7-ae67-10d1bd5ffb22',
    imageUrl: 'https://images.credly.com/images/af2c22ad-233c-481c-bab9-e7cbc1596e71/Foundations_of_BAS_Badge.png'
  },
  {
    name: 'Foundations of Operationalizing MITRE ATT&CK',
    verifyUrl: 'https://www.credly.com/badges/42602890-539e-4730-8d8a-e84fdb4751e9',
    imageUrl: 'https://images.credly.com/images/466bf45d-c48d-46c3-a613-fd950d1dd9f9/Foundations_of_MITRE_ATT_CK_Badge.png'
  },
  {
    name: 'Foundations of Purple Teaming',
    verifyUrl: 'https://www.credly.com/badges/b3856683-6b54-412a-8436-e0512363ed59',
    imageUrl: 'https://images.credly.com/images/ae9d6f85-418e-45d1-b0fc-4f44fc6708f3/Foundations_of_Purple_Teaming_Badge.png'
  },
  {
    name: 'Getting Started in Cybersecurity 1.0',
    verifyUrl: 'https://www.credly.com/badges/7943e7b4-0342-41f0-94a8-e7ca969645cd',
    imageUrl: 'https://images.credly.com/images/a026e7f2-08af-4b73-8cc1-5aec7959faf8/image.png'
  },
  {
    name: 'Introduction to the Threat Landscape 1.0',
    verifyUrl: 'https://www.credly.com/badges/33257435-21c4-48ef-af2e-f1e60a0b8cb8',
    imageUrl: 'https://images.credly.com/images/8395e492-f8aa-4617-a258-6c844f628fa2/image.png'
  },
  {
    name: 'Associate of ISC2',
    verifyUrl: 'https://www.credly.com/badges/87e775df-e0c4-49e9-bad5-c6c7867307c0',
    imageUrl: 'https://images.credly.com/images/701db568-0aec-461e-8857-d7ac313e0062/image.png'
  },
  {
    name: 'Microsoft Certified: Identity and Access Administrator Associate',
    verifyUrl: 'https://www.credly.com/badges/50681152-be83-40b2-88d9-578725cd94b1',
    imageUrl: 'https://images.credly.com/images/91295436-0704-4b98-8e1a-ef5f937bda21/identity-and-access-administrator-associate-600x600.png'
  },
  {
    name: 'Fortinet Certified Fundamentals Cybersecurity',
    verifyUrl: 'https://www.credly.com/badges/ffd063d9-4b6b-4fd6-9933-6ed435543c37',
    imageUrl: 'https://images.credly.com/images/22a0ece5-ff05-4594-8320-25e55e9ae203/image.png'
  },
  {
    name: 'Microsoft Certified: Security Operations Analyst Associate',
    verifyUrl: 'https://www.credly.com/badges/113a55be-f062-46fc-baa1-37e6f6d79a03',
    imageUrl: 'https://images.credly.com/images/7e75516f-5149-4d19-8d09-aa3dab4907cb/security-operations-analyst-associate-600x600.png'
  }
];



const CREDLY_PROFILE_URL = 'https://www.credly.com/users/jayesh-chaudhary.3248ecac';

function decodeHtmlEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

async function fetchCredlyCerts() {
  try {
    const res = await fetch(CREDLY_PROFILE_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    const html = await res.text();

    const pattern = /href="(\/badges\/[0-9a-f-]+)"[^>]*>.*?<img src="([^"]+)" alt="([^"]+)"/gs;
    const certs = [];
    const seen = new Set();

    for (const match of html.matchAll(pattern)) {
      const verifyUrl = `https://www.credly.com${match[1]}`;
      if (seen.has(verifyUrl)) continue;
      seen.add(verifyUrl);

      certs.push({
        name: decodeHtmlEntities(match[3].trim()),
        verifyUrl,
        imageUrl: match[2]
      });
    }

    return certs;
  } catch {
    return [];
  }
}
export default async function CertificationsPage() {
  const liveCredlyCerts = await fetchCredlyCerts();
  const certs = liveCredlyCerts.length > 0 ? liveCredlyCerts : FALLBACK_CERTS;

  return (
    <PageShell
      title="Certifications"
      subtitle="Credly credentials with direct verification links and badge logos."
    >
      <p className="mb-3 text-xs text-slate-500">Source: {CREDLY_PROFILE_URL} • Synced credentials: {certs.length}</p>

      <a
        href={CREDLY_PROFILE_URL}
        target="_blank"
        rel="noreferrer"
        className="mb-4 inline-block text-sm font-medium text-slate-700 underline"
      >
        View full Credly profile
      </a>

      <div className="grid gap-4 md:grid-cols-3">
        {certs.map((cert) => (
          <article key={cert.verifyUrl} className="rounded-xl border border-slate-200 bg-white p-4">
            <Image
              src={cert.imageUrl}
              alt={`${cert.name} logo`}
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
            <h2 className="mt-3 text-sm font-semibold text-slate-900">{cert.name}</h2>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm font-medium text-slate-700 underline"
            >
              Verify credential
            </a>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
