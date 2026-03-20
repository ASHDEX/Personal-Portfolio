import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="page-shell relative z-10 py-20">{children}</main>
      <Footer />
    </>
  );
}
