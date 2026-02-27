"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const filterTags = [
  "All",
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
    id: "enterprise-security-architecture-design",
    name: "Enterprise Security Architecture Design",
    category: "Cloud Security",
    tags: ["Security Architecture", "Zero Trust", "SIEM", "IAM", "Network Segmentation"],
    problem:
      "Security controls were deployed in silos, creating visibility gaps, inconsistent response paths, and duplicated tooling costs.",
    outcome:
      "Delivered a unified architecture with clear control ownership, improved detection depth, and faster incident coordination.",
    details: {
      problemStatement:
        "The organization lacked a cohesive target-state architecture connecting identity, telemetry, network boundaries, and SOC workflows.",
      architecture:
        "Identity & Access Layer → Segmented Network Zones → Telemetry Fabric → Detection Engineering Layer → SOAR/Case Management",
      built: [
        "Reference architecture for SIEM, EDR, CTI, and automation integration",
        "Control matrix mapping ATT&CK tactics to preventive/detective controls",
        "Implementation roadmap with phased migration and risk-priority sequencing",
      ],
      approach:
        "Architecture-first engineering: define trust boundaries, instrument high-value telemetry, and operationalize detections with measurable service-level outcomes.",
      impact:
        "~30% improvement in detection coverage, ~25% faster triage handoffs, and reduced overlap in security tooling spend.",
      github: "#",
    },
  },
  {
    id: "detection-framework",
    name: "Detection Engineering Framework (MITRE ATT&CK–Mapped Rules)",
    category: "Detection Engineering",
    tags: ["Microsoft Sentinel / SIEM", "Sigma", "MITRE ATT&CK", "Cloud Security"],
    problem: "Low-fidelity alerts and detection gaps.",
    outcome: "High-fidelity ATT&CK-mapped detections with reduced false positives.",
    details: {
      problemStatement:
        "Security monitoring had fragmented coverage and noisy detections, causing analyst fatigue and missed signals.",
      architecture:
        "Telemetry → Normalization → ATT&CK Mapping → Detection Rules (Sigma/KQL) → Enrichment → SOAR Routing → Case Mgmt",
      built: [
        "Detection content lifecycle with ATT&CK-aligned use cases",
        "Rule baselining, suppression logic, and confidence scoring",
        "SOC-ready alert context fields for faster triage",
      ],
      approach:
        "Behavior-based rule engineering with sequence detection, entity correlation, and false-positive suppression tuning.",
      impact:
        "Reduced false positives, improved analyst efficiency, and stronger detection coverage across high-risk techniques.",
      github: "#",
    },
  },
  {
    id: "threat-hunting-pack",
    name: "Threat Hunting Query Pack",
    category: "Threat Hunting",
    tags: ["KQL / SIEM queries", "Windows telemetry", "Detection Engineering"],
    problem: "No structured hunting coverage.",
    outcome: "Reusable hunts for credential abuse, lateral movement, persistence.",
    details: {
      problemStatement:
        "Hunting was ad-hoc and inconsistent, limiting proactive detection of stealthy attacker behavior.",
      architecture:
        "Telemetry → Hunt Query Packs → Hypothesis Validation → Detection Promotion → SOAR/Case Mgmt",
      built: [
        "Modular query packs by ATT&CK tactic",
        "Reusable hunt playbooks with validation criteria",
        "Hunt-to-detection conversion workflow",
      ],
      approach:
        "Focused on temporal patterns and cross-event chaining to identify subtle abuse pathways.",
      impact:
        "Improved hunt maturity and accelerated conversion of hunt findings into production detections.",
      github: "#",
    },
  },
  {
    id: "ir-toolkit-playbooks",
    name: "Incident Response Toolkit & Playbooks",
    category: "Incident Response (DFIR)",
    tags: ["Python", "DFIR tooling", "Log triage workflows"],
    problem: "Slow, inconsistent incident triage.",
    outcome: "Faster containment with standardized playbooks and tooling.",
    details: {
      problemStatement:
        "Incident handling varied by analyst, creating delays in evidence collection and containment decisions.",
      architecture:
        "Alert Intake → Triage Automation → Evidence Collection → Severity Model → Containment Actions → Case Mgmt",
      built: [
        "IR checklist and role-based response playbooks",
        "Automated triage scripts for common incident classes",
        "Evidence packaging for audit and post-incident review",
      ],
      approach:
        "IR-first design centered on repeatability, rapid containment, and clear escalation pathways.",
      impact:
        "Reduced MTTC and improved consistency and quality across incident response operations.",
      github: "#",
    },
  },
  {
    id: "soc-automation-pipelines",
    name: "SOC Automation Pipelines (SOAR-lite)",
    category: "Security Automation",
    tags: ["Python", "Teams", "Azure Logic Apps", "SharePoint"],
    problem: "Manual reporting and repetitive SOC tasks.",
    outcome: "Automated enrichment, reporting, and case workflows.",
    details: {
      problemStatement:
        "Analysts were spending substantial time on repetitive updates and manual status synchronization.",
      architecture:
        "Alerts → Enrichment Pipelines → Workflow Triggers → Reporting Automation → Case Mgmt Sync",
      built: [
        "Event-driven automations for SOC operational tasks",
        "Teams-to-Logic Apps orchestration for workflow execution",
        "SharePoint-based reporting and case status automation",
      ],
      approach:
        "Automation-first SOC engineering with reliability checks and exception-handling paths.",
      impact:
        "Lower operational overhead and significantly improved analyst time allocation.",
      github: "#",
    },
  },
  {
    id: "open-source-cti",
    name: "Open Source Threat Intelligence Platform",
    category: "CTI Automation",
    tags: ["OpenCTI", "STIX/TAXII", "MISP", "Docker"],
    problem: "Fragmented CTI sources.",
    outcome: "Unified CTI ingestion and correlation.",
    details: {
      problemStatement:
        "Threat intelligence feeds were disconnected, creating duplication and poor intelligence operationalization.",
      architecture:
        "Source Connectors → STIX/TAXII Normalization → Correlation Graph → Confidence Scoring → SOC Export",
      built: [
        "Containerized CTI platform deployment",
        "Automated feed ingestion and de-duplication",
        "Correlation and scoring pipelines for analyst-ready intelligence",
      ],
      approach:
        "CTI pipeline design with emphasis on data quality, confidence weighting, and actionable enrichment.",
      impact:
        "Improved intelligence consistency and accelerated detection and investigation workflows.",
      github: "#",
    },
  },
  {
    id: "attack-mapped-dashboard",
    name: "Threat Intelligence Dashboard (ATT&CK-Mapped)",
    category: "CTI Automation",
    tags: ["STIX", "TAXII", "MITRE ATT&CK"],
    problem: "No mapping between IOCs and adversary techniques.",
    outcome: "Real-time ATT&CK-aligned CTI dashboard.",
    details: {
      problemStatement:
        "SOC teams lacked visibility into how indicators aligned with adversary behavior and campaign context.",
      architecture:
        "IOC Intake → Technique Attribution → ATT&CK View Layer → Detection Gap Feedback → Case Mgmt",
      built: [
        "ATT&CK-mapped CTI dashboard with context panels",
        "Technique heatmaps for SOC prioritization",
        "Detection planning feedback integration",
      ],
      approach:
        "Behavior-context-first CTI representation to bridge indicator data with detection engineering decisions.",
      impact:
        "Better prioritization, improved ATT&CK coverage visibility, and stronger SOC decision-making.",
      github: "#",
    },
  },
  {
    id: "brand-domain-monitoring",
    name: "Brand & Domain Monitoring + Evidence Automation",
    category: "Security Tooling",
    tags: ["Python", "Whois", "Website screenshot automation", "Incident Response (DFIR)"],
    problem: "Manual phishing/impersonation domain detection and evidence collection.",
    outcome: "Automated detection and DFIR-ready evidence capture.",
    details: {
      problemStatement:
        "Phishing and impersonation monitoring relied on manual checks with slow, inconsistent evidence capture.",
      architecture:
        "Domain Intake → Whois/Metadata Enrichment → Risk Scoring → Screenshot Capture → DFIR Case Export",
      built: [
        "Automated suspicious domain discovery and scoring",
        "Visual evidence capture pipeline for investigations",
        "Case-ready reporting outputs for DFIR teams",
      ],
      approach:
        "Combined threat signal correlation with evidence automation for faster, defensible incident workflows.",
      impact:
        "Faster phishing response and improved quality of investigation artifacts.",
      github: "#",
    },
  },
  {
    id: "ioc-enrichment-scoring",
    name: "IOC Enrichment & Scoring Pipeline",
    category: "Security Automation",
    tags: ["Python", "OTX", "VirusTotal", "CTI Automation"],
    problem: "Raw IOCs with no prioritization.",
    outcome: "Enriched, scored indicators for faster investigations.",
    details: {
      problemStatement:
        "IOC volume was high, but analysts lacked confidence scoring for effective triage prioritization.",
      architecture:
        "IOC Ingest → Enrichment (OTX/VT) → Score Normalization → Priority Queue → SOAR/Case Mgmt",
      built: [
        "Multi-source enrichment adapters",
        "Weighted confidence scoring engine",
        "Investigation-priority export queues for SOC workflows",
      ],
      approach:
        "Automation design emphasizing source trust weighting and reduction of low-value indicator noise.",
      impact:
        "Improved triage speed and helped analysts focus on high-confidence threats.",
      github: "#",
    },
  },
];

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;

    return projects.filter((project) => {
      if (project.category === activeFilter) return true;
      return project.tags.includes(activeFilter);
    });
  }, [activeFilter]);

  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null;

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
            className="section-card flex flex-col border-cyan-300/25 transition hover:border-cyan-300/45 hover:bg-cyan-300/5"
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

            <button
              type="button"
              onClick={() => setSelectedProjectId(project.id)}
              className="mt-5 rounded-full border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
            >
              View Details
            </button>
          </article>
        ))}
      </section>

      {selectedProject ? (
        <section className="section-card border-cyan-300/35 bg-gradient-to-br from-cyan-300/10 via-surface-900/80 to-violet-300/10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Project Details</p>
              <h2 className="mt-1 text-2xl font-bold text-cyan-100">{selectedProject.name}</h2>
            </div>

            <button
              type="button"
              onClick={() => setSelectedProjectId(null)}
              className="rounded-full border border-slate-500/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200"
            >
              Close
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
              <h3 className="text-sm font-bold text-cyan-200">Problem Statement</h3>
              <p className="mt-2 text-sm text-slate-200">{selectedProject.details.problemStatement}</p>
            </article>

            <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
              <h3 className="text-sm font-bold text-cyan-200">Architecture Overview</h3>
              <p className="mt-2 text-sm text-slate-200">{selectedProject.details.architecture}</p>
            </article>

            <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
              <h3 className="text-sm font-bold text-cyan-200">What I Built</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
                {selectedProject.details.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
              <h3 className="text-sm font-bold text-cyan-200">Detection / IR / Automation Approach</h3>
              <p className="mt-2 text-sm text-slate-200">{selectedProject.details.approach}</p>
            </article>

            <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
              <h3 className="text-sm font-bold text-cyan-200">Security Value / Impact</h3>
              <p className="mt-2 text-sm text-slate-200">{selectedProject.details.impact}</p>
            </article>

            <article className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
              <h3 className="text-sm font-bold text-cyan-200">Tech Stack</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span key={`detail-${selectedProject.id}-${tag}`} className="rounded-full border border-cyan-300/25 px-2.5 py-1 text-xs text-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={selectedProject.details.github}
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-cyan-300 hover:underline"
              >
                GitHub / Demo (placeholder)
              </a>
            </article>
          </div>

          <p className="mt-5 text-sm text-slate-300">
            Architecture-first and IR-first design: each project emphasizes SOC pipelines, workflow automation, false-positive reduction, MTTC improvement, and analyst efficiency.
          </p>
        </section>
      ) : null}

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

