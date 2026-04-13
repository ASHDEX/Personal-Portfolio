export interface ExperienceBullet {
  verb: string
  text: string
}

export interface ExperienceMetric {
  label: string
  direction: '' | '↑' | '↓'
  value: string
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  summary: string
  bullets: ExperienceBullet[]
  metrics: ExperienceMetric[]
}

export const experiences: ExperienceEntry[] = [
  {
    company: 'CyberDefense Corp',
    role: 'Senior Security Engineer',
    period: '2022 – Present',
    summary: 'Owned the security engineering function across cloud and on-prem environments — driving detection maturity, compliance outcomes, and team capability.',
    bullets: [
      { verb: 'Designed and implemented', text: 'real‑time detection pipelines across AWS, Azure, and on-prem SIEM — cutting MTTD by 40% and false-positive volume by 30%.' },
      { verb: 'Led', text: 'red‑team exercises across 50+ cloud workloads, eliminating 40% of critical vulnerabilities within 60 days per engagement.' },
      { verb: 'Architected', text: 'microservices security framework adopted org-wide, delivering SOC 2 Type II compliance 2 months ahead of schedule.' },
      { verb: 'Mentored', text: '4 junior engineers with structured growth plans — team velocity improved 25%, two promoted to mid-level within 18 months.' },
    ],
    metrics: [
      { label: 'MTTD', direction: '↓', value: '40%' },
      { label: 'False Positives', direction: '↓', value: '30%' },
      { label: 'Critical Vulns', direction: '↓', value: '40%' },
    ],
  },
  {
    company: 'ThreatIntel LLC',
    role: 'Threat Hunter',
    period: '2020 – 2022',
    summary: 'Built the threat intelligence and detection engineering practice from the ground up — translating adversary TTPs into measurable detection coverage.',
    bullets: [
      { verb: 'Designed and deployed', text: '200+ behavioral detection rules mapped to MITRE ATT&CK, increasing detection coverage by 30% across endpoint and network layers.' },
      { verb: 'Led', text: 'investigation and containment of 15+ APT intrusions — reducing adversary dwell time from 90 days to 14 days on average.' },
      { verb: 'Automated', text: 'threat‑intelligence ingestion pipelines processing 10,000+ IOCs daily at 99.9% accuracy, replacing manual analyst triage.' },
      { verb: 'Influenced', text: 'C‑suite security investment strategy through executive-ready threat briefings — secured $2M tooling budget.' },
    ],
    metrics: [
      { label: 'Detection Coverage', direction: '↑', value: '30%' },
      { label: 'Dwell Time', direction: '↓', value: '84%' },
      { label: 'IOC Processing', direction: '', value: '10K+/day' },
    ],
  },
  {
    company: 'SecureTest Labs',
    role: 'Penetration Tester',
    period: '2018 – 2020',
    summary: 'Delivered offensive security assessments across web, mobile, and network attack surfaces — translating findings into actionable remediation roadmaps.',
    bullets: [
      { verb: 'Conducted', text: '100+ web and mobile application security assessments across financial, healthcare, and SaaS clients — surfacing 50+ critical vulnerabilities.' },
      { verb: 'Designed and executed', text: 'phishing and social‑engineering campaigns that improved employee threat-reporting rates by 60% post-training.' },
      { verb: 'Reduced', text: 'client network risk by 45% on average through targeted penetration tests across 20+ enterprise environments.' },
      { verb: 'Authored', text: '30+ executive and technical remediation reports — 95% client satisfaction across all engagements.' },
    ],
    metrics: [
      { label: 'Risk Reduction', direction: '↓', value: '45%' },
      { label: 'Phishing Reporting', direction: '↑', value: '60%' },
      { label: 'Client Satisfaction', direction: '', value: '95%' },
    ],
  },
  {
    company: 'BankSecure',
    role: 'Security Analyst',
    period: '2016 – 2018',
    summary: 'Established core SOC capabilities in a regulated financial environment — building the triage, response, and compliance foundations the team still operates on.',
    bullets: [
      { verb: 'Triaged', text: '500+ SIEM incidents monthly with 99% accuracy — maintained zero critical escalation misses across a 2-year tenure.' },
      { verb: 'Led', text: 'incident response for 10+ major security events, reducing MTTR by 40% through structured runbook development.' },
      { verb: 'Drove', text: 'ISO 27001 certification effort through evidence collection, gap remediation, and cross-functional coordination.' },
      { verb: 'Improved', text: 'team efficiency by 15 hours/week through automated reporting pipelines built in Python.' },
    ],
    metrics: [
      { label: 'MTTR', direction: '↓', value: '40%' },
      { label: 'Alert Accuracy', direction: '', value: '99%' },
      { label: 'Time Saved', direction: '', value: '15h/wk' },
    ],
  },
]