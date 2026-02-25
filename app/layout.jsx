import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "ASHDEX | Cybersecurity Portfolio",
  description:
    "Cybersecurity portfolio focused on Threat Intel Automation, Detection Engineering, Security Tooling, and Security Architecture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-950 bg-grid [background-size:20px_20px]">
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.15),transparent_40%)]" />
          <Navbar />
          <main className="page-shell relative z-10 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
