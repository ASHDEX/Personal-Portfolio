"use client";

import { useState } from "react";
import Link from "next/link";

const recruiterRoles = [
  {
    role: "Lead Security Engineer",
    period: "2024 - Present",
    groups: [
      {
        title: "Scale & Environment",
        points: [
          "Delivered controls and detections across 400+ endpoints in enterprise and fintech environments",
          "Standardized telemetry and response workflows for high-velocity SOC operations",
        ],
      },
      {
        title: "Threat Intelligence Automation & CTI Engineering",
        points: [
          "Built end-to-end CTI automation aggregating 50+ RSS/API sources with enrichment and scoring",
          "Automated IOC enrichment (IPs, domains, hashes) using OTX + VirusTotal with concurrent lookups",
        ],
      },
      {
        title: "Detection Engineering & Threat Hunting",
        points: [
          "Built 30+ MITRE ATT&CK–mapped detections and hunting queries",
          "Developed MSRPC-specific alerts for unauthorized access detection",
        ],
      },
      {
        title: "DFIR Tooling & Evidence Automation",
        points: ["Built bulk domain intelligence and website snapshot → PDF reporting for DFIR"],
      },
      {
        title: "SOC Automation & Workflow Engineering",
        points: ["Implemented Teams → Azure Logic Apps → SharePoint Excel automation"],
      },
      {
        title: "Cloud, Endpoint Security & DLP",
        points: [
          "Delivered Microsoft Purview DLP across ~400 endpoints and 15+ data sources",
          "Designed 10+ SITs, classifiers, and 25+ DLP policies (≈40% accuracy gain, ≈30% violation reduction)",
          "Deployed Defender, Intune, and Wazuh achieving ~95% endpoint compliance",
        ],
      },
      {
        title: "Incident Response & Program Design",
        points: [
          "Led active IR engagements reducing MTTC by ~35%",
          "Designed severity models, escalation matrices, and playbooks",
        ],
      },
      {
        title: "Governance & Stakeholder Management",
        points: [
          "Delivered audit-ready IR/DLP artifacts enabling 100% audit closure",
          "Drove cross-functional collaboration with Risk, Compliance, and Audit teams for control validation and evidence readiness",
        ],
      },
    ],
  },
  {
    role: "Insider Threat / Detection Engineer",
    period: "2021 - 2024",
    groups: [
      {
        title: "Detection Engineering & Threat Hunting",
        points: [
          "Built detections for password spraying (long-duration), DNS/HTTPS exfiltration, steganography tools",
          "Created Windows tampering detections",
        ],
      },
      {
        title: "Threat Intelligence Integration",
        points: ["Integrated CTI into detections, reducing false positives by ~15%"],
      },
      {
        title: "Insider Threat Operations & IR Process",
        points: [
          "Reduced data exfiltration incidents by ~25%",
          "Authored SOPs and playbooks reducing triage time by ~30%",
        ],
      },
    ],
  },
  {
    role: "Analyst – Detection & Response",
    period: "2019 - 2021",
    groups: [
      {
        title: "DLP Engineering & Detection Tuning",
        points: [
          "Designed and tuned EDM- and regex-based DLP detections",
          "Reduced false positives and improved analyst triage efficiency",
        ],
      },
      {
        title: "Threat Detection & Prevention",
        points: [
          "Blocked malicious IPs/domains prior to user access",
          "Identified and blocked high-risk exfiltration domains impacting 7,000+ users",
        ],
      },
    ],
  },
  {
    role: "Graduate Engineer Trainee",
    period: "2021",
    groups: [
      {
        title: "Engineering Enablement",
        points: ["Supported enterprise tooling implementations and system migrations"],
      },
    ],
  },
];

const clientView = [
  {
    title: "Detection Engineering & Threat Hunting",
    problem: "Detection gaps and noisy alerts reduced SOC confidence and response speed.",
    solution:
      "Designed ATT&CK-aligned detections, long-duration correlation logic, and reusable threat hunting query packs.",
    outcome:
      "Higher detection precision, lower false positives, and faster identification of abuse, lateral movement, and persistence.",
    engagementModel:
      "Architecture-led detection sprint with iterative tuning, SOC analyst feedback loops, and stakeholder reporting checkpoints.",
  },
  {
    title: "Threat Intel Automation & SOC Enablement",
    problem: "Fragmented threat feeds and manual enrichment workflows created triage bottlenecks.",
    solution:
      "Built CTI pipelines for ingestion, normalization, enrichment, scoring, and SOC delivery using OTX/VirusTotal and APIs.",
    outcome: "Improved signal-to-noise and materially reduced analyst fatigue during investigations.",
    engagementModel:
      "Pipeline design and implementation engagement covering feed strategy, enrichment logic, and operational handover.",
  },
  {
    title: "DFIR Tooling & Incident Response Programs",
    problem: "Evidence collection and response coordination were inconsistent across incidents.",
    solution: "Delivered DFIR automation for domain intelligence, snapshot evidence capture, and structured IR playbooks.",
    outcome: "Reduced MTTC, improved containment consistency, and stronger case documentation quality.",
    engagementModel:
      "IR engineering engagement with playbook design, severity matrix alignment, and tabletop-ready workflow documentation.",
  },
  {
    title: "Cloud, Endpoint Security & DLP",
    problem: "Data protection controls and endpoint posture lacked consistency at scale.",
    solution:
      "Implemented Purview DLP, endpoint controls (Defender/Intune/Wazuh), and tuned policy architecture across data sources.",
    outcome: "Higher endpoint compliance, better policy accuracy, and lower violation rates.",
    engagementModel:
      "Cross-functional deployment model with platform teams, Risk, and Compliance to align security controls with business operations.",
  },
  {
    title: "Governance, Risk & Audit Readiness",
    problem: "Security controls existed but were not consistently translated into auditable artifacts.",
    solution: "Produced severity models, escalation matrices, SOPs, and audit-ready IR/DLP evidence sets.",
    outcome: "Stronger governance posture and successful audit closure outcomes.",
    engagementModel:
      "Governance-focused advisory with evidence workflows, control ownership mapping, and audit stakeholder readiness sessions.",
  },
];

const techStack = [
  "SIEM (Microsoft Sentinel, Splunk), Defender, Wazuh",
  "CTI (OpenCTI, MISP, STIX/TAXII, OTX, VirusTotal)",
  "Cloud (Azure, AWS)",
  "Frameworks (MITRE ATT&CK, IR Playbooks)",
  "Automation (Python, APIs, workflow automation)",
];

export default function ExperienceClient() {
  const [activeView, setActiveView] = useState("Recruiters");

  const recruiterHighlights = [
    { label: "Scope", value: "Security Architecture, Detection Engineering, IR, and SOC Automation" },
    { label: "Scale", value: "400+ endpoints in regulated enterprise and fintech environments" },
    { label: "Cross-functional", value: "Delivered with Risk, Compliance, and Audit stakeholders" },
    { label: "Audit Closure", value: "100% closure with audit-ready artifacts and controls evidence" },
    { label: "Operational Impact", value: "70–80% triage reduction, 30% coverage uplift, 35% MTTC improvement" },
  ];

  return (
    <section className="space-y-6">
      <header className="section-card">
        <h1 className="section-title">Experience</h1>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          Hands-on security engineering, detection, automation, and incident response across enterprise and fintech
          environments.
        </p>

        <div className="mt-5 inline-flex rounded-xl border border-cyan-300/30 bg-surface-800/60 p-1">
          {["Recruiters", "Clients"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveView(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeView === tab
                  ? "bg-cyan-300/20 text-cyan-100"
                  : "text-slate-300 hover:bg-cyan-300/10 hover:text-cyan-200"
              }`}
            >
              For {tab}
            </button>
          ))}
        </div>
      </header>

      {activeView === "Recruiters" ? (
        <div className="space-y-4">
          <section className="section-card">
            <h2 className="text-xl font-bold text-cyan-100">Recruiter Snapshot</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {recruiterHighlights.map((item) => (
                <article key={item.label} className="rounded-xl border border-cyan-300/20 bg-surface-800/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-300">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-200">{item.value}</p>
                </article>
              ))}
            </div>
          </section>

          {recruiterRoles.map((role) => (
            <article
              key={`${role.role}-${role.period}`}
              className="section-card border-cyan-300/25 transition hover:border-cyan-300/45"
            >
              <p className="text-sm font-semibold text-cyan-300">{role.period}</p>
              <h2 className="mt-1 text-xl font-bold text-cyan-100">{role.role}</h2>

              <div className="mt-4 space-y-4">
                {role.groups.map((group) => (
                  <div key={group.title} className="rounded-xl border border-cyan-300/15 bg-surface-800/60 p-4">
                    <span className="inline-flex rounded-full border border-violet-300/35 bg-violet-300/10 px-2.5 py-1 text-xs font-semibold text-violet-100">
                      {group.title}
                    </span>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-200">
                      {group.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clientView.map((item) => (
            <article
              key={item.title}
              className="section-card border-cyan-300/25 transition hover:border-cyan-300/45 hover:bg-cyan-300/5"
            >
              <h2 className="text-lg font-bold text-cyan-100">{item.title}</h2>
              <p className="mt-3 text-sm text-slate-200">
                <span className="font-semibold text-cyan-300">Client Problem:</span> {item.problem}
              </p>
              <p className="mt-2 text-sm text-slate-200">
                <span className="font-semibold text-cyan-300">Solution Delivered:</span> {item.solution}
              </p>
              <p className="mt-2 text-sm text-slate-200">
                <span className="font-semibold text-cyan-300">Security Outcome:</span> {item.outcome}
              </p>
              <p className="mt-2 text-sm text-slate-200">
                <span className="font-semibold text-cyan-300">Engagement Model:</span> {item.engagementModel}
              </p>
            </article>
          ))}
        </div>
      )}

      <section className="section-card">
        <h2 className="text-2xl font-bold text-cyan-100">Tech Stack Summary</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-cyan-300/30 bg-surface-800/70 px-3 py-1.5 text-xs font-medium text-slate-200 sm:text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section-card border-violet-300/35 bg-gradient-to-r from-violet-400/15 via-surface-900/80 to-cyan-400/15">
        <h2 className="text-2xl font-bold text-white">Need detection engineering or CTI automation for your SOC?</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/services"
            className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/25"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-violet-300/55 bg-violet-300/10 px-5 py-2.5 text-sm font-semibold text-violet-100 hover:bg-violet-300/20"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </section>
  );
}

