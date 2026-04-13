'use client'

import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

const strategies = [
  { id: '01', name: 'Behavioral Baselining', detail: 'Establish normal activity patterns per user, host, and service. Alert on statistically significant deviations rather than fixed thresholds.' },
  { id: '02', name: 'Multi-Source Correlation', detail: 'Join signals across endpoint telemetry, network flows, cloud audit logs, and identity providers. Single-source alerts are noise -- correlated alerts are findings.' },
  { id: '03', name: 'Progressive Fidelity', detail: 'Low-fidelity signals (volume anomalies, rare process names) feed high-fidelity investigation queues. Tier alerts by confidence, not just severity.' },
  { id: '04', name: 'Detection-as-Code', detail: 'Rules live in Git. Every change has a PR, a reviewer, and a test against log fixtures. Deployment is automated via CI/CD. No SIEM-UI-only rules.' },
]

const mitreMap = [
  { tactic: 'Initial Access',      technique: 'T1566', name: 'Phishing',                     coverage: 'HIGH' },
  { tactic: 'Execution',           technique: 'T1059', name: 'Command & Scripting Interpreter', coverage: 'HIGH' },
  { tactic: 'Persistence',         technique: 'T1053', name: 'Scheduled Task / Job',           coverage: 'MED'  },
  { tactic: 'Privilege Escalation',technique: 'T1078', name: 'Valid Accounts',                 coverage: 'HIGH' },
  { tactic: 'Defense Evasion',     technique: 'T1055', name: 'Process Injection',              coverage: 'MED'  },
  { tactic: 'Credential Access',   technique: 'T1110', name: 'Brute Force / Password Spray',   coverage: 'HIGH' },
  { tactic: 'Discovery',           technique: 'T1082', name: 'System Information Discovery',   coverage: 'LOW'  },
  { tactic: 'Lateral Movement',    technique: 'T1047', name: 'WMI Execution',                  coverage: 'HIGH' },
  { tactic: 'Collection',          technique: 'T1005', name: 'Data from Local System',         coverage: 'MED'  },
  { tactic: 'Exfiltration',        technique: 'T1048', name: 'Exfil Over Alt Protocol',        coverage: 'MED'  },
  { tactic: 'Command & Control',   technique: 'T1071', name: 'App Layer Protocol (DNS/HTTP)',   coverage: 'HIGH' },
  { tactic: 'Impact',              technique: 'T1486', name: 'Data Encrypted for Impact',      coverage: 'HIGH' },
]

const coverageColor: Record<string, string> = {
  HIGH: 'text-[#00FF8C] border-[#00FF8C]/30',
  MED:  'text-[#00D9FF] border-[#00D9FF]/30',
  LOW:  'text-orange-400 border-orange-400/30',
}

const detections = [
  {
    id: '01',
    name: 'Password Spray Detection',
    mitre: 'T1110.003',
    platform: 'Sigma / Windows Security',
    logic: [
      'Multiple failed logins across 5+ distinct accounts from same source IP',
      'Failure count per account stays below lockout threshold (<=3)',
      'All attempts within a 10-minute sliding window',
      'Source IP not in allowlisted pentest or jump-host ranges',
    ],
    code: `title: Password Spray Detection
status: stable
logsource:
  product: windows
  service: security
detection:
  selection:
    EventID: 4625
    FailureReason: '%%2313'
  filter:
    SourceNetworkAddress|cidr:
      - '10.0.0.0/8'
      - '192.168.0.0/16'
  timeframe: 10m
  condition: selection and not filter
    | count(TargetUserName) by SourceNetworkAddress > 5
    | min(count(EventID)) by TargetUserName < 3
falsepositives:
  - Automated provisioning systems
  - Legacy NTLM applications
level: high`,
  },
  {
    id: '02',
    name: 'Lateral Movement via WMI',
    mitre: 'T1047',
    platform: 'Splunk SPL / Windows Security + Sysmon',
    logic: [
      'wmiprvse.exe spawning child processes not typical for WMI (cmd, powershell, wscript)',
      'WMI network connections to lateral hosts within short time window',
      'Source host is a workstation, not a management server',
      'Correlation with 4624 logon events on destination host within 60s',
    ],
    code: `index=windows (EventCode=4688 OR EventCode=1)
| search ParentImage="*wmiprvse.exe"
  AND (Image="*cmd.exe" OR Image="*powershell.exe" OR Image="*wscript.exe")
| eval risk=case(
    match(CommandLine, "-enc|-EncodedCommand"), "CRITICAL",
    match(CommandLine, "IEX|Invoke-Expression|DownloadString"), "HIGH",
    true(), "MEDIUM"
  )
| stats
    count AS spawn_count,
    values(CommandLine) AS commands,
    values(risk) AS risk_levels
    by host, ParentImage
| where spawn_count > 3
| join type=left host [
    search index=windows EventCode=4624 LogonType=3
    | stats count AS lateral_logons by host
  ]
| where lateral_logons > 0
| table _time, host, spawn_count, risk_levels, commands`,
  },
  {
    id: '03',
    name: 'Cloud IAM Privilege Escalation',
    mitre: 'T1078.004',
    platform: 'Python / AWS CloudTrail',
    logic: [
      'AttachRolePolicy or PutUserPolicy granting AdministratorAccess or wildcard actions',
      'AssumeRole calls from principals with no prior cross-account history',
      'IAM changes outside of approved change-window hours',
      'Geographic anomaly: action from region/country not in user baseline',
    ],
    code: `def analyze_cloudtrail_event(event: dict) -> list[dict]:
    findings = []
    name = event.get("eventName", "")
    actor = event["userIdentity"].get("arn", "unknown")
    region = event.get("awsRegion", "")

    # Detect admin policy attachment
    if name == "AttachRolePolicy":
        arn = event["requestParameters"].get("policyArn", "")
        if "AdministratorAccess" in arn or ":aws:policy/*" in arn:
            findings.append({
                "severity": "CRITICAL",
                "rule": "T1078.004 - Admin Policy Attached",
                "actor": actor,
                "detail": f"Policy {arn} attached by {actor}",
            })

    # Detect anomalous cross-account assumption
    if name == "AssumeRole":
        role = event["requestParameters"].get("roleArn", "")
        if is_cross_account(actor, role) and not in_baseline(actor, "AssumeRole"):
            findings.append({
                "severity": "HIGH",
                "rule": "T1078.004 - Anomalous Cross-Account AssumeRole",
                "actor": actor,
                "detail": f"{actor} assumed {role} -- no prior history",
            })

    return findings`,
  },
]

export default function Detection() {
  return (
    <section id="detection" className="w-full pt-[120px] pb-[120px]">
      <div>
        <AnimateIn delay={0}>
          <div className="border-l border-[#00D9FF] pl-4 mb-6">
            <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::DETECTION_ENGINE ]</div>
            <h2 className="text-[30px] font-mono neon-blue">
              $ init detection.engine --rules=all<Cursor />
            </h2>
            <div className="text-gray-600 text-xs font-mono mt-1">
              <span className="text-[#00D9FF]/40">›</span> loading rules, pipeline, coverage matrix...
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>

          {/* ── Detection Strategy ─────────────────────────────── */}
          <div className="mb-12 font-mono">
            <div className="text-xs text-gray-600 tracking-widest mb-4">DETECTION STRATEGY</div>
            <div className="space-y-0">
              {strategies.map((s) => (
                <div key={s.id} className="flex gap-4 py-4 border-b border-[#00FF8C]/5 last:border-0">
                  <span className="text-[#00FF8C]/30 text-xs shrink-0 w-6 pt-0.5">[{s.id}]</span>
                  <div>
                    <div className="text-[#00FF8C]/80 text-xs tracking-wider mb-1">{s.name.toUpperCase()}</div>
                    <p className="text-[14px] leading-relaxed text-gray-400">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Detection Pipeline ────────────────────────────── */}
          <div className="mb-12 font-mono">
            <div className="text-xs text-gray-600 tracking-widest mb-4">DETECTION PIPELINE</div>
            <div className="space-y-0">
              {[
                { stage: 'INGEST',     detail: 'Endpoint · Network · Cloud · Identity logs' },
                { stage: 'NORMALIZE',  detail: 'Schema mapping, deduplication, field enrichment' },
                { stage: 'CORRELATE',  detail: 'Multi-source join, behavioral baseline diff' },
                { stage: 'DETECT',     detail: 'Sigma rules · YARA · ML anomaly scoring' },
                { stage: 'ALERT',      detail: 'Confidence-tiered, MITRE-tagged, deduped output' },
                { stage: 'RESPOND',    detail: 'SOAR playbook · analyst queue · auto-containment' },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-baseline gap-4 py-2 border-b border-[#00FF8C]/5 last:border-0">
                  <span className="text-[#00D9FF]/50 text-xs w-4 shrink-0 text-right">{i + 1}</span>
                  <span className="text-[#00FF8C]/70 text-xs tracking-wider w-20 shrink-0">{step.stage}</span>
                  {i < arr.length - 1 && <span className="text-[#00FF8C]/20 text-xs">→</span>}
                  <span className="text-[14px] text-gray-500">{step.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── MITRE ATT&CK Coverage ──────────────────────────── */}
          <div className="mb-12">
            <div className="text-xs text-gray-600 tracking-widest mb-4">MITRE ATT&CK COVERAGE</div>
            <div className="font-mono">
              {/* Header row */}
              <div className="grid grid-cols-[80px_80px_1fr_60px] gap-3 pb-2 mb-1 border-b border-[#00FF8C]/10 text-xs text-gray-600 tracking-widest">
                <span>TACTIC</span>
                <span>ID</span>
                <span>TECHNIQUE</span>
                <span className="text-right">CVG</span>
              </div>
              {mitreMap.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[80px_80px_1fr_60px] gap-3 py-2 border-b border-[#00FF8C]/5 last:border-0 group transition-colors duration-150"
                >
                  <span className="text-xs text-gray-600 truncate">{row.tactic}</span>
                  <span className="text-xs text-[#00D9FF]/70 font-mono">{row.technique}</span>
                  <span className="text-[13px] text-gray-300 group-hover:text-[#E5E7EB] transition-colors duration-150">{row.name}</span>
                  <span className={`text-xs border px-1.5 py-0.5 text-right justify-self-end self-center ${coverageColor[row.coverage]}`}>
                    {row.coverage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Example Detections ─────────────────────────────── */}
          <div className="mb-6">
            <div className="text-xs text-gray-600 tracking-widest mb-4">EXAMPLE DETECTIONS</div>
            <div className="space-y-10">
              {detections.map((det) => (
                <div key={det.id} className="font-mono">
                  {/* Detection header */}
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <span className="text-[#00FF8C]/40 text-xs">[{det.id}]</span>
                    <span className="text-[17px] text-[#E5E7EB]">
                      <span className="neon-green">Detection:</span> {det.name}
                    </span>
                    <span className="text-xs text-[#00D9FF]/60 border border-[#00D9FF]/20 px-2 py-0.5">
                      MITRE {det.mitre}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-4">{det.platform}</div>

                  {/* Logic */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-600 tracking-widest mb-2">LOGIC</div>
                    <ul className="space-y-1.5 pl-2">
                      {det.logic.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#00FF8C]/50 text-xs mt-0.5 shrink-0">*</span>
                          <span className="text-[14px] leading-relaxed text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code block */}
                  <div>
                    <div className="text-xs text-gray-600 tracking-widest mb-2">IMPLEMENTATION</div>
                    <pre className="bg-[#0A0A0A] border border-[#00FF8C]/20 p-4 text-[13px] text-gray-300 overflow-x-auto leading-relaxed">
                      {det.code}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Impact ────────────────────────────────────────── */}
          <div className="mt-12 mb-6">
            <div className="text-xs text-gray-600 tracking-widest mb-4">IMPACT</div>
            <div className="font-mono space-y-2">
              {[
                { metric: 'False Positive Rate',    direction: '↓', value: '60%',      detail: 'via confidence scoring and multi-source correlation' },
                { metric: 'MTTD',                   direction: '↓', value: '40%',      detail: 'through real-time pipeline vs. batch-query baseline' },
                { metric: 'SOC Analyst Efficiency', direction: '↑', value: '35%',      detail: 'fewer low-fidelity alerts, more time on confirmed findings' },
                { metric: 'Detection Coverage',     direction: '↑', value: '30%',      detail: 'across MITRE ATT&CK tactics after rules-as-code rollout' },
                { metric: 'Rule Deployment Cycle',  direction: '↓', value: '2wk→4h',   detail: 'CI/CD pipeline with automated fixture testing' },
              ].map((item, i) => (
                <div key={i} className="flex items-baseline gap-3 border-b border-[#00FF8C]/5 pb-2 last:border-0">
                  <span className="text-gray-500 text-[13px] w-48 shrink-0">{item.metric}</span>
                  <span className={`text-xs shrink-0 ${item.direction === '↓' ? 'text-[#00D9FF]' : 'text-[#00FF8C]'}`}>
                    {item.direction}
                  </span>
                  <span className="text-[#00FF8C] text-sm font-bold shrink-0">{item.value}</span>
                  <span className="text-gray-700 text-[12px]">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-1 text-xs font-mono text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>stack: Sigma · YARA · Splunk SPL · Elasticsearch EQL · Python · Go · Terraform</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>process complete — engine active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">└─</span>
              <span className="text-[#00FF8C]/40">DETECTION_ENGINE :: module initialized [OK]</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
