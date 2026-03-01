export const projectCategories = [
  "All",
  "Security Architecture",
  "Detection Engineering",
  "Incident Response",
  "Security Automation",
  "CTI Automation",
];

export const projectsData = [
  {
    slug: "security-architecture-design",
    category: "Security Architecture",
    title: "Security Architecture Design",
    summary:
      "Designed an enterprise security architecture unifying telemetry, controls, and response workflows across cloud, identity, and endpoint layers.",
    problem:
      "The organization had fragmented tooling, inconsistent visibility, and no clear architecture linking prevention, detection, and response.",
    architectureOverview:
      "Built a layered control plane integrating SIEM, EDR, identity analytics, and response orchestration with ATT&CK-aligned telemetry mapping.",
    whatWasDesigned: [
      "Target-state security architecture blueprint",
      "Control-to-detection traceability model",
      "Incident escalation and ownership model",
      "Telemetry normalization and detection strategy",
    ],
    impact: [
      "30% improvement in detection coverage",
      "35% reduction in Mean Time to Contain",
      "95% endpoint compliance in regulated environments",
    ],
    techStack: ["Microsoft Sentinel", "Defender", "Azure AD", "KQL", "MITRE ATT&CK"],
    engagementType: "Architecture Modernization",
    github: "https://github.com/ASHDEX",
  },
  {
    slug: "detection-engineering-framework",
    category: "Detection Engineering",
    title: "Detection Engineering Framework",
    summary:
      "Established a governed detection lifecycle with ATT&CK alignment, quality checks, and production tuning standards.",
    problem:
      "Detection content was ad-hoc, noisy, and lacked ownership, resulting in analyst fatigue and missed high-value behavior.",
    architectureOverview:
      "Implemented a pipeline for use-case intake, rule design, validation, deployment, tuning, and retirement with measurable quality controls.",
    whatWasDesigned: [
      "Detection lifecycle governance model",
      "Standardized detection metadata and severity schema",
      "QA validation and tuning workflow",
      "Analyst feedback loop for precision improvements",
    ],
    impact: [
      "40% faster rule deployment",
      "28% reduction in false positives",
      "Improved detection confidence across SOC teams",
    ],
    techStack: ["Sigma", "KQL", "SIEM", "Python", "GitHub Actions"],
    engagementType: "Detection Uplift",
    github: "https://github.com/ASHDEX",
  },
  {
    slug: "soc-automation-pipeline",
    category: "Security Automation",
    title: "SOC Automation Pipeline",
    summary:
      "Automated enrichment, triage, and routing to reduce repetitive analyst work and improve response consistency.",
    problem:
      "Analysts were manually performing repetitive triage and case updates, slowing response and increasing burnout risk.",
    architectureOverview:
      "Designed event-driven enrichment and orchestration from alert intake to priority scoring, ticketing, and response workflow triggers.",
    whatWasDesigned: [
      "Automated IOC and context enrichment stage",
      "Priority scoring model for queue optimization",
      "Case-routing workflow with responder ownership",
      "Automated reporting outputs for operations leadership",
    ],
    impact: [
      "70–80% reduction in manual SOC triage",
      "Higher analyst throughput",
      "More consistent response operations",
    ],
    techStack: ["Python", "REST APIs", "SOAR", "SIEM", "Slack"],
    engagementType: "Automation Buildout",
    github: "https://github.com/ASHDEX",
  },
  {
    slug: "opencti-platform",
    category: "CTI Automation",
    title: "OpenCTI Platform",
    summary:
      "Centralized fragmented intelligence feeds into a relationship-aware CTI platform for analyst-ready context.",
    problem:
      "Threat intelligence feeds were disconnected and difficult to operationalize in detection and investigation workflows.",
    architectureOverview:
      "Deployed a graph-based CTI architecture with feed connectors, normalization, relationship mapping, and SOC-facing exports.",
    whatWasDesigned: [
      "OpenCTI platform architecture and deployment model",
      "Feed ingestion and normalization workflow",
      "Correlation and confidence scoring approach",
      "Analyst pivot workflow for campaign investigations",
    ],
    impact: [
      "Improved intelligence correlation speed",
      "Reduced duplicate indicators",
      "Stronger CTI-to-detection alignment",
    ],
    techStack: ["OpenCTI", "STIX/TAXII", "Docker", "GraphQL", "Python"],
    engagementType: "Architecture Modernization",
    github: "https://github.com/ASHDEX",
  },
  {
    slug: "cti-dashboard",
    category: "CTI Automation",
    title: "CTI Dashboard",
    summary:
      "Created executive and SOC views for threat trends, IOC confidence, and detection alignment across campaigns.",
    problem:
      "Security teams lacked a unified intelligence dashboard to prioritize action and measure CTI operational value.",
    architectureOverview:
      "Built a data presentation layer aggregating intel trends, confidence scoring, and ATT&CK context for operational decision-making.",
    whatWasDesigned: [
      "Trend dashboards by campaign, actor, and TTP",
      "IOC quality and freshness indicators",
      "SOC action and conversion tracking",
      "Leadership summary views",
    ],
    impact: [
      "Faster stakeholder reporting",
      "Improved prioritization of detection actions",
      "Better CTI transparency across teams",
    ],
    techStack: ["Next.js", "React", "Tailwind", "Chart.js", "Node.js"],
    engagementType: "Detection Uplift",
    github: "https://github.com/ASHDEX",
  },
  {
    slug: "domain-monitoring",
    category: "Incident Response",
    title: "Domain Monitoring",
    summary:
      "Automated domain-abuse detection and evidence packaging for rapid phishing and impersonation response.",
    problem:
      "Domain and brand abuse identification was manual, resulting in slow response and inconsistent investigation artifacts.",
    architectureOverview:
      "Designed continuous monitoring with domain enrichment, risk scoring, screenshot capture, and case-ready export workflow.",
    whatWasDesigned: [
      "Suspicious domain discovery process",
      "Domain risk scoring model",
      "Evidence automation pipeline for DFIR",
      "SOC alerting and case handoff flow",
    ],
    impact: [
      "Earlier phishing signal detection",
      "Faster incident escalation readiness",
      "Reduced manual investigation overhead",
    ],
    techStack: ["Python", "WHOIS/DNS APIs", "Puppeteer", "VirusTotal", "PostgreSQL"],
    engagementType: "Automation Buildout",
    github: "https://github.com/ASHDEX",
  },
  {
    slug: "ioc-enrichment",
    category: "Security Automation",
    title: "IOC Enrichment",
    summary:
      "Built a confidence-based enrichment service to improve IOC quality before SIEM and response workflows.",
    problem:
      "Raw indicators lacked confidence and context, generating noisy triage and inconsistent response decisions.",
    architectureOverview:
      "Implemented a multi-source enrichment and scoring pipeline with normalized output for SIEM and automation systems.",
    whatWasDesigned: [
      "Multi-source enrichment workflow",
      "Weighted confidence scoring model",
      "Normalized indicator output schema",
      "Caching and rate-limit resilience model",
    ],
    impact: [
      "Improved indicator quality for SOC decisions",
      "Reduced alert noise in downstream systems",
      "Faster triage and containment decisions",
    ],
    techStack: ["Node.js", "Python", "Redis", "REST APIs", "SIEM Connectors"],
    engagementType: "Automation Buildout",
    github: "https://github.com/ASHDEX",
  },
];

export function getProjectBySlug(slug) {
  return projectsData.find((project) => project.slug === slug) ?? null;
}

export const projectSlugs = projectsData.map((project) => project.slug);
