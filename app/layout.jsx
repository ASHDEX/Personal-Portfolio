import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Ashdex Portfolio",
  description: "Modern personal portfolio built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-orange-50">
          <Navbar />
          <main className="page-shell py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
