import { ExperienceEntry } from '@/types';

export const experience: ExperienceEntry[] = [
  {
    company: 'Payatu',
    role: 'Lead Security Engineer',
    date: 'May 2025 – Present',
    location: 'Gurugram, Haryana',
    bullets: [
      'Built end-to-end threat intelligence automation aggregating 50+ cybersecurity RSS sources with auto-categorization, reducing manual triage by 70–80%',
      'Automated IOC enrichment (IPs, domains, hashes) via AlienVault OTX and VirusTotal with concurrent lookups and confidence scoring for faster SOC/IR investigations',
      'Delivered Microsoft Purview DLP across ~400 endpoints and 15+ data sources — 10+ custom SITs, trainable classifiers, 25+ DLP policies — improving classification accuracy ~40%',
      'Deployed and integrated Microsoft Defender, Intune, and Wazuh with 30+ custom security policies, achieving 95% endpoint compliance',
      'Built 30+ MITRE ATT&CK-mapped threat-hunting queries in Microsoft Sentinel, improving detection coverage ~30%',
      'Led incident response for active breach scenarios, reducing MTTC ~35% and driving 15+ prioritized remediation actions',
      'Designed full incident management policy and response program — severity models, escalation matrices, playbooks — improving SOC readiness ~40%',
      'Implemented Microsoft Teams → Azure Logic Apps → SharePoint Excel workflows eliminating manual security advisory entry',
    ],
    metrics: [
      { value: '↓70-80%', label: 'Manual Triage' },
      { value: '↓35%', label: 'MTTC' },
      { value: '95%', label: 'Endpoint Compliance' },
      { value: '↑30%', label: 'Detection Coverage' },
    ],
    tags: ['Microsoft Sentinel', 'Purview DLP', 'Defender', 'Wazuh', 'Intune', 'Azure Logic Apps', 'MITRE ATT&CK'],
  },
  {
    company: 'Coralogix',
    role: 'Cloud Incident Response',
    date: 'Sep 2024 – May 2025',
    location: 'Gurugram, Haryana',
    bullets: [
      'Reduced MTTD by 40% through cloud-native detections across CloudTrail, IAM, and VPC telemetry for privilege escalation and data exfiltration scenarios',
      'Decreased MTTR by 35% with automated containment playbooks — disabled compromised IAM identities and isolated workloads within minutes',
      'Led end-to-end response for high-severity cloud incidents including IAM compromise and misconfigured storage exposure',
      'Developed 30+ cloud detection use cases mapped to MITRE ATT&CK (Cloud), reducing false positives by 30% via contextual enrichment and behavioral baselining',
      'Enforced least-privilege IAM and guardrails, improving overall cloud security posture by 25%',
    ],
    metrics: [
      { value: '↓40%', label: 'MTTD' },
      { value: '↓35%', label: 'MTTR' },
      { value: '↓30%', label: 'False Positives' },
    ],
    tags: ['AWS CloudTrail', 'IAM', 'VPC Flow Logs', 'MITRE ATT&CK Cloud'],
  },
  {
    company: 'Bank of America',
    role: 'Insider Threat Management Officer',
    date: 'Sep 2023 – Sep 2024',
    location: 'Gurugram, Haryana',
    bullets: [
      'Implemented detection alerts for data exfiltration via alternate protocols (DNS/HTTPS tunneling)',
      'Created detection/response alerts for password spray attacks, Windows tampering, steganography tool usage, and cryptographic site monitoring',
      'Leveraged threat intelligence feeds to proactively identify insider threats, reducing data exfiltration incidents by 25%',
      'Contributed to insider threat playbooks incorporating threat intelligence insights, reducing IR times by 30%',
      'Applied external and internal threat intelligence to enhance monitoring rules — 15% reduction in false positives',
      'Deployed playbooks and runbooks for incident triage, reducing time by 30%',
    ],
    metrics: [
      { value: '↓25%', label: 'Exfil Incidents' },
      { value: '↓30%', label: 'IR Time' },
      { value: '↓15%', label: 'False Positives' },
    ],
    tags: ['Insider Threat', 'DNS Tunneling', 'Steganography', 'SIEM', 'Playbook Design'],
  },
  {
    company: 'Bank of America',
    role: 'Cyber Security Analyst',
    date: 'Sep 2021 – Aug 2023',
    location: 'Gurugram, Haryana',
    bullets: [
      'Monitored for malicious incidents and managed threats by blocking malicious IP/domains before user access — enabling proactive risk mitigation',
      'Identified and banned access to high-risk domains across 7,000+ users to prevent data exfiltration',
    ],
    tags: ['SOC', 'Threat Monitoring', 'Domain Blocking'],
  },
  {
    company: 'Detection & Response',
    role: 'Analyst — Detection and Response',
    date: 'Apr 2019 – Mar 2021',
    bullets: [
      'Designed and tuned EDM- and regex-based DLP detection policies to improve identification of sensitive data patterns',
      'Conducted periodic DLP policy reviews and user guidance to improve adherence and reduce policy noise',
      'Refined detection logic to reduce false positives and improve analyst triage efficiency',
    ],
    tags: ['DLP', 'Detection Logic', 'Regex', 'EDM'],
  },
  {
    company: 'CRMNext',
    role: 'Graduate Engineer Trainee',
    date: 'Apr 2021 – Aug 2021',
    location: 'Mumbai, Maharashtra',
    bullets: [
      'Implemented and managed CRM systems, improving data accuracy and achieving 15% increase in customer satisfaction',
      'Led CRM system upgrades and migrations with minimal business disruption',
    ],
    tags: ['CRM', 'System Migration'],
  },
];