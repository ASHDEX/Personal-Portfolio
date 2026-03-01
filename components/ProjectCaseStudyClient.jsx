"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const sideNavSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "what-was-designed", label: "What I Built" },
  { id: "impact", label: "Impact" },
  { id: "tech-stack", label: "Tech Stack" },
];

const sectionMotion = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.28, ease: "easeOut" },
};

export default function ProjectCaseStudyClient({ project }) {
  const [activeSection, setActiveSection] = useState("overview");

  const hasArchitecturePdf = project.slug === "security-architecture-design";

  const observerIds = useMemo(() => sideNavSections.map((section) => section.id), []);

  useEffect(() => {
    const elements = observerIds
      .map((id) => document.getElementById(id))
      .filter((element) => element instanceof HTMLElement);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [observerIds]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
      <article className="max-w-5xl space-y-6">
        <motion.section {...sectionMotion} id="overview" className="section-card border-slate-800 bg-surface-900/90 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Case Study</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-100 sm:text-5xl">{project.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-slate-700 bg-surface-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">
              {project.engagementType}
            </span>
            <span className="rounded-full border border-slate-700 bg-surface-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">
              {project.category}
            </span>
          </div>

          {hasArchitecturePdf ? (
            <a
              href="/pdfs/security-architecture-design.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full border border-slate-400 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900"
            >
              Download Architecture Overview (PDF)
            </a>
          ) : null}
        </motion.section>

        <motion.section {...sectionMotion} id="problem" className="section-card border-slate-800 bg-surface-900/90 py-24">
          <h2 className="text-3xl font-bold text-slate-100">Problem</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">{project.problem}</p>
        </motion.section>

        <motion.section {...sectionMotion} id="architecture" className="section-card border-slate-800 bg-surface-900/90 py-24">
          <h2 className="text-3xl font-bold text-slate-100">Architecture Overview</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">{project.architectureOverview}</p>
        </motion.section>

        <motion.section {...sectionMotion} id="what-was-designed" className="section-card border-slate-800 bg-surface-900/90 py-24">
          <h2 className="text-3xl font-bold text-slate-100">What Was Designed</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-300">
            {project.whatWasDesigned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section {...sectionMotion} id="impact" className="section-card border-slate-800 bg-surface-900/90 py-24">
          <h2 className="text-3xl font-bold text-slate-100">Impact</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {project.impact.map((item) => (
              <article key={item} className="rounded-xl border border-slate-700 bg-surface-800/90 p-4">
                <p className="text-sm font-semibold text-slate-200">{item}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <section className="section-card border-slate-700/80 bg-slate-900 py-24 text-center">
          <h2 className="text-3xl font-bold text-slate-100">Need Similar Architecture or Detection Modernization?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-300">
            I help organizations design resilient security architectures and automate detection workflows tailored to their environment.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/consulting"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900"
            >
              Explore Consulting
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-100"
            >
              Contact
            </Link>
          </div>
        </section>

        <motion.section {...sectionMotion} id="tech-stack" className="section-card border-slate-800 bg-surface-900/90 py-24">
          <h2 className="text-3xl font-bold text-slate-100">Tech Stack</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-slate-700 bg-surface-800/90 px-3 py-1.5 text-xs font-medium text-slate-300 sm:text-sm">
                {tech}
              </span>
            ))}
          </div>

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex rounded-full border border-slate-500 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
            >
              View Source on GitHub
            </a>
          ) : null}
        </motion.section>

        <div className="pb-10">
          <Link
            href="/projects"
            className="inline-flex rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-100"
          >
            Back to Projects
          </Link>
        </div>
      </article>

      <aside className="hidden lg:block">
        <nav className="sticky top-28 rounded-2xl border border-slate-800 bg-surface-900/95 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">On this page</p>
          <ul className="space-y-1.5">
            {sideNavSections.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                      isActive ? "bg-slate-100 text-slate-900" : "text-slate-300 hover:bg-surface-800 hover:text-slate-100"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
