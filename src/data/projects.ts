import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '01',
    name: 'Automated Security Scanner',
    problem: 'Security teams burned 6+ hours per sprint on ad-hoc vulnerability scans across web apps and cloud — no consistency, no audit trail, no CI integration.',
    approach: 'A CLI wrapping Nmap, Nuclei, and Trivy behind one interface. Scan profiles (web, cloud, container) are YAML-defined and version-controlled; output normalizes to a common schema and ships to Elasticsearch for trending.',
    outcome: 'Scan time cut from 6h to 22m. Wired into 4 CI/CD pipelines blocking critical findings pre-merge. 300+ vulns surfaced in 90 days.',
    tools: ['Python', 'Docker', 'Nmap', 'Nuclei', 'Trivy', 'Elasticsearch', 'GitLab CI'],
  },
  {
    id: '02',
    name: 'Threat Intelligence Dashboard',
    problem: 'Analysts context-switched across 8 threat feeds (MISP, VirusTotal, Shodan, AbuseIPDB) with no unified view — IOC correlation was manual and error-prone.',
    approach: 'React + Elasticsearch front-end fed by a Node.js aggregation service. A lightweight correlation engine dedups and scores IOCs by frequency, recency, and source confidence; alerts surface to Slack and the SIEM.',
    outcome: 'IOC triage time down 55%. Onboarded 3 new feeds with zero code changes. Analyst context switches per shift fell from 8 to 2.',
    tools: ['React', 'Node.js', 'Elasticsearch', 'MISP', 'Python', 'Redis', 'Slack API'],
  },
  {
    id: '03',
    name: 'Detection-as-Code Framework',
    problem: 'Detection rules lived in SIEM UIs — no version control, no peer review, no testing. One bad rule caused a 4-hour alert flood that buried tier-1.',
    approach: 'A Go CLI compiling Sigma rules to platform queries (Splunk, Elasticsearch, Chronicle), running unit tests against log fixtures, and gating deploys via GitLab CI. Rules are reviewed as pull requests.',
    outcome: 'Zero alert floods since rollout. Deploy cycle cut from 2 weeks to 4 hours. 180+ rules under version control with full test coverage.',
    tools: ['Go', 'Sigma', 'GitLab CI', 'Terraform', 'Splunk', 'Elasticsearch'],
  },
  {
    id: '04',
    name: 'Cloud Security Posture Automation',
    problem: 'Monthly manual AWS config audits produced stale findings — remediation lag averaged 45 days and misconfigured S3 buckets kept recurring.',
    approach: 'Continuous assessment with Cloud Custodian policies (IaC) deployed via AWS CDK. Violations trigger Lambda auto-remediation for safe fixes; risky changes open ServiceNow tickets instead.',
    outcome: 'Auto-fix remediation lag dropped from 45 days to 6 hours. Critical backlog cleared in 3 weeks. Continuous coverage replaced monthly snapshots.',
    tools: ['AWS CDK', 'Python', 'Cloud Custodian', 'Lambda', 'ServiceNow', 'Terraform'],
  },
];