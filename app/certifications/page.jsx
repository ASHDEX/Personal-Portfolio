import Image from "next/image";

export const metadata = {
  title: "Certifications | ASHDEX Cybersecurity",
  description:
    "Professional cybersecurity certifications with practical relevance to detection engineering, incident response, and security architecture delivery.",
  openGraph: {
    title: "Certifications | ASHDEX",
    description:
      "Evidence-backed certifications and what each credential proves in operational security practice.",
    url: "https://ashdex.me/certifications",
    type: "website",
  },
};

const credlyProfileUrl = "https://www.credly.com/users/jayesh-chaudhary.3248ecac";
const credlyBadgesUrl = `${credlyProfileUrl}/badges`;
const credlyApiUrl = `${credlyProfileUrl}/badges.json`;

async function getCredlyBadges() {
  try {
    const response = await fetch(credlyApiUrl, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return Array.isArray(payload?.data) ? payload.data : [];
  } catch {
    return [];
  }
}

export default async function CertificationsPage() {
  const badges = await getCredlyBadges();

  const relevanceMap = {
    CISSP:
      "Proves broad capability in security architecture, governance, and risk-based decision-making for enterprise programs.",
    CISM:
      "Demonstrates leadership in security program design, incident management, and operational governance alignment.",
    CISA:
      "Validates control evaluation, audit-readiness, and assurance design for resilient security operations.",
    Security: "Supports hands-on SOC operations, detection workflows, and analyst-driven response execution.",
    Cloud: "Demonstrates secure cloud implementation patterns and operational security understanding in modern environments.",
  };

  const getRelevance = (badgeName) => {
    const upper = badgeName.toUpperCase();
    if (upper.includes("CISSP")) return relevanceMap.CISSP;
    if (upper.includes("CISM")) return relevanceMap.CISM;
    if (upper.includes("CISA")) return relevanceMap.CISA;
    if (upper.includes("SECURITY")) return relevanceMap.Security;
    if (upper.includes("CLOUD") || upper.includes("AZURE") || upper.includes("AWS")) return relevanceMap.Cloud;
    return "Shows verified, continuous upskilling aligned to practical security engineering and delivery outcomes.";
  };

  return (
    <section className="space-y-5">
      <h1 className="section-title">Certifications</h1>
      <p className="muted">Credentials with practical relevance to incident response, detection engineering, and security architecture.</p>

      <a
        className="inline-flex rounded-full border border-cyan-300/50 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-300/20"
        href={credlyBadgesUrl}
        rel="noreferrer"
        target="_blank"
      >
        View All Credentials on Credly
      </a>

      {badges.length === 0 ? (
        <article className="section-card text-sm text-slate-300">
          Unable to load credentials from Credly right now. Please use the Credly profile link above.
        </article>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {badges.map((badge) => {
            const badgeName = badge?.badge_template?.name ?? "Credential";
            const issuer = badge?.issuer?.entities?.[0]?.entity?.name ?? "Unknown issuer";
            const imageUrl = badge?.badge_template?.image_url ?? badge?.image_url;
            const issuedAt = badge?.issued_at_date;
            const verifyUrl = badge?.badge_template?.url ?? credlyBadgesUrl;
            const relevance = getRelevance(badgeName);

            return (
              <article key={badge.id} className="section-card space-y-3 text-sm">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`${badgeName} logo`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg border border-cyan-300/30 bg-surface-800/70 object-contain p-1"
                  />
                ) : null}

                <div>
                  <p className="font-semibold text-cyan-100">{badgeName}</p>
                  <p className="mt-1 text-xs text-slate-300">Issued by {issuer}</p>
                  {issuedAt ? <p className="mt-1 text-xs text-slate-400">Issued: {issuedAt}</p> : null}
                  <p className="mt-2 text-xs text-slate-300">{relevance}</p>
                </div>

                <a className="font-semibold text-cyan-300 hover:underline" href={verifyUrl} rel="noreferrer" target="_blank">
                  Verify Credential
                </a>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
