import { notFound } from "next/navigation";
import ProjectCaseStudyClient from "../../../../components/ProjectCaseStudyClient";
import { getProjectBySlug, projectSlugs } from "../../../../data/projectsData";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { title: "Project Not Found | ASHDEX" };
  }

  return {
    title: `${project.title} | Case Study | ASHDEX`,
    description: `${project.title} case study focused on ${project.engagementType} with measurable architecture and detection outcomes.`,
    openGraph: {
      title: `${project.title} | ASHDEX`,
      description: project.summary,
      url: `https://ashdex.me/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default function ProjectCaseStudyPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudyClient project={project} />;
}
