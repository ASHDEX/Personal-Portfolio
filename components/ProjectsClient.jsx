"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const filterTags = [
  "All",
  "Security Architecture",
  "Detection Engineering",
  "Threat Hunting",
  "Incident Response (DFIR)",
  "Security Automation",
  "CTI Automation",
  "Security Tooling",
  "Cloud Security",
];

const projects = [
  {
    id: "security-architecture-design",
    slug: "security-architecture-design",
    name: "Security Architecture Design",
    category: "Security Architecture",
    tags: ["Security Architecture", "SIEM", "EDR", "Zero Trust"],
    problem:
      "Security controls and telemetry pipelines were fragmented across cloud, endpoint, and identity, creating inconsistent risk visibility.",
    outcome: "Unified architecture baseline with measurable detection and containment improvements.",
  },
  {
    id: "detection-engineering-framework",
    slug: "detection-engineering-framework",
    name: "Detection Engineering Framework",
    category: "Detection Engineering",
    tags: ["MITRE ATT&CK", "Sigma", "KQL", "SIEM"],
    problem: "Detection content lacked lifecycle governance, ownership standards, and tuning discipline.",
    outcome: "Higher-fidelity detections, faster rule delivery, and stronger analyst trust in alert quality.",
  },
  {
    id: "soc-automation-pipeline",
    slug: "soc-automation-pipeline",
    name: "SOC Automation Pipeline",
    category: "Security Automation",
    tags: ["SOAR", "Python", "Workflow Automation", "Case Management"],
    problem: "Manual triage and repetitive workflows were reducing SOC throughput and consistency.",
    outcome: "Automated triage pipeline that reduced manual load and improved operational consistency.",
  },
  {
    id: "opencti-platform",
    slug: "opencti-platform",
    name: "OpenCTI Platform",
    category: "CTI Automation",
    tags: ["OpenCTI", "STIX/TAXII", "MISP", "Docker"],
    problem: "Threat intelligence data was fragmented with weak actor-to-indicator correlation context.",
    outcome: "Centralized intelligence graph enabling analyst-ready context and faster pivots.",
  },
  {
    id: "cti-dashboard",
    slug: "cti-dashboard",
    name: "CTI Dashboard",
    category: "CTI Automation",
    tags: ["STIX", "TAXII", "MITRE ATT&CK"],
    problem: "Security leadership and SOC lacked a shared operational view of intelligence quality and trends.",
    outcome: "Decision-ready CTI reporting with ATT&CK alignment and action-focused visibility.",
  },
  {
    id: "domain-monitoring",
    slug: "domain-monitoring",
    name: "Domain Monitoring",
    category: "Security Tooling",
    tags: ["Whois", "DNS", "Risk Scoring", "Evidence Automation"],
    problem: "Brand abuse detection and evidence collection were manual and too slow for modern phishing campaigns.",
    outcome: "Automated domain risk monitoring with DFIR-ready evidence generation.",
  },
  {
    id: "ioc-enrichment",
    slug: "ioc-enrichment",
    name: "IOC Enrichment",
    category: "Security Automation",
    tags: ["OTX", "VirusTotal", "Scoring", "SIEM Integration"],
    problem: "Raw IOC feeds lacked confidence and context, causing noisy triage and inconsistent response decisions.",
    outcome: "Context-rich, confidence-scored IOC pipeline integrated into SOC response workflows.",
  },
];

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;

    return projects.filter((project) => {
      if (project.category === activeFilter) return true;
      return project.tags.includes(activeFilter);
    });
  }, [activeFilter]);

  return (
    <section className="space-y-6">
      <header className="section-card">
        <h1 className="section-title">Projects</h1>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          Hands-on security engineering: detection engineering, IR tooling, CTI automation, and security pipelines.
        </p>
      </header>

      <section className="section-card">
        <h2 className="text-lg font-bold text-cyan-100">Project Filters</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {filterTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveFilter(tag)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                activeFilter === tag
                  ? "border-cyan-300/70 bg-cyan-300/20 text-cyan-100"
                  : "border-cyan-300/25 bg-surface-800/60 text-slate-300 hover:border-cyan-300/50 hover:text-cyan-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="section-card interactive-card flex flex-col border-cyan-300/25"
          >
            <span className="inline-flex w-fit rounded-full border border-violet-300/35 bg-violet-300/10 px-2.5 py-1 text-xs font-semibold text-violet-100">
              {project.category}
            </span>

            <h2 className="mt-3 text-lg font-bold text-cyan-100">{project.name}</h2>
            <p className="mt-2 text-sm text-slate-300">{project.problem}</p>

            <p className="mt-2 text-sm text-cyan-300">Outcome: {project.outcome}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={`${project.id}-${tag}`}
                  className="rounded-full border border-cyan-300/25 bg-surface-800/70 px-2.5 py-1 text-xs text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="mt-5 inline-flex w-fit rounded-full border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
            >
              View Case Study
            </Link>
          </article>
        ))}
      </section>

      <section className="section-card border-violet-300/35 bg-gradient-to-r from-violet-400/15 via-surface-900/80 to-cyan-400/15">
        <h2 className="text-2xl font-bold text-white">
          Need detection engineering, IR tooling, or security automation for your SOC?
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/services"
            className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
          >
            Explore Services
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-violet-300/55 bg-violet-300/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-300/20"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </section>
  );
}

