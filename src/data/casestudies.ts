import { CaseStudy } from '@/types';

export const caseStudies: CaseStudy[] = [
  {
    id: '01',
    title: 'SWIFT Payment Fraud via BEC — Incident Response & Ground-Up SOC Build',
    severity: 'CRITICAL',
    tags: ['BEC', 'SWIFT', 'Phishing', 'Forensics', 'Wazuh', 'Defender', 'Intune', 'O365', 'ISO 27001', 'SEBI', 'RBI'],
    scenario:
      'A fintech trading firm reported a significant financial loss after a user was socially engineered via a targeted spear-phishing email. The phishing payload redirected the user through a credential-harvesting proxy that captured the user\'s session token and MFA response. The attacker replayed the session to access the firm\'s SWIFT payment interface, modified beneficiary account details on a pending high-value wire transfer, and routed funds to a mule account. The fraud was discovered only when the legitimate counterparty reported non-receipt — 72 hours after execution.',
    investigation:
      'Conducted full-scope digital forensics across the compromised endpoint, Exchange Online tenant, and network boundary. Extracted the phishing email from Exchange message trace logs — identified an OAuth app consent phishing vector that had granted the attacker persistent mailbox access via a malicious Azure AD application. Memory forensics revealed browser credential cache exfiltration and a secondary payload establishing persistence via Scheduled Task. Correlated Azure AD Sign-In logs, Unified Audit Logs, and Conditional Access policy data to reconstruct the session hijack timeline. Identified two additional users with compromised sessions via the same OAuth consent grant.',
    response:
      'Immediate: Revoked all active sessions and refresh tokens. Disabled the malicious OAuth application. Isolated 3 compromised endpoints via network segmentation. Initiated SWIFT GPI recall on the fraudulent transaction. Post-IR SOC Build: Deployed Wazuh across all Windows endpoints. Configured Microsoft Defender for Endpoint with custom ASR rules. Enrolled all endpoints in Intune with compliance baselines. Hardened Exchange Online and O365 — configured anti-phishing policies, disabled legacy authentication, enforced Conditional Access. Built the firm\'s entire incident response program: call trees, escalation matrices, SLAs aligned to SEBI, RBI, and ISO 27001.',
    impact: [
      { value: 'Full SOC', label: 'Built from Scratch' },
      { value: '3', label: 'Endpoints Contained' },
      { value: '72h→<1h', label: 'Detection Gap Closed' },
      { value: 'SEBI/RBI', label: 'Regulatory Aligned' },
    ],
    impactSummary:
      'Fraud transaction partially recovered via SWIFT GPI recall. Three concurrent compromises contained before further financial impact. Complete SOC and IR program operationalized within 4 weeks — transforming the firm from zero security operations to a monitored, compliant environment aligned to SEBI, RBI, and ISO 27001.',
    detectionExample: {
      title: 'OAuth Consent Phishing — Malicious App Registration',
      mitre: 'T1566.002 / T1098.003',
      language: 'KQL / Azure AD Unified Audit Log',
      code: `// Detect OAuth application consent grants with suspicious permissions
let suspiciousScopes = dynamic(["Mail.Read", "Mail.ReadWrite", "Mail.Send",
  "MailboxSettings.ReadWrite", "Files.ReadWrite.All", "User.ReadWrite.All"]);
AuditLogs
| where OperationName == "Consent to application"
| extend AppId = tostring(TargetResources[0].id)
| extend ConsentedScopes = tostring(TargetResources[0].modifiedProperties[0].newValue)
| where ConsentedScopes has_any (suspiciousScopes)
| extend ActorUPN = tostring(InitiatedBy.user.userPrincipalName)
| extend ActorIP = tostring(InitiatedBy.user.ipAddress)
| join kind=leftouter (
    SigninLogs
    | where ResultType == 0
    | summarize KnownIPs = make_set(IPAddress) by UserPrincipalName
) on $left.ActorUPN == $right.UserPrincipalName
| where ActorIP !in (KnownIPs)
| project TimeGenerated, ActorUPN, ActorIP, AppId, ConsentedScopes`,
    },
  },

  {
    id: '02',
    title: 'BreachForums Data Exposure — Multi-Vector Compromise & SilverFox C2',
    severity: 'CRITICAL',
    tags: ['BreachForums', 'SilverFox C2', 'KMSPico', 'Trojan Dropper', 'CrowdStrike Falcon', 'Memory Forensics', 'Third-Party Risk'],
    scenario:
      'The CTI team identified a threat actor posting a client organization\'s data on BreachForums — including customer PII, transaction amounts, and internal financial records. Investigation revealed the client had received multiple extortion emails over preceding weeks, but these were misclassified as spam. The data sample on BreachForums was validated against production database schemas, confirming authenticity and indicating a deep compromise.',
    investigation:
      'Deployed CrowdStrike Falcon and conducted parallel forensic workstreams across three attack vectors. Vector 1 — Unlicensed Software: Entire infrastructure running pirated OS and applications with no legitimate licenses or patch management. Endpoints were years behind on critical patches (EternalBlue, PrintNightmare, ZeroLogon). Vector 2 — Trojanized KMSPico: Administrators had downloaded a trojanized KMS activator. The binary was a multi-stage dropper executing legitimate KMS activation as a decoy while unpacking a reflective DLL injection payload that loaded the SilverFox RAT into svchost.exe. Falcon\'s IOA engine and process hollowing indicators confirmed the injection. YARA analysis confirmed SilverFox characteristics. Vector 3 — Third-Party Default Credentials: Network forensics revealed authentication to managed services provider occurring over PAP (cleartext), with factory-default credentials on VPN concentrator and RMM tools.',
    response:
      'Correlated SilverFox C2 beacon initiation with KMSPico download event and lateral movement artifacts to conclusively identify the trojanized KMSPico as primary vector. Delivered comprehensive remediation: immediate credential rotation, SilverFox C2 infrastructure blocklisting, full OS rebuild from legitimate licensed media, centralized patch management deployment, migration from PAP to EAP-TLS for third-party authentication, and proper security monitoring stack implementation.',
    impact: [
      { value: '3 Vectors', label: 'Identified & Triaged' },
      { value: 'SilverFox', label: 'C2 Eradicated' },
      { value: 'Root Cause', label: 'KMSPico Trojan' },
      { value: 'Full Rebuild', label: 'Remediation Delivered' },
    ],
    impactSummary:
      'Primary attack vector conclusively identified despite near-zero logging infrastructure. SilverFox C2 eradicated, all three access vectors closed. Remediation roadmap included full infrastructure rebuild, licensing compliance, patch management deployment, and third-party authentication hardening.',
    detectionExample: {
      title: 'SilverFox C2 — Reflective DLL Injection into svchost.exe',
      mitre: 'T1055.001 / T1071.001',
      language: 'YARA',
      code: `rule SilverFox_Reflective_DLL_Injector {
    meta:
        description = "Detects SilverFox RAT reflective DLL injection loader"
        mitre = "T1055.001, T1071.001"
        severity = "critical"
    strings:
        $reflective_pe = { 4D 5A 90 00 03 00 00 00 }
        $loader_func = "ReflectiveLoader" ascii
        $mutex_pattern = /SFX_MTX_[A-F0-9]{8}/ ascii
        $c2_config = { 68 74 74 70 73 3A 2F 2F }
        $reg_persist = "Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run" ascii
        $cred_harvest = "vaultcli.dll" ascii
    condition:
        uint16(0) == 0x5A4D and filesize < 2MB and
        $reflective_pe and $loader_func and
        2 of ($mutex_pattern, $c2_config, $reg_persist, $cred_harvest)
}`,
    },
  },

  {
    id: '03',
    title: 'Enterprise CTI Platform & Brand Monitoring — Architecture & Automation',
    severity: 'HIGH',
    tags: ['STIX/TAXII', 'OASIS', 'Azure Logic Apps', 'Typosquatting', 'IOC Validation', 'CTI', 'Automation'],
    scenario:
      'Multiple fintech clients lacked centralized threat intelligence capabilities — CTI was ad-hoc, scattered across email subscriptions, vendor portals, and individual analyst bookmarks. Brand abuse (typosquatting domains, impersonation campaigns) was discovered reactively. There was no automated IOC lifecycle — indicators were manually copy-pasted between tools with no enrichment, deduplication, or confidence scoring.',
    investigation:
      'Conducted threat intelligence maturity assessment across 5 client environments. Identified gaps: no structured feed ingestion (STIX/TAXII), no automated IOC enrichment pipeline, no brand monitoring for domain squatting, no TLP-based sharing taxonomy, and no feedback loop from SOC to CTI for indicator quality refinement. Benchmarked against FIRST CSIRT capabilities framework and MITRE ATT&CK.',
    response:
      'Designed and built modular CTI platform: Feed Aggregation Layer — integrated 50+ cybersecurity RSS sources and STIX/TAXII 2.1 OASIS-compliant feeds (AlienVault OTX, MISP, abuse.ch, Phishtank). IOC Enrichment Pipeline — automated concurrent lookups (VirusTotal, AlienVault OTX, Whois, passive DNS, geolocation). Each IOC received composite confidence score. Brand Monitoring — Python scripts for typosquatting detection (Levenshtein distance, homoglyphs, TLD permutation), automated domain capture via Certificate Transparency logs, and WHOIS delta monitoring. Azure Logic Apps orchestrated the pipeline with Sentinel integration, Teams notifications, and ServiceNow tickets.',
    impact: [
      { value: '50+', label: 'Sources Integrated' },
      { value: '↓70-80%', label: 'Manual Triage' },
      { value: 'Multi-Sector', label: 'Platform Deployed' },
      { value: 'Real-Time', label: 'Brand Monitoring' },
    ],
    impactSummary:
      'Platform deployed across multiple client engagements. Reduced analyst manual triage by 70-80%. Automated typosquatting detection identified 40+ impersonation domains in the first month. IOC enrichment pipeline processing thousands of indicators daily with composite confidence scoring.',
    detectionExample: {
      title: 'Typosquatting Detection — Homoglyph & Levenshtein',
      mitre: 'T1583.001',
      language: 'Python',
      code: `import itertools
from Levenshtein import distance

HOMOGLYPHS = {
    'a': ['@', 'а'], 'e': ['е', '3'],
    'i': ['1', 'l'], 'o': ['0', 'о'],
    'l': ['1', 'I'], 's': ['5', '$'],
}
TLD_VARIANTS = ['.com', '.net', '.org', '.io']

def generate_typosquat_candidates(domain: str) -> set[str]:
    base = domain.split('.')[0]
    candidates = set()

    for i in range(len(base)):
        candidates.add(base[:i] + base[i+1:])
        for c in 'abcdefghijklmnopqrstuvwxyz0123456789-':
            candidates.add(base[:i] + c + base[i+1:])

    for i, char in enumerate(base):
        if char in HOMOGLYPHS:
            for glyph in HOMOGLYPHS[char]:
                candidates.add(base[:i] + glyph + base[i+1:])

    return {c + tld for c in candidates for tld in TLD_VARIANTS
            if c != base and distance(c, base) <= 2}`,
    },
  },

  {
    id: '04',
    title: 'Multi-SIEM Detection Engineering Program — Sigma/YARA + Automated SOAR Response',
    severity: 'HIGH',
    tags: ['Sentinel', 'CrowdStrike', 'Splunk', 'OpenSearch', 'Sigma', 'YARA', 'SOAR', 'MITRE ATT&CK', 'Detection-as-Code'],
    scenario:
      'Client portfolio spanning fintech, healthcare, and SaaS required unified detection engineering across heterogeneous SIEMs — Sentinel, CrowdStrike LogScale, Splunk Enterprise, and OpenSearch. Detection content was siloed per platform with no portability, no version control, no testing framework. False positive rates averaged 60-70%, creating alert fatigue.',
    investigation:
      'Audited existing detection content across all four SIEM platforms. Found: 80% vendor-default rules with zero tuning, no MITRE ATT&CK mapping, no severity calibration. Identified 15 priority techniques with zero detection coverage including T1055 (Process Injection), T1048 (Exfiltration), T1078.004 (Cloud Accounts), T1053.005 (Scheduled Task), and T1071.004 (DNS C2).',
    response:
      'Implemented detection-as-code program with Sigma as canonical source. Rules compiled to KQL, SPL, Lucene/DQL via sigma-cli with custom backend plugins. Authored YARA rules for file-based detection targeting packed executables (entropy > 7.0), reflective DLL loaders, and C2 framework stagers. Built SOAR-like automation with Azure Logic Apps and CrowdStrike RTR scripts for auto-enrichment and automated containment. Implemented closed-loop FP feedback system with weekly detection quality reviews.',
    impact: [
      { value: '↓60%→12%', label: 'False Positive Rate' },
      { value: '4 SIEMs', label: 'Unified Detection' },
      { value: '100+', label: 'Sigma Rules Deployed' },
      { value: 'Closed-Loop', label: 'FP Feedback System' },
    ],
    impactSummary:
      'False positive rates reduced from 60-70% to under 12% through systematic tuning and feedback loops. 100+ Sigma rules deployed across 4 SIEM platforms from a single source of truth. SOAR-like automation reduced SOC analyst triage time by 55%.',
    detectionExample: {
      title: 'Process Injection via CreateRemoteThread',
      mitre: 'T1055.003',
      language: 'Sigma',
      code: `title: Remote Thread Injection into Suspicious Target Process
id: 8a7f5c2e-1234-5678-abcd-jayesh-detect
status: stable
logsource:
    category: create_remote_thread
    product: windows
detection:
    selection_target:
        TargetImage|endswith:
            - '\\\\svchost.exe'
            - '\\\\lsass.exe'
            - '\\\\explorer.exe'
    filter_known_good:
        SourceImage|endswith:
            - '\\\\csrss.exe'
            - '\\\\MsMpEng.exe'
    condition: selection_target and not filter_known_good
level: high
tags:
    - attack.defense_evasion
    - attack.t1055.003`,
    },
  },

  {
    id: '05',
    title: 'Advanced Malware Forensics — Custom Implant Reverse Engineering & C2 Takedown',
    severity: 'CRITICAL',
    tags: ['Ghidra', 'IDA Pro', 'Volatility3', 'WinDbg', 'YARA', 'CAPA', 'Maltego', 'DNS Sinkhole', 'Memory Forensics'],
    scenario:
      'CrowdStrike Falcon flagged anomalous behavior on a domain controller — intermittent DNS queries to algorithmically generated domains (DGA) and a svchost.exe instance with abnormally large private working set (450MB vs. typical 20-40MB). EDR telemetry showed an unsigned DLL loaded from temp directory — but the file had been deleted post-injection.',
    investigation:
      'Performed live memory acquisition and analyzed with Volatility3. Malfind plugin identified a 380KB executable region with RWX permissions and no backing file. Extracted the in-memory PE using procdump and dlllist. Static analysis: PEstudio flagged 14 suspicious indicators — UPX-modified sections, process injection primitives, forged compilation timestamp. CAPA framework identified 23 capabilities including DNS TXT record reception, AES-256-CBC encryption, Windows Service persistence, and LSASS credential capture. Ghidra decompilation revealed custom DGA seeded by current UTC date generating 500 candidate domains daily. C2 communication bidirectional over DNS: commands via TXT records (AES-256-CBC encrypted), exfiltrated data chunked into A record queries. Credential harvesting via SSPI hooking.',
    response:
      'Coordinated ISP and DNS registrar to sinkhole identified DGA domains for current and next 30 days. Deployed custom YARA signatures across all endpoints via CrowdStrike Falcon and Wazuh. Built Sigma rule detecting DNS query pattern. Rebuilt compromised domain controller and rotated Kerberos keys. Implemented DNS Response Policy Zones (RPZ) at recursive resolver level. Delivered IOC package (IPs, domains, file hashes, YARA rules, Sigma rules) to FIRST/CSIRT community under TLP:AMBER.',
    impact: [
      { value: '45+ Days', label: 'Dwell Time Uncovered' },
      { value: '47 Domains', label: 'C2 Infra Mapped' },
      { value: '0', label: 'Data Confirmed Exfil' },
      { value: 'TLP:AMBER', label: 'Intel Shared via FIRST' },
    ],
    impactSummary:
      'Custom implant fully reverse-engineered — DGA algorithm, C2 protocol, and credential harvesting mechanism documented. C2 infrastructure sinkholed, all Kerberos credentials rotated. YARA and Sigma detections deployed enterprise-wide. IOC package shared with FIRST community.',
    detectionExample: {
      title: 'DGA Domain Query Detection — High Entropy Subdomains',
      mitre: 'T1568.002 / T1071.004',
      language: 'Splunk SPL',
      code: `index=dns sourcetype=stream:dns
| eval subdomain=mvindex(split(query, "."), 0)
| eval sub_len=len(subdomain)
| where sub_len > 20
| stats count AS query_count dc(query) AS unique_domains
    values(query) AS sample_queries by src_ip
| where query_count > 50 AND unique_domains > 30
| lookup known_dga_domains domain AS sample_queries OUTPUT is_known_dga
| table src_ip query_count unique_domains sample_queries`,
    },
  },

  {
    id: '06',
    title: 'Active Exploitation of Financial API — MSRPC Abuse & Compensating Controls',
    severity: 'CRITICAL',
    tags: ['MSRPC', 'API Security', 'Wireshark', 'tcpdump', 'Sigma', 'Sentinel KQL', 'Compensating Controls'],
    scenario:
      'Custom MSRPC-specific alerts flagged unauthorized RPC endpoint mapper queries targeting internal financial transaction processing servers. Simultaneously, API gateway logs showed malformed requests with SQL injection payloads. Both originated from a user workstation with no legitimate business need to interact with MSRPC services.',
    investigation:
      'Captured full packet traces via tcpdump. Wireshark deep-packet inspection of MSRPC traffic revealed: EPM enumeration of all registered RPC interfaces, authenticated MSRPC calls using compromised user\'s NTLM token, exploitation of input validation vulnerability in custom RPC method accepting transaction parameters. Attacker injecting serialized .NET objects (BinaryFormatter deserialization) for RCE. Parallel API analysis showed automated SQL injection (SQLMap fingerprint in User-Agent, time-based blind patterns). API lacked parameterized queries on 3 legacy endpoints and no WAF or rate limiting.',
    response:
      'Isolated compromised workstation, revoked Kerberos TGT and NTLM hash. Deployed emergency network microsegmentation via firewall rules restricting MSRPC to authorized service accounts. Developed MSRPC-specific detection alerts in Sentinel: KQL queries detecting EPM enumeration patterns, unauthorized RPC binding, anomalous serialized object payloads. Built Sigma rules for API exploitation pattern. Designed compensating controls: mandatory input validation layer (WAF with custom rulesets), disabled BinaryFormatter deserialization in favor of JSON DTOs with strict schema, implemented RPC interface ACLs, and deployed application-layer microsegmentation with mutual TLS.',
    impact: [
      { value: '↓20%', label: 'Missed MSRPC Detections' },
      { value: '0', label: 'Financial Loss' },
      { value: 'Board-Level', label: 'Risk Briefing Delivered' },
      { value: '3 Controls', label: 'Compensating Deployed' },
    ],
    impactSummary:
      'Active exploitation contained before transaction manipulation succeeded. MSRPC detection capability closed a previously unmonitored attack surface. API deserialization vulnerability patched with defense-in-depth compensating controls. Board-level risk briefing secured emergency remediation budget.',
    detectionExample: {
      title: 'MSRPC Endpoint Mapper Enumeration from Non-Server Source',
      mitre: 'T1021.003 / T1046',
      language: 'KQL / Microsoft Sentinel',
      code: `let authorizedRPCServers = dynamic(["TXNSVR01", "TXNSVR02", "DC01", "DC02"]);
SecurityEvent
| where EventID == 5156
| where Application has "svchost.exe"
| where DestPort == 135
| where Computer !in (authorizedRPCServers)
| summarize EPM_Queries = count(), UniqueTargets = dcount(DestAddress)
    by Computer, SourceAddress, bin(TimeGenerated, 5m)
| where EPM_Queries > 15 or UniqueTargets > 3
| extend AlertSeverity = iff(UniqueTargets > 5, "CRITICAL", "HIGH")
| project TimeGenerated, Computer, SourceAddress,
    EPM_Queries, UniqueTargets, AlertSeverity`,
    },
  },

  {
    id: '07',
    title: 'Cross-Cloud Lateral Movement — Federated Identity Abuse (Azure AD → AWS)',
    severity: 'CRITICAL',
    tags: ['SAML', 'Azure AD', 'AWS STS', 'Federation', 'CloudTrail', 'Conditional Access', 'Identity Architecture'],
    scenario:
      'Azure AD Sign-In logs showed a Global Administrator authenticating from a TOR exit node — but Conditional Access policies were not triggering MFA because attacker was replaying a stolen Primary Refresh Token (PRT). Within minutes, AWS CloudTrail recorded AssumeRoleWithSAML calls to 4 production AWS accounts using SAML assertions — federated trust being abused as lateral movement pivot from Azure to AWS.',
    investigation:
      'Deep-dive into Azure AD Sign-In and Audit logs: Global Administrator endpoint compromised via targeted phishing deploying a PRT extraction tool. Stolen PRT replayed from TOR exit node using custom user-agent mimicking victim\'s Edge browser. Azure AD token issuance logs confirmed SAML assertion generation for AWS SSO application with role claims mapping to AdministratorAccess. CloudTrail analysis showed: EPM enumeration of all IAM roles and policies, creation of new IAM users with programmatic access in 2 accounts, attachment of AdministratorAccess policies, S3 bucket access containing financial data and customer PII. 12-minute attack window detected via custom detection rule correlating Azure AD Sign-In anomalies with AWS AssumeRoleWithSAML events.',
    response:
      'Immediate: Revoked all Azure AD sessions and refresh tokens. Disabled attacker-created IAM users and deleted access keys. Rotated SAML signing certificate for AWS SSO federation. Emergency Conditional Access updates: blocked PRT from unmanaged devices, required phishing-resistant MFA (FIDO2) for privileged roles, added TOR/VPN blocklists. AWS SCPs restricting iam:CreateUser and iam:AttachRolePolicy to break-glass role only. Built cross-cloud detection in Sentinel correlating Azure AD anomalies with AWS AssumeRoleWithSAML. Redesigned federation: replaced overly permissive SAML role mapping with granular per-group mappings. Deployed AWS IAM Access Analyzer.',
    impact: [
      { value: '12 min', label: 'Attack Window' },
      { value: '4 Accounts', label: 'Lateral Movement Scope' },
      { value: '0 Exfil', label: 'Data Impact Prevented' },
      { value: 'FIDO2', label: 'Phishing-Resistant MFA' },
    ],
    impactSummary:
      'Cross-cloud lateral movement contained within initial attack window — attacker-created persistence eradicated before data exfiltration. Federation architecture redesigned with least-privilege SAML role mappings. PRT replay attack vector closed via FIDO2 MFA enforcement. Cross-cloud detection correlation deployed as permanent use case.',
    detectionExample: {
      title: 'Cross-Cloud Federation Abuse — Azure AD to AWS Pivot',
      mitre: 'T1078.004 / T1550.001',
      language: 'KQL / Microsoft Sentinel',
      code: `let azureRiskySignIns = SigninLogs
| where RiskLevelDuringSignIn in ("high", "medium")
| where AppDisplayName has "AWS"
| project AzureTime=TimeGenerated, UPN=UserPrincipalName,
    RiskLevel=RiskLevelDuringSignIn, SourceIP=IPAddress;
let awsSAMLAssumptions = AWSCloudTrail
| where EventName == "AssumeRoleWithSAML"
| project AWSTime=TimeGenerated, SourceIP=SourceIpAddress;
azureRiskySignIns
| join kind=inner (awsSAMLAssumptions) on SourceIP
| where abs(datetime_diff('minute', AzureTime, AWSTime)) <= 15
| project AzureTime, AWSTime, UPN, SourceIP, RiskLevel`,
    },
  },

  {
    id: '08',
    title: 'Security Program Architecture for Regulated Fintech — Board-Level Strategy & Execution',
    severity: 'HIGH',
    tags: ['CISM', 'CISA', 'ISO 27001', 'SEBI CSCRF', 'RBI IT Risk', 'NIST CSF', 'FIRST', 'Risk Quantification', 'Board Reporting'],
    scenario:
      'Series-B fintech operating in Indian regulated market (SEBI-registered, RBI-supervised) scaling rapidly with 400+ endpoints and 15+ SaaS applications. Zero formal security program: no CISO, no security policies, no risk register, no incident response procedures, no compliance mapping to SEBI or RBI. Recent regulatory audit flagged 23 observations with 90-day remediation deadline.',
    investigation:
      'Comprehensive maturity assessment mapped to NIST CSF and benchmarked against SEBI CSCRF and RBI IT Risk Management guidelines. Current state: NIST CSF Tier 1 (Partial) across all functions — no formal policies, no risk management process, no detection capabilities, incident response was ad-hoc. Gap analysis identified 67 control gaps mapped to ISO 27001:2013 Annex A domains. Quantified risk exposure using FAIR methodology — modeled 12 top-risk scenarios (data breach, payment fraud, ransomware, insider threat). Annualized Loss Expectancy totaled ₹18.5 Cr.',
    response:
      'Executed in 3 phases over 16 weeks. Phase 1: Governance Foundation — drafted 12 foundational policies aligned to ISO 27001 and SEBI/RBI requirements. Established security governance structure: CISO reporting to CEO with board security committee. Phase 2: Technical Control Implementation — deployed Wazuh + Defender + Intune + Sentinel (95% endpoint compliance). Implemented Purview DLP (25+ policies), 30+ MITRE ATT&CK-mapped detections, O365 email hardening, Conditional Access, privileged access workstations, JIT access via PIM. Phase 3: Operationalization — built complete incident response program with severity classification, escalation matrices, playbooks for 8 scenarios, SLAs per tier, 2 tabletop exercises. Closed all 23 regulatory observations within 90-day deadline. Delivered board risk report quantifying residual risk reduction from ₹18.5 Cr to ₹4.2 Cr ALE.',
    impact: [
      { value: '23/23', label: 'Audit Obs. Closed' },
      { value: 'Tier 1→3', label: 'NIST CSF Maturity' },
      { value: '77%', label: 'Risk Reduction (ALE)' },
      { value: '340%', label: 'Security ROI' },
    ],
    impactSummary:
      'Complete security program designed and operationalized in 16 weeks — advancing from NIST CSF Tier 1 to Tier 3 across all five functions. All 23 regulatory observations closed within deadline. Security investment delivered 340% ROI measured by ALE reduction. Program serves as repeatable template for regulated fintech clients.',
  },
];
