export interface Project {
  id: string
  name: string
  problem: string
  approach: string
  tools: string[]
  outcome: string
}

export const projects: Project[] = [
  {
    id: '01',
    name: 'Automated Security Scanner',
    problem:
      'Security teams wasted 6+ hours per sprint manually running ad-hoc vulnerability scans across web apps and cloud infrastructure — no consistency, no audit trail, no CI integration.',
    approach:
      'Built a CLI tool that wraps Nmap, Nuclei, and Trivy behind a unified interface. Scan profiles (web, cloud, container) are YAML-defined and version-controlled. Output is normalized to a common schema and pushed to Elasticsearch for trending.',
    tools: ['Python', 'Docker', 'Nmap', 'Nuclei', 'Trivy', 'Elasticsearch', 'GitLab CI'],
    outcome:
      'Scan time cut from 6 hours to 22 minutes. Integrated into 4 CI/CD pipelines; blocking critical findings before merge. 300+ vulnerabilities surfaced in first 90 days.',
  },
  {
    id: '02',
    name: 'Threat Intelligence Dashboard',
    problem:
      'Analysts were context-switching across 8 separate threat feeds (MISP, VirusTotal, Shodan, AbuseIPDB) with no unified view — IOC correlation was manual and error-prone.',
    approach:
      'Designed a React + Elasticsearch front-end that ingests feeds via a Node.js aggregation service. A lightweight correlation engine deduplicates and scores IOCs by frequency, recency, and source confidence. Alerts surface to Slack and SIEM.',
    tools: ['React', 'Node.js', 'Elasticsearch', 'MISP', 'Python', 'Redis', 'Slack API'],
    outcome:
      'IOC triage time reduced by 55%. Team onboarded 3 new threat feeds without code changes. Average analyst context switches per shift dropped from 8 to 2.',
  },
  {
    id: '03',
    name: 'Detection-as-Code Framework',
    problem:
      'Detection rules lived in SIEM UIs — no version control, no peer review, no automated testing. A single bad rule caused a 4-hour alert flood that overwhelmed tier-1.',
    approach:
      'Wrote a Go CLI that compiles Sigma rules to platform-specific queries (Splunk, Elasticsearch, Chronicle), runs unit tests against sample log fixtures, and gates deployments via GitLab CI. Rules are reviewed as pull requests.',
    tools: ['Go', 'Sigma', 'GitLab CI', 'Terraform', 'Splunk', 'Elasticsearch'],
    outcome:
      'Zero alert-flood incidents since rollout. Rule deployment cycle reduced from 2 weeks to 4 hours. 180+ rules now under version control with full test coverage.',
  },
  {
    id: '04',
    name: 'Cloud Security Posture Automation',
    problem:
      'Monthly manual audits of AWS configuration produced stale findings — remediation lag averaged 45 days and misconfigured S3 buckets were a recurring gap.',
    approach:
      'Built a continuous assessment toolkit using Cloud Custodian policies (IaC-defined) deployed via AWS CDK. Violations trigger Lambda-based auto-remediation for safe fixes (e.g., block public S3 access); risky changes create ServiceNow tickets instead.',
    tools: ['AWS CDK', 'Python', 'Cloud Custodian', 'Lambda', 'ServiceNow', 'Terraform'],
    outcome:
      'Remediation lag dropped from 45 days to 6 hours for auto-fixable findings. Critical misconfiguration backlog cleared in 3 weeks. Continuous coverage replaced monthly snapshots.',
  },
]