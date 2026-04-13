'use client'

import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

const caseStudies = [
  {
    id: '01',
    severity: 'CRITICAL',
    title: 'Cloud IAM Privilege Escalation',
    tags: ['AWS', 'IAM', 'CI/CD', 'CloudTrail'],
    scenario: 'A FinTech startup AWS environment exhibited anomalous IAM activity. Initial logs showed unauthorized AssumeRole calls originating from a developer account -- outside business hours, from an unfamiliar region.',
    investigation: 'Traced the attack chain using CloudTrail and VPC Flow Logs. Discovered a misconfigured IAM policy granting sts:AssumeRole on a privileged cross-account role. Root cause: attacker obtained short-lived credentials via a compromised CI/CD pipeline secret exposed in a public GitHub Actions log.',
    response: 'Immediately revoked all active sessions for the compromised identity. Enforced session-timeout policies org-wide and mandated MFA for all IAM principals. Deployed CloudWatch alarms and a Lambda-based auto-remediation function to detect and block anomalous AssumeRole patterns within 60 seconds.',
    metrics: [
      { label: 'IAM Misconfigurations', direction: 'down', value: '90%' },
      { label: 'Detection Latency', direction: 'down', value: '<60s' },
      { label: 'SOC 2 IAM Controls', direction: '', value: 'PASSED' },
    ],
    impact: 'Prevented lateral movement to production databases containing 2M+ customer records. Automated policy validation eliminated the misconfiguration class entirely.',
  },
  {
    id: '02',
    severity: 'HIGH',
    title: 'Advanced Persistent Threat in Healthcare Network',
    tags: ['APT', 'DNS Tunneling', 'Memory Forensics', 'YARA'],
    scenario: 'A regional healthcare provider reported intermittent network slowdowns and low-volume outbound connections to unrecognized IPs. EDR telemetry was sparse -- the adversary had deliberately stayed below alert thresholds.',
    investigation: 'Conducted live memory forensics on three affected endpoints using Volatility. Uncovered a custom-built implant communicating over DNS tunneling for C2 -- requests encoded as base32 subdomains averaging 4 bytes/query to evade volume detection. Correlated firewall logs with VirusTotal and OTX threat-intel to fingerprint adversary infrastructure.',
    response: 'Isolated compromised hosts, rebuilt from verified golden images, and deployed network microsegmentation. Implemented DNS sinkholing for the adversary domains. Authored YARA signatures for the implant family and pushed to all EDR agents. Ran a purple-team exercise 72 hours post-containment to validate detection coverage.',
    metrics: [
      { label: 'Containment Time', direction: '', value: '48h' },
      { label: 'Dwell Time', direction: 'down', value: '60d to 2d' },
      { label: 'DNS Exfil Detection', direction: 'up', value: '70%' },
    ],
    impact: 'Full eradication confirmed via threat-hunt sweep. Zero patient data exfiltrated. Detection engineering improvements closed the DNS tunneling gap across the entire enterprise.',
  },
  {
    id: '03',
    severity: 'HIGH',
    title: 'Supply-Chain Attack via Third-Party Library',
    tags: ['Supply Chain', 'SBOM', 'Binary Diffing', 'CI/CD'],
    scenario: 'An e-commerce platform nightly dependency scan flagged an npm library with an anomalous recent update. The version bump contained no changelog entry and increased package size by 18 KB -- a red flag for injection.',
    investigation: 'Performed binary diffing between the legitimate and compromised release using Diaphora. Identified a 47-line backdoor that collected process environment variables and exfiltrated them over HTTPS to an attacker-controlled endpoint at first import. Traced the compromise to a maintainer GitHub account takeover via credential stuffing -- no MFA enabled.',
    response: 'Immediately pinned the dependency to the last clean version and deployed a hotfix across all environments within 90 minutes. Rotated all environment secrets as a precaution. Notified the open-source maintainer and filed a CVE. Implemented SBOM generation at build time and added hash-pinned lockfiles to block unsigned updates.',
    metrics: [
      { label: 'Users Protected', direction: '', value: '50,000+' },
      { label: 'MTTP', direction: 'down', value: '30d to 4h' },
      { label: 'Supply Chain Coverage', direction: 'up', value: '100%' },
    ],
    impact: 'Zero credential leakage confirmed via log analysis. SBOM process adopted across all 12 engineering teams. Patch SLA reduced from 30 days to 4 hours for dependency vulnerabilities.',
  },
]

const severityColor: Record<string, string> = {
  CRITICAL: 'text-red-400 border-red-400/40',
  HIGH: 'text-orange-400 border-orange-400/40',
}

export default function CaseStudies() {
  return (
    <section id="casestudies" className="w-full pt-[120px] pb-[120px]">
      <div>
        <AnimateIn delay={0}>
          <div className="border-l border-[#00D9FF] pl-4 mb-6">
            <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::INCIDENT_RESPONSE ]</div>
            <h2 className="text-[30px] font-mono neon-blue">
              $ load ir.cases --classification=active<Cursor />
            </h2>
            <div className="text-gray-600 text-xs font-mono mt-1">
              <span className="text-[#00D9FF]/40">›</span> executing incident review --depth=full
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="space-y-0">
            {caseStudies.map((study, idx) => (
              <div key={idx}>
                <div className="font-mono py-10">

                  {/* Case header */}
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <span className="text-[#00FF8C]/50 text-xs">[{study.id}]</span>
                    <h3 className="text-[19px] text-[#E5E7EB]">
                      <span className="neon-green">INCIDENT:</span> {study.title}
                    </h3>
                    <span className={`text-xs border px-2 py-0.5 ${severityColor[study.severity]}`}>
                      {study.severity}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-600 border border-gray-800 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Sections */}
                  <div className="space-y-6">
                    <div className="border-l-2 border-[#00D9FF]/30 pl-4">
                      <div className="text-xs text-[#00D9FF]/60 tracking-widest mb-2">SCENARIO</div>
                      <p className="text-[15px] leading-relaxed text-gray-300">{study.scenario}</p>
                    </div>

                    <div className="border-l-2 border-[#00FF8C]/30 pl-4">
                      <div className="text-xs text-[#00FF8C]/60 tracking-widest mb-2">INVESTIGATION</div>
                      <p className="text-[15px] leading-relaxed text-gray-300">{study.investigation}</p>
                    </div>

                    <div className="border-l-2 border-[#00FF8C]/30 pl-4">
                      <div className="text-xs text-[#00FF8C]/60 tracking-widest mb-2">RESPONSE</div>
                      <p className="text-[15px] leading-relaxed text-gray-300">{study.response}</p>
                    </div>

                    <div className="border-l-2 border-[#00FF8C]/60 pl-4">
                      <div className="text-xs text-[#00FF8C]/60 tracking-widest mb-3">IMPACT</div>
                      <div className="flex flex-wrap gap-6 mb-4">
                        {study.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="flex items-baseline gap-1.5">
                            <span className="text-gray-600 text-xs">{metric.label}</span>
                            {metric.direction === 'down' && (
                              <span className="text-xs text-[#00D9FF]">↓</span>
                            )}
                            {metric.direction === 'up' && (
                              <span className="text-xs text-[#00FF8C]">↑</span>
                            )}
                            <span className="text-[#00FF8C] text-sm font-bold">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[15px] leading-relaxed text-gray-400">{study.impact}</p>
                    </div>
                  </div>
                </div>

                {idx < caseStudies.length - 1 && (
                  <div className="section-divider" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-1 text-xs font-mono text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>process complete — 3 incidents reviewed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>details sanitized for confidentiality</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">└─</span>
              <span className="text-[#00FF8C]/40">INCIDENT_RESPONSE :: module closed [OK]</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
