import ExperienceClient from "../../components/ExperienceClient";

export const metadata = {
  title: "Experience | ASHDEX Cybersecurity",
  description:
    "Security engineering experience across detection engineering, SOC automation, CTI operations, DFIR, and cloud incident response.",
  openGraph: {
    title: "Experience | ASHDEX",
    description:
      "Recruiter and client views of engineering outcomes, delivery approach, and measurable impact in modern SOC environments.",
    url: "https://ashdex.me/experience",
    type: "website",
  },
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
