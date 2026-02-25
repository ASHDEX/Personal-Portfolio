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

  return (
    <section className="space-y-5">
      <h1 className="section-title">Certifications</h1>
      <p className="muted">Live credentials from Credly, including badge logos and verification links.</p>

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

            return (
              <article key={badge.id} className="section-card space-y-3 text-sm">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={`${badgeName} logo`}
                    className="h-16 w-16 rounded-lg border border-cyan-300/30 bg-surface-800/70 object-contain p-1"
                    loading="lazy"
                  />
                ) : null}

                <div>
                  <p className="font-semibold text-cyan-100">{badgeName}</p>
                  <p className="mt-1 text-xs text-slate-300">Issued by {issuer}</p>
                  {issuedAt ? <p className="mt-1 text-xs text-slate-400">Issued: {issuedAt}</p> : null}
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
