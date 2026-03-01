"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projectCategories, projectsData } from "../data/projectsData";

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="space-y-10">
      <header className="section-card border-slate-700/70 bg-surface-900/80 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Case Studies</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-100 sm:text-5xl">Security Architecture & Engineering Outcomes</h1>
        <p className="mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">
          Premium case studies focused on architecture modernization, detection uplift, and automation-first SOC operations.
        </p>
      </header>

      <section className="section-card border-slate-700/70 bg-surface-900/80 py-8">
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((category) => {
            const isActive = activeFilter === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-slate-300 bg-slate-200 text-slate-900"
                    : "border-slate-700 bg-surface-800/80 text-slate-300 hover:border-slate-500 hover:text-slate-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          key={activeFilter}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="grid gap-5 md:grid-cols-2"
        >
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: index * 0.04, ease: "easeOut" }}
              className="section-card border-slate-700/70 bg-surface-900/85 p-7"
            >
              <span className="inline-flex w-fit rounded-full border border-slate-600 bg-surface-800/80 px-3 py-1 text-xs font-semibold text-slate-300">
                {project.category}
              </span>

              <h2 className="mt-4 text-2xl font-bold text-slate-100">{project.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.summary}</p>

              <Link
                href={`/projects/${project.slug}`}
                className="mt-6 inline-flex rounded-full border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
              >
                View Case Study
              </Link>
            </motion.article>
          ))}
        </motion.section>
      </AnimatePresence>
    </section>
  );
}

