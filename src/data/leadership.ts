// Leadership page: how I lead, who I answer to, the architecture I own and how I run client programs.
// Entries marked `draft` were written from the owner's answers and need their confirmation before launch.

export interface LeadershipDecision {
  org: string;
  context: string;
  decision: string;
  result: string;
}

export const leadership = {
  headline: 'I lead small senior teams, own the security architecture, and answer for it to boards and regulators.',
  team: {
    size: '4–5',
    where: 'Payatu',
    makeup: ['Security analysts', 'Security engineers', 'Incident responders'],
    points: [
      'Run incident response on active breaches, from triage to containment and remediation',
      'Set the severity model, escalation matrix and playbooks the team works to',
      'Own the platform roadmap the engineers build on: Sentinel, Purview DLP, Defender, Intune, Wazuh',
    ],
  },
  reporting: [
    { audience: 'Internal leadership', what: 'Security posture, program progress and incident outcomes', draft: true },
    { audience: 'Client executives', what: 'Incident findings, containment decisions and remediation plans', draft: true },
    { audience: 'Boards and regulators', what: 'Program strategy and alignment to SEBI, RBI and ISO 27001', draft: true },
  ],
  decisions: [
    {
      org: 'Payatu',
      context: 'Endpoints and data sources with no unified detection, DLP or compliance baseline',
      decision: 'Standardized on Microsoft Sentinel, Purview DLP and Defender with Intune and Wazuh, under one incident management program',
      result: '95% endpoint compliance · classification accuracy ↑~40% · detection coverage ↑~30%',
    },
    {
      org: 'Coralogix',
      context: 'Cloud incidents detected late and contained by hand',
      decision: 'Cloud-native detection on CloudTrail, IAM and VPC telemetry, with automated containment and least-privilege guardrails',
      result: 'MTTD ↓40% · MTTR ↓35% · posture ↑25%',
    },
    {
      org: 'Bank of America',
      context: 'Insider exfiltration through channels standard monitoring missed',
      decision: 'Intel-enriched insider-threat detections for DNS and HTTPS tunnelling, steganography and password spraying',
      result: 'Exfil incidents ↓25% · IR time ↓30% · false positives ↓15%',
    },
  ] as LeadershipDecision[],
  engagement: {
    where: 'Payatu and Coralogix',
    steps: [
      { name: 'Assess', what: 'Scope the incident or the gap, and the regulatory context' },
      { name: 'Contain', what: 'Stop the bleeding: revoke access, isolate hosts, recover what can be recovered' },
      { name: 'Build', what: 'Stand up the controls and detections the client was missing' },
      { name: 'Operate', what: 'Run the program with the client team until it holds' },
      { name: 'Hand over', what: 'Playbooks, escalation paths and SLAs the client owns' },
    ],
    example: {
      title: 'SWIFT payment fraud at a regulated fintech',
      outcome: 'Detection gap 72h → under 1h · three compromises contained · full SOC and IR program live in 4 weeks · aligned to SEBI, RBI and ISO 27001',
    },
  },
};
