import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        style={{ background: "var(--accent)", color: "#07080f" }}
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="page-shell relative z-10 py-20">{children}</main>
      <Footer />
    </>
  );
}
