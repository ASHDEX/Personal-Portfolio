// Content for the About wall and the kill chain. The engine reads this; edit here, not in the engine.

export const wall = {
  role: 'Lead Security Engineer · leads teams, owns the architecture',
  pitch: 'I lead security teams and own the architecture behind them: SOC, incident response, insider threat, cloud and data security. At Payatu I run a team of analysts, engineers and incident responders, report to boards and regulators, and stood up <b>a full SOC and IR program in four weeks</b> after a SWIFT fraud.',
  facts: ['Led a team of 4–5', 'Reports to boards, regulators and client CXOs', 'Architecture owner at Payatu, Coralogix and Bank of America'],
  // record feed: [year, what, meta (may contain <em>), critical?]
  record: [
  ['2025', 'Leading a team of 4–5 analysts, engineers and responders', 'Payatu · reports to boards, regulators and client CXOs'],
  ['2025', 'Threat-intel automation across 50+ sources', 'Payatu · manual triage <em>↓70–80%</em>'],
  ['2025', 'Led response on active breaches', 'Payatu · MTTC <em>↓35%</em>', true],
  ['2025', 'Purview DLP: 25+ policies, 10+ custom SITs', 'Payatu · ~400 endpoints · accuracy <em>↑~40%</em>'],
  ['2025', '30+ ATT&CK-mapped hunts in Sentinel', 'Payatu · coverage <em>↑~30%</em>'],
  ['2025', 'Defender, Intune and Wazuh rollout', 'Payatu · endpoint compliance <em>95%</em>'],
  ['2024', 'Cloud-native detections on CloudTrail, IAM, VPC', 'Coralogix · MTTD <em>↓40%</em> · MTTR <em>↓35%</em>'],
  ['2024', 'Least-privilege IAM guardrails', 'Coralogix · posture <em>↑25%</em>'],
  ['2023', 'DNS/HTTPS tunnelling and stego detections', 'Bank of America · exfil incidents <em>↓25%</em>'],
  ['2023', 'Insider-threat playbooks with intel inputs', 'Bank of America · IR time <em>↓30%</em>'],
  ['2021', 'High-risk domains blocked before access', 'Bank of America · <em>7,000+</em> users'],
  ['2019', 'EDM and regex DLP policy engineering', 'Analyst, detection and response · policy noise <em>↓</em>'],
],
  // measured results: [metric, where, delta, share remaining after (0–1)]
  results: [['Detection gap', 'SWIFT BEC · fintech', '72h → <1h', 1 / 72], ['Manual intel triage', 'Payatu', '↓75%', .25], ['Time to detect', 'Coralogix · cloud', '↓40%', .6], ['Time to contain', 'Payatu · active breaches', '↓35%', .65], ['False positives', 'Coralogix · baselining', '↓30%', .7], ['Exfiltration incidents', 'Bank of America', '↓25%', .75]],
  // kill chain stages: [stage, detection, technique, source]
  stages: [
  ['Initial access', 'OAuth consent phishing, risky scopes from unknown IPs', 'T1566.002', 'case 01'],
  ['Persistence', 'Malicious app registration and scheduled-task implants', 'T1098.003', 'case 01'],
  ['Privilege escalation', 'Federated cloud accounts abused for role assumption', 'T1078.004', 'case 07'],
  ['Defense evasion', 'Reflective DLL injection into svchost.exe', 'T1055.001', 'case 02'],
  ['Credential access', 'Password spraying against enterprise identity', 'T1110.003', 'BofA'],
  ['Lateral movement', 'MSRPC endpoint mapper enumeration from non-servers', 'T1021.003', 'case 06'],
  ['Command and control', 'High-entropy DGA subdomains over DNS', 'T1568.002', 'case 05'],
  ['Exfiltration', 'DNS and HTTPS tunnelling out of the estate', 'T1048', 'BofA'],
],
};
