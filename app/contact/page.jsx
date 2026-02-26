import ContactClient from "../../components/ContactClient";

export const metadata = {
  title: "Contact | ASHDEX Cybersecurity",
  description:
    "Connect for detection engineering, incident response readiness, SOC automation, and CTI pipeline engagements.",
  openGraph: {
    title: "Contact | ASHDEX",
    description:
      "Reach out for recruiter opportunities or client engagements with streamlined contact workflows.",
    url: "https://ashdex.me/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

