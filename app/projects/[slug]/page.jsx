import Link from "next/link";
import { notFound } from "next/navigation";

const projectCaseStudies = {
  "security-architecture-design": {
    title: "Security Architecture Design",
    problem:
      "Security controls were fragmented across endpoint, identity, network, and cloud layers. Detection coverage was inconsistent and incident workflows relied on manual triage.",
    architectureOverview:
      "Designed a layered architecture connecting telemetry ingestion, SIEM correlation, EDR integration, identity analytics, and SOAR-assisted response playbooks.",
    whatIBuilt: [
      "Unified security reference architecture for SOC + cloud + endpoint domains",
      "Telemetry normalization standards mapped to ATT&CK techniques",
      "Control-to-detection traceability model for audit and engineering teams",
      "Playbook-aligned escalation design with responder ownership paths",
    ],
    impact: ["30% detection coverage uplift", "35% MTTC reduction", "95% endpoint policy compliance"],
    techStack: ["Microsoft Sentinel", "Defender for Endpoint", "Azure AD", "KQL", "MITRE ATT&CK"],
    engagementType: "Architecture Modernization",
  },
  "detection-engineering-framework": {
    title: "Detection Engineering Framework",
    problem:
      "Rules were ad-hoc, tuning was inconsistent, and detections lacked lifecycle governance for quality, ownership, and false-positive management.",
    architectureOverview:
      "Built a detection lifecycle framework from use-case intake to validation, deployment, tuning, and retirement, aligned to ATT&CK and risk-priority scoring.",
    whatIBuilt: [
      "Rule design templates with standardized metadata and severity schema",
      "Detection QA checklist for logic validation and telemetry quality",
      "Versioned deployment flow with rollback support",
      "Post-deployment tuning loop with measurable precision metrics",
    ],
    impact: ["40% faster rule deployment", "28% false-positive reduction", "Improved detection ownership clarity"],
    techStack: ["KQL", "Sigma", "Python", "GitHub Actions", "Jira"],
    engagementType: "Detection Uplift",
  },
  "soc-automation-pipeline": {
    title: "SOC Automation Pipeline",
    problem:
      "Analysts spent excessive time on repetitive enrichment and triage tasks, causing alert fatigue and slower investigation cycles.",
    architectureOverview:
      "Introduced automation pipeline from alert ingestion to enrichment, scoring, ticket creation, and guided response actions.",
    whatIBuilt: [
      "Automated enrichment for IP/domain/hash context",
      "Priority scoring engine based on confidence and blast radius",
      "Ticket orchestration with standardized case payloads",
      "Playbook triggers for containment and notification steps",
    ],
    impact: ["70-80% triage time reduction", "Higher analyst throughput", "Consistent incident handoff quality"],
    techStack: ["Python", "SOAR", "SIEM", "REST APIs", "Slack Webhooks"],
    engagementType: "Automation Buildout",
  },
  "opencti-platform": {
    title: "OpenCTI Platform",
    problem:
      "Threat intel data was scattered across feeds and documents, with weak relationship mapping between actors, campaigns, and observables.",
    architectureOverview:
      "Deployed OpenCTI as a central intelligence graph integrated with feed ingestion, entity linking, and analyst-facing pivot workflows.",
    whatIBuilt: [
      "OpenCTI deployment architecture and ingestion connectors",
      "Data model mappings for STIX entities and relationships",
      "Automated feed normalization and deduplication routines",
      "Analyst workflows for campaign and indicator pivoting",
    ],
    impact: ["Improved intel correlation speed", "Better campaign visibility", "Reduced duplicated intel entries"],
    techStack: ["OpenCTI", "STIX/TAXII", "Docker", "GraphQL", "Python"],
    engagementType: "Architecture Modernization",
  },
  "cti-dashboard": {
    title: "CTI Dashboard",
    problem:
      "Leadership and SOC teams lacked a clear operational view of threat trends, IOC quality, and actionability of intelligence outputs.",
    architectureOverview:
      "Implemented dashboard layer aggregating CTI sources, enrichment confidence, campaign trends, and SOC action metrics.",
    whatIBuilt: [
      "Threat trend visualizations by actor, TTP, and sector",
      "IOC confidence scoring and freshness indicators",
      "Analyst action tracking for intel-to-detection conversion",
      "Executive summary views for weekly threat posture reporting",
    ],
    impact: ["Faster stakeholder reporting", "Improved intel prioritization", "Higher detection conversion from CTI"],
    techStack: ["Next.js", "React", "Tailwind CSS", "Chart.js", "Node.js"],
    engagementType: "Detection Uplift",
  },
  "domain-monitoring": {
    title: "Domain Monitoring",
    problem:
      "Brand impersonation and domain abuse signals were discovered late, increasing phishing exposure and response delays.",
    architectureOverview:
      "Designed continuous domain monitoring pipeline with WHOIS, DNS, SSL, screenshot capture, and risk scoring.",
    whatIBuilt: [
      "Automated domain discovery and watchlist management",
      "Risk scoring model based on lexical and infrastructure signals",
      "Evidence package generation for takedown workflows",
      "Alerting and case escalation integrations for SOC",
    ],
    impact: ["Earlier abuse detection", "Faster takedown readiness", "Reduced manual reconnaissance workload"],
    techStack: ["Python", "DNS/WHOIS APIs", "VirusTotal", "Puppeteer", "PostgreSQL"],
    engagementType: "Automation Buildout",
  },
  "ioc-enrichment": {
    title: "IOC Enrichment",
    problem:
      "Raw indicators lacked context and confidence, causing noisy detections and inconsistent blocking decisions.",
    architectureOverview:
      "Built enrichment service to correlate IOC reputation, passive DNS, sandbox signals, and historical sightings before downstream action.",
    whatIBuilt: [
      "Multi-source IOC enrichment worker pipeline",
      "Confidence scoring with weighted signal model",
      "Normalization format for SIEM and SOAR ingestion",
      "Caching and rate-limit controls for feed resilience",
    ],
    impact: ["Higher-quality IOC decisions", "Reduced alert noise", "Improved automated response confidence"],
    techStack: ["Node.js", "Python", "Redis", "REST APIs", "SIEM Connectors"],
    engagementType: "Automation Buildout",
  },
};

export function generateStaticParams() {
  return Object.keys(projectCaseStudies).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const project = projectCaseStudies[params.slug];

  if (!project) {
    return {
      title: "Project Not Found | ASHDEX",
    };
  }

  return {
    title: `${project.title} | Projects | ASHDEX`,
    description: `${project.title} case study covering architecture design, implementation, and measurable security impact.`,
  };
}

export default function ProjectCaseStudyPage({ params }) {
  const project = projectCaseStudies[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="section-card border-cyan-300/35 bg-gradient-to-br from-cyan-400/10 via-surface-900/80 to-violet-400/10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Project Case Study</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{project.title}</h1>
      </section>

      <section className="section-card space-y-4">
        <h2 className="text-xl font-bold text-cyan-100">Problem</h2>
        <p className="text-sm text-slate-300 sm:text-base">{project.problem}</p>
      </section>

      <section className="section-card space-y-4">
        <h2 className="text-xl font-bold text-cyan-100">Architecture Overview</h2>
        <p className="text-sm text-slate-300 sm:text-base">{project.architectureOverview}</p>
      </section>

      <section className="section-card space-y-4">
        <h2 className="text-xl font-bold text-cyan-100">What Was Designed</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-200 sm:text-base">
          {project.whatIBuilt.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section-card space-y-4">
        <h2 className="text-xl font-bold text-cyan-100">Engagement Type</h2>
        <p className="text-sm font-semibold text-cyan-200 sm:text-base">{project.engagementType}</p>
      </section>

      <section className="section-card space-y-4">
        <h2 className="text-xl font-bold text-cyan-100">Impact</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.impact.map((item) => (
            <article key={item} className="rounded-xl border border-cyan-300/25 bg-surface-800/70 p-4">
              <p className="text-base font-bold text-cyan-200">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card space-y-4">
        <h2 className="text-xl font-bold text-cyan-100">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="rounded-full border border-cyan-300/30 bg-surface-800/60 px-3 py-1.5 text-xs font-medium text-slate-200 sm:text-sm">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="section-card border-violet-300/35 bg-gradient-to-r from-violet-400/15 via-surface-900/80 to-cyan-400/15">
        <h2 className="text-2xl font-bold text-white">Looking to modernize your security operations?</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/consulting"
            className="inline-flex rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
          >
            Discuss a Consulting Engagement
          </Link>
        </div>
      </section>

      <div>
        <Link
          href="/projects"
          className="inline-flex rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
