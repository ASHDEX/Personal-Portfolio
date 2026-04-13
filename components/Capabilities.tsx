'use client'

import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

const capabilities = [
  {
    name: 'Credential Abuse Detection',
    mitre: ['T1110', 'T1078', 'T1550'],
    description: 'Detects password spraying, credential stuffing, and pass-the-hash/ticket attacks by correlating failed auth events, unusual logon types, and token reuse patterns across identity providers and endpoints.',
  },
  {
    name: 'Cloud IAM Monitoring',
    mitre: ['T1078.004', 'T1098', 'T1136'],
    description: 'Monitors AWS/Azure/GCP IAM for policy changes, privilege escalation paths, anomalous AssumeRole chains, and account creation outside approved provisioning workflows. Alerts within 60 seconds of policy mutation.',
  },
  {
    name: 'Data Exfiltration Detection',
    mitre: ['T1048', 'T1071', 'T1041'],
    description: 'Identifies staging and egress of sensitive data via DNS tunneling, HTTPS to untrusted destinations, and oversized outbound transfers. Correlates DLP classification signals with network flow anomalies.',
  },
  {
    name: 'Lateral Movement Detection',
    mitre: ['T1047', 'T1021', 'T1570'],
    description: 'Flags internal reconnaissance and host-to-host pivoting via WMI, SMB, RDP, and remote service execution. Baselines normal admin traffic patterns to reduce false positives in privileged environments.',
  },
  {
    name: 'Ransomware Pre-Cursor Detection',
    mitre: ['T1486', 'T1490', 'T1083'],
    description: 'Catches ransomware staging behaviors before encryption begins: mass file enumeration, shadow copy deletion, backup tampering, and rapid file-rename events exceeding per-host thresholds.',
  },
  {
    name: 'Supply Chain & Dependency Monitoring',
    mitre: ['T1195', 'T1554', 'T1176'],
    description: 'Tracks third-party library changes against known-good hashes, flags unsigned or unexpected package updates in CI/CD, and monitors for developer toolchain compromise indicators at build time.',
  },
  {
    name: 'Insider Threat Indicators',
    mitre: ['T1078', 'T1213', 'T1530'],
    description: 'Profiles data access patterns per user and flags deviations: bulk downloads, access to repositories outside normal scope, off-hours activity, and data transfers to personal cloud storage.',
  },
  {
    name: 'Cloud Misconfiguration Detection',
    mitre: ['T1190', 'T1133', 'T1580'],
    description: 'Continuously evaluates cloud posture against CIS benchmarks -- detects public S3 buckets, open security groups, disabled logging, and unenforced MFA within minutes of configuration drift.',
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="w-full pt-[120px] pb-[120px]">
      <div>
        <AnimateIn delay={0}>
          <div className="border-l border-[#00D9FF] pl-4 mb-6">
            <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::CAPABILITY_MATRIX ]</div>
            <h2 className="text-[30px] font-mono neon-blue">
              $ query capability.index --scope=detection-response<Cursor />
            </h2>
            <div className="text-gray-600 text-xs font-mono mt-1">
              <span className="text-[#00D9FF]/40">›</span> enumerating capabilities --coverage=full
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <ul className="space-y-0 font-mono">
            {capabilities.map((cap, idx) => (
              <li key={idx} className="border-b border-[#00FF8C]/10 py-6 last:border-0 group transition-colors duration-200 hover:border-[#00FF8C]/25">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="text-[#00FF8C]/40 text-xs select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[17px] text-[#E5E7EB] group-hover:text-white transition-colors duration-200">{cap.name}</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {cap.mitre.map((id) => (
                      <span key={id} className="text-xs text-[#00D9FF]/60 border border-[#00D9FF]/20 px-1.5 py-0.5">
                        {id}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed text-gray-400 pl-8">{cap.description}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-1 text-xs font-mono text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>coverage validated via purple-team exercises and MITRE ATT&CK Navigator</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">└─</span>
              <span className="text-[#00FF8C]/40">CAPABILITY_MATRIX :: enumeration complete [OK]</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
