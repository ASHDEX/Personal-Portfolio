import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Jayesh Chaudhary | Security Architect & Engineer",
  description:
    "Jayesh Chaudhary — CISSP, CISM, CISA. Lead Security Engineer specialising in Detection Engineering, Threat Intelligence Automation, SOC Modernisation, and Security Architecture.",
  metadataBase: new URL("https://ashdex.me"),
  openGraph: {
    title: "Jayesh Chaudhary | Security Architect & Engineer",
    description:
      "Detection Engineering, Threat Intelligence Automation, DFIR tooling, and Security Architecture. CISSP · CISM · CISA.",
    url: "https://ashdex.me",
    siteName: "ASHDEX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const rawGaId = process.env.NEXT_PUBLIC_GA_ID;
  // Validate format before use to prevent script injection if env var is misconfigured
  const gaId = rawGaId && /^G-[A-Z0-9]{4,}$/.test(rawGaId) ? rawGaId : null;

  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen`}>
        <div className="relative min-h-screen overflow-hidden">
          {/* Atmospheric light sources */}
          <div className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: `
                radial-gradient(ellipse 55% 38% at 8% -4%, rgba(38,217,184,0.13) 0%, transparent 52%),
                radial-gradient(ellipse 55% 38% at 92% -4%, rgba(124,139,255,0.12) 0%, transparent 50%),
                radial-gradient(ellipse 40% 28% at 50% 108%, rgba(7,8,15,0.85) 0%, transparent 55%)
              `,
            }}
          />
          <Navbar />
          <main className="page-shell relative z-10 py-20">{children}</main>
          <Footer />
        </div>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-setup" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
