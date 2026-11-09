import type { Metadata } from 'next';
import './socwall.css';

const siteUrl = 'https://ashdex.com';
const title = 'Jayesh Choudhary · Lead Security Engineer';
const description = 'Lead Security Engineer across SOC operations, incident response, insider threat, cloud IR and data security. Open to Security Architect, Principal D&R and vCISO roles.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'Jayesh Choudhary', 'security engineer', 'detection engineering', 'incident response',
    'threat intelligence', 'cloud security', 'SOC', 'CISSP', 'CISM', 'CISA',
  ],
  authors: [{ name: 'Jayesh Choudhary' }],
  creator: 'Jayesh Choudhary',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title,
    description,
    siteName: 'Ashdex · Jayesh Choudhary',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, alt: 'Jayesh Choudhary, Lead Security Engineer · ashdex.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jayesh Choudhary',
  url: siteUrl,
  jobTitle: 'Lead Security Engineer',
  description,
  sameAs: [
    'https://www.linkedin.com/in/jayesh-chaudhary-cissp-cism-cisa-5b563519b/',
    'https://github.com/Ashdex',
    'https://dailydoesofcybersecuritynews.com',
  ],
  knowsAbout: [
    'Detection Engineering', 'Incident Response', 'Threat Intelligence', 'Cloud Security',
    'Insider Threat Management', 'Data Loss Prevention', 'SIEM',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400;62..125,500;62..125,700;62..125,800&family=Chivo+Mono:wght@400;500&family=Silkscreen&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}