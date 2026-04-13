'use client'

const auditClosures = [
  {
    framework: 'ISO 27001',
    scope: 'Information Security Management System',
    activities: [
      'Led end-to-end certification project across 12 control domains',
      'Developed 40+ security policies and supporting procedures',
      'Conducted gap analysis, risk treatment plans, and internal audits',
      'Coordinated with external auditors; managed evidence repository',
    ],
    outcome: '100% first-attempt certification — zero major non-conformities',
  },
  {
    framework: 'SOC 2 Type II',
    scope: 'Security, Availability, Confidentiality, Privacy, Processing Integrity',
    activities: [
      'Designed control environment aligned to TSC criteria',
      'Built automated evidence collection pipelines (Drata + custom scripts)',
      'Closed 35 audit findings within a single observation period',
      'Delivered management response and remediation documentation',
    ],
    outcome: 'Audit closed with 0 exceptions; re-attestation cycle reduced by 40%',
  },
  {
    framework: 'NIST CSF',
    scope: 'Identify · Protect · Detect · Respond · Recover',
    activities: [
      'Mapped 200+ technical controls to NIST CSF subcategories',
      'Created executive-facing risk dashboards from control test results',
      'Integrated CSF tiers into annual risk-assessment process',
      'Published implementation tier scores across all five functions',
    ],
    outcome: 'Organization advanced from Tier 1 → Tier 3 across all CSF functions',
  },
]

const policyAreas = [
  {
    domain: 'Data Governance',
    policies: [
      'Data Classification & Handling Policy',
      'Data Retention & Disposal Standard',
      'GDPR / CCPA Data Subject Rights Procedure',
      'Data Protection Impact Assessment (DPIA) Process',
    ],
    note: 'Implemented data-inventory system covering 200 TB of classified data across 50+ SaaS apps.',
  },
  {
    domain: 'Access & Identity',
    policies: [
      'Identity & Access Management Policy',
      'Privileged Access Standard',
      'Separation of Duties Matrix',
      'Access Recertification Procedure (quarterly)',
    ],
    note: 'Policy adoption reduced orphaned account risk by 65% across cloud and on-prem environments.',
  },
  {
    domain: 'Incident & Response',
    policies: [
      'Information Security Incident Response Policy',
      'Breach Notification Procedure (72-hour GDPR alignment)',
      'Business Continuity & Disaster Recovery Plan',
      'Third-Party Security Incident Escalation Process',
    ],
    note: 'Policies tested via tabletop exercises; MTTR improved 35% following procedure roll-out.',
  },
  {
    domain: 'Vendor & Third-Party',
    policies: [
      'Vendor Risk Assessment Framework',
      'Third-Party Security Requirements (contractual)',
      'SLA-based remediation tracking process',
      'Annual vendor re-assessment cadence',
    ],
    note: 'Assessed 120+ vendors annually; reduced high-risk third-party exposure by 50%.',
  },
]

const riskMetrics = [
  { value: '48%', label: 'Residual Risk Reduction', detail: 'Measured across enterprise risk register over 18 months' },
  { value: '200+', label: 'Risks Quantified', detail: 'Using FAIR model and RSA Archer workflows' },
  { value: '35', label: 'Audit Findings Closed', detail: 'Within single SOC 2 Type II observation period' },
  { value: '$2.4M', label: 'Risk Exposure Reduced', detail: 'Annualized loss expectancy delta, board-reported' },
]

const riskActivities = [
  'Maintained enterprise risk register with quarterly executive reporting',
  'Applied FAIR (Factor Analysis of Information Risk) for financial risk quantification',
  'Integrated risk scoring into SDLC — security review gates at design and pre-production',
  'Built automated control-testing pipelines reducing manual effort by 70%',
  'Established KRI dashboards in ServiceNow GRC with SLA breach alerting',
  'Ran annual risk appetite review aligned with board-level risk tolerance statements',
]

import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

export default function GRC() {
  return (
    <section id="grc" className="w-full pt-[120px] pb-[120px]">
      <div>
        <AnimateIn delay={0}>
          <div className="border-l border-[#00D9FF] pl-4 mb-6">
            <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::GOVERNANCE_LAYER ]</div>
            <h2 className="text-[30px] font-mono neon-blue">
              $ init governance.layer --frameworks=all<Cursor />
            </h2>
            <div className="text-gray-600 text-xs font-mono mt-1">
              <span className="text-[#00D9FF]/40">›</span> executing audit · policy · risk modules...
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
        {/* ── 01 Audit Closure ─────────────────────────────────────────── */}
        <div className="mb-12 font-mono">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[#00FF8C]/40 text-xs">[01]</span>
            <span className="text-xs tracking-widest text-gray-600">AUDIT CLOSURE</span>
          </div>

          {auditClosures.map((audit, idx) => (
            <div key={idx} className="border-b border-[#00FF8C]/8 py-5 last:border-0 group">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <span className="text-[#00FF8C] text-[15px]">{audit.framework}</span>
                <span className="text-gray-600 text-xs">{audit.scope}</span>
              </div>
              <ul className="space-y-1.5 mb-3">
                {audit.activities.map((act, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <span className="text-[#00FF8C]/40 text-xs mt-0.5 shrink-0">*</span>
                    <span className="text-[14px] leading-relaxed text-gray-400">{act}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2 pl-4 border-l border-[#00FF8C]/20">
                <span className="text-xs text-gray-600 tracking-widest shrink-0 mt-0.5">OUTCOME</span>
                <span className="text-[#00FF8C]/80 text-[14px] leading-relaxed">{audit.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── 02 Policy Design ─────────────────────────────────────────── */}
        <div className="mb-12 font-mono">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[#00FF8C]/40 text-xs">[02]</span>
            <span className="text-xs tracking-widest text-gray-600">POLICY DESIGN</span>
          </div>

          {policyAreas.map((area, idx) => (
            <div key={idx} className="border-b border-[#00FF8C]/8 py-4 last:border-0">
              <div className="text-[#00FF8C]/70 text-xs tracking-wider mb-2">{area.domain.toUpperCase()}</div>
              <ul className="space-y-1 mb-2">
                {area.policies.map((policy, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-[#00FF8C]/30 text-xs mt-0.5 shrink-0">▸</span>
                    <span className="text-[14px] leading-relaxed text-gray-400">{policy}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-xs leading-relaxed pl-4">{area.note}</p>
            </div>
          ))}
        </div>

        {/* ── 03 Risk Reduction ────────────────────────────────────────── */}
        <div className="mb-6 font-mono">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[#00FF8C]/40 text-xs">[03]</span>
            <span className="text-xs tracking-widest text-gray-600">RISK REDUCTION</span>
          </div>

          {/* Flat metrics list */}
          <div className="space-y-0 mb-8">
            {riskMetrics.map((m, idx) => (
              <div key={idx} className="flex items-baseline gap-4 py-2.5 border-b border-[#00FF8C]/5 last:border-0">
                <span className="text-[#00FF8C] text-[17px] font-bold w-16 shrink-0">{m.value}</span>
                <span className="text-gray-300 text-[14px] w-44 shrink-0">{m.label}</span>
                <span className="text-gray-600 text-xs">{m.detail}</span>
              </div>
            ))}
          </div>

          {/* Activities flat list */}
          <div className="text-xs text-gray-600 tracking-widest mb-3">RISK MANAGEMENT ACTIVITIES</div>
          <ul className="space-y-2">
            {riskActivities.map((act, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#00FF8C]/40 text-xs mt-0.5 shrink-0">*</span>
                <span className="text-[14px] leading-relaxed text-gray-400">{act}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 space-y-1 text-xs font-mono text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">›</span>
            <span>frameworks: NIST CSF · ISO 27001 · SOC 2 Type II · GDPR · CCPA · FAIR</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">›</span>
            <span>tooling: RSA Archer · ServiceNow GRC · Drata · custom Python automation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">└─</span>
            <span className="text-[#00FF8C]/40">GOVERNANCE_LAYER :: process complete [OK]</span>
          </div>
        </div>
        </AnimateIn>

      </div>
    </section>
  )
}
