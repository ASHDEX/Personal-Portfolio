import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "ASHDEX | Cybersecurity Portfolio",
  description:
    "Cybersecurity portfolio focused on Threat Intel Automation, Detection Engineering, Security Tooling, and Security Architecture.",
  metadataBase: new URL("https://ashdex.me"),
  openGraph: {
    title: "ASHDEX | Cybersecurity Portfolio",
    description:
      "Threat intelligence automation, detection engineering, DFIR tooling, and security architecture case studies.",
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-950 bg-grid [background-size:20px_20px]">
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.15),transparent_40%)]" />
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
