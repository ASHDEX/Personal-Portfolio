import { GRCFramework, GRCPolicyGroup, GRCRiskMetric } from '@/types';

export const frameworks: GRCFramework[] = [
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    fullName: 'Security, Availability, Confidentiality, Privacy, Processing Integrity',
    description: 'Designed and operationalized the control environment aligned to Trust Services Criteria across multiple fintech engagements.',
    contributions: [
      'Designed control environment aligned to TSC criteria across security, availability, and confidentiality principles',
      'Built automated evidence collection pipelines using custom scripts and GRC tooling to replace manual audit prep',
      'Partnered with IT, Risk, Compliance, Audit, and Senior Management to deliver audit-ready assurance artifacts',
      'Achieved 100% closure of data protection and incident response audit observations',
      'Closed all audit findings within a single observation period',
    ],
    outcome: '100% audit observation closure',
    outcomeLabel: 'SOC 2 READINESS',
  },
  {
    id: 'iso27001',
    name: 'ISO 27001 / 27002',
    fullName: 'Information Security Management System & Code of Practice',
    description: 'Mapped security controls to ISO 27001:2013 Annex A domains and applied ISO 27002 implementation guidance across enterprise environments.',
    contributions: [
      'Mapped technical and administrative controls to ISO 27001:2013 Annex A control domains',
      'Applied ISO 27002 implementation guidance for control selection, design, and operational effectiveness testing',
      'Developed security policies, procedures, and supporting documentation aligned to ISMS requirements',
      'Conducted gap analysis and risk treatment planning to drive remediation priorities',
      'Coordinated cross-functional evidence collection for external audit readiness',
    ],
    outcome: 'ISMS aligned',
    outcomeLabel: 'ISO 27001 CONTROLS',
  },
  {
    id: 'nist',
    name: 'NIST CSF / SP 800-53',
    fullName: 'Cybersecurity Framework & Security and Privacy Controls',
    description: 'Mapped detection and response capabilities to NIST CSF functions and selected SP 800-53 control families for cloud and enterprise environments.',
    contributions: [
      'Mapped 30+ detection use cases and response playbooks to NIST CSF Detect and Respond functions',
      'Applied SP 800-53 control families (AC, AU, IR, SI, SC) as the reference baseline for cloud security posture assessments',
      'Integrated NIST CSF maturity tiers into risk reporting and executive dashboards',
      'Used SP 800-53 control selection to validate IAM least-privilege enforcement and logging adequacy across AWS environments',
      'Aligned incident management program design (severity models, escalation matrices) to NIST IR control family',
    ],
    outcome: 'Detection ↔ NIST mapped',
    outcomeLabel: 'CSF COVERAGE',
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    fullName: 'General Data Protection Regulation (EU)',
    description: 'Implemented data protection controls and DLP policies to support GDPR compliance across data classification, breach notification, and data subject rights workflows.',
    contributions: [
      'Delivered Microsoft Purview DLP implementation with 10+ custom Sensitive Information Types (SITs) designed to identify and classify personal data categories under GDPR (Art. 4, Art. 9)',
      'Designed 25+ DLP policies enforcing data minimization and purpose limitation principles across 15+ data sources and ~400 endpoints',
      'Built trainable classifiers to detect and prevent unauthorized processing of personal data via email, browser uploads, and cloud storage',
      'Supported breach notification readiness by designing incident management workflows aligned to 72-hour notification requirements (Art. 33)',
      'Implemented data flow mapping to identify cross-border data transfers requiring safeguards under Chapter V',
    ],
    outcome: '↓30% data violations',
    outcomeLabel: 'GDPR COMPLIANCE',
  },
  {
    id: 'first',
    name: 'FIRST',
    fullName: 'Forum of Incident Response and Security Teams',
    description: 'Applied FIRST frameworks and best practices to structure incident response capabilities, CSIRT operations, and threat intelligence sharing.',
    contributions: [
      'Designed and operationalized incident management programs following FIRST CSIRT framework — including severity classification, escalation matrices, and response playbooks',
      'Applied FIRST\'s CVSS (Common Vulnerability Scoring System) for vulnerability prioritization in remediation workflows',
      'Structured threat intelligence sharing processes aligned to FIRST Traffic Light Protocol (TLP) for inter-organizational CTI exchange',
      'Built incident response procedures incorporating FIRST best practices for evidence handling, containment, eradication, and post-incident review',
      'Used FIRST SIG (Special Interest Group) guidance on CSIRT maturity to benchmark and improve SOC response readiness (~40% improvement)',
    ],
    outcome: '↑40% SOC readiness',
    outcomeLabel: 'CSIRT MATURITY',
  },
];

export const policyGroups: GRCPolicyGroup[] = [
  {
    title: 'Data Protection & Privacy',
    policies: [
      'Data Classification & Handling Policy',
      'Data Retention & Disposal Standard',
      'GDPR Data Subject Rights Procedure',
      'Data Protection Impact Assessment (DPIA) Process',
      'Cross-Border Data Transfer Safeguards',
    ],
    impact: 'DLP program covering ~400 endpoints with 25+ policies and 10+ custom SITs — classification accuracy improved ~40%',
  },
  {
    title: 'Incident Response & Management',
    policies: [
      'Information Security Incident Response Policy',
      'Severity Classification & Escalation Matrix',
      'Breach Notification Procedure (72-hour GDPR alignment)',
      'Incident Response Playbooks & Runbooks',
      'Post-Incident Review & Lessons Learned Process',
    ],
    impact: 'Full IR program design — MTTC reduced ~35%, SOC response readiness improved ~40%',
  },
  {
    title: 'Access & Identity Governance',
    policies: [
      'Identity & Access Management Policy',
      'Privileged Access Management Standard',
      'Least-Privilege IAM Enforcement (Cloud)',
      'Access Recertification Procedure',
    ],
    impact: 'Enforced least-privilege across AWS/Azure — cloud security posture improved 25%, IAM misconfigurations reduced 90%',
  },
  {
    title: 'Endpoint & Cloud Security',
    policies: [
      'Endpoint Security Compliance Policy',
      'Cloud Security Posture Management Standard',
      'Microsoft Defender / Intune / Wazuh Policy Set (30+ policies)',
      'Continuous Monitoring & Drift Detection',
    ],
    impact: 'Achieved 95% endpoint compliance with centralized visibility across Defender, Intune, and Wazuh',
  },
];

export const riskMetrics: GRCRiskMetric[] = [
  { value: '100%', label: 'Audit Closure', detail: 'All data protection and IR audit observations closed' },
  { value: '↓30%', label: 'Data Violations', detail: 'Business-impacting violations reduced via Purview DLP' },
  { value: '↑40%', label: 'SOC Readiness', detail: 'Post incident management program operationalization' },
  { value: '95%', label: 'Endpoint Compliance', detail: 'Across Defender, Intune, and Wazuh policies' },
  { value: '↓35%', label: 'MTTC Reduction', detail: 'Mean time to contain via structured IR program' },
  { value: '25+', label: 'DLP Policies', detail: 'Custom policies across 15+ data sources' },
];
