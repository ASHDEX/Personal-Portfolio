import ProjectsClient from "../../components/ProjectsClient";

export const metadata = {
  title: "Projects | ASHDEX Cybersecurity",
  description:
    "Real-world cybersecurity projects across detection engineering, DFIR tooling, CTI automation, and security pipeline architecture.",
  openGraph: {
    title: "Projects | ASHDEX",
    description:
      "Filterable case studies covering SOC automation, ATT&CK-mapped detections, CTI enrichment, and incident response tooling.",
    url: "https://ashdex.me/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
