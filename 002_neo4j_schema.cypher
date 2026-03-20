// ============================================================
// Threat Intel Hub — Neo4j Graph Schema
// Version: 1.0
// Requires: Neo4j 5.x+ with APOC plugin
// ============================================================
//
// This schema defines the graph model for CTI relationship
// traversal, powering the attack tree / mind map visualization.
//
// The graph layer mirrors STIX 2.1 Relationship Objects (SROs)
// as native edges for sub-second traversal queries.
// ============================================================


// ============================================================
// CONSTRAINTS & INDEXES
// ============================================================

// Unique constraints (also create implicit indexes)
CREATE CONSTRAINT unique_threat_actor_stix IF NOT EXISTS
FOR (ta:ThreatActor) REQUIRE ta.stix_id IS UNIQUE;

CREATE CONSTRAINT unique_campaign_stix IF NOT EXISTS
FOR (c:Campaign) REQUIRE c.stix_id IS UNIQUE;

CREATE CONSTRAINT unique_technique_mitre IF NOT EXISTS
FOR (t:Technique) REQUIRE t.mitre_id IS UNIQUE;

CREATE CONSTRAINT unique_software_stix IF NOT EXISTS
FOR (s:Software) REQUIRE s.stix_id IS UNIQUE;

CREATE CONSTRAINT unique_indicator_stix IF NOT EXISTS
FOR (i:Indicator) REQUIRE i.stix_id IS UNIQUE;

CREATE CONSTRAINT unique_vulnerability_cve IF NOT EXISTS
FOR (v:Vulnerability) REQUIRE v.cve_id IS UNIQUE;

CREATE CONSTRAINT unique_mitigation_stix IF NOT EXISTS
FOR (m:Mitigation) REQUIRE m.stix_id IS UNIQUE;

CREATE CONSTRAINT unique_detection_id IF NOT EXISTS
FOR (d:DetectionRule) REQUIRE d.rule_id IS UNIQUE;

CREATE CONSTRAINT unique_killchain_name IF NOT EXISTS
FOR (kc:KillChainPhase) REQUIRE kc.name IS UNIQUE;

CREATE CONSTRAINT unique_identity_name IF NOT EXISTS
FOR (id:Identity) REQUIRE id.name IS UNIQUE;


// Additional indexes for frequently queried properties
CREATE INDEX idx_threat_actor_name IF NOT EXISTS FOR (ta:ThreatActor) ON (ta.name);
CREATE INDEX idx_threat_actor_mitre IF NOT EXISTS FOR (ta:ThreatActor) ON (ta.mitre_id);
CREATE INDEX idx_campaign_name IF NOT EXISTS FOR (c:Campaign) ON (c.name);
CREATE INDEX idx_technique_name IF NOT EXISTS FOR (t:Technique) ON (t.name);
CREATE INDEX idx_technique_tactic IF NOT EXISTS FOR (t:Technique) ON (t.tactic);
CREATE INDEX idx_software_name IF NOT EXISTS FOR (s:Software) ON (s.name);
CREATE INDEX idx_indicator_type IF NOT EXISTS FOR (i:Indicator) ON (i.type);
CREATE INDEX idx_indicator_value IF NOT EXISTS FOR (i:Indicator) ON (i.value);
CREATE INDEX idx_vulnerability_severity IF NOT EXISTS FOR (v:Vulnerability) ON (v.severity);

// Full-text search indexes for natural language queries
CREATE FULLTEXT INDEX ft_threat_actors IF NOT EXISTS
FOR (ta:ThreatActor) ON EACH [ta.name, ta.description];

CREATE FULLTEXT INDEX ft_campaigns IF NOT EXISTS
FOR (c:Campaign) ON EACH [c.name, c.description];

CREATE FULLTEXT INDEX ft_techniques IF NOT EXISTS
FOR (t:Technique) ON EACH [t.name, t.description];

CREATE FULLTEXT INDEX ft_software IF NOT EXISTS
FOR (s:Software) ON EACH [s.name, s.description];


// ============================================================
// NODE DEFINITIONS (with sample seed data)
// ============================================================

// Kill Chain Phases (static reference nodes)
UNWIND [
    {name: 'Reconnaissance',       order: 1, model: 'cyber-kill-chain'},
    {name: 'Weaponization',        order: 2, model: 'cyber-kill-chain'},
    {name: 'Delivery',             order: 3, model: 'cyber-kill-chain'},
    {name: 'Exploitation',         order: 4, model: 'cyber-kill-chain'},
    {name: 'Installation',         order: 5, model: 'cyber-kill-chain'},
    {name: 'Command and Control',  order: 6, model: 'cyber-kill-chain'},
    {name: 'Actions on Objectives', order: 7, model: 'cyber-kill-chain'}
] AS phase
MERGE (kc:KillChainPhase {name: phase.name})
SET kc.order = phase.order, kc.model = phase.model;


// Common target sector identities (static reference nodes)
UNWIND [
    'Financial Services', 'Healthcare', 'Government',
    'Energy', 'Technology', 'Defense', 'Education',
    'Telecommunications', 'Manufacturing', 'Retail',
    'Media', 'Transportation', 'Critical Infrastructure'
] AS sector
MERGE (id:Identity {name: sector})
SET id.type = 'sector';


// ============================================================
// SAMPLE DATA: APT37 Ecosystem
// ============================================================

// --- Threat Actor ---
MERGE (apt37:ThreatActor {stix_id: 'intrusion-set--4a2ce82e-1a74-468a-a6fb-bbead541383c'})
SET apt37.name = 'APT37',
    apt37.mitre_id = 'G0067',
    apt37.aliases = ['ScarCruft', 'Reaper', 'Group123', 'RICOCHET CHOLLIMA', 'InkySquid'],
    apt37.country_of_origin = 'North Korea',
    apt37.motivation = 'espionage',
    apt37.sophistication = 'advanced',
    apt37.description = 'North Korean state-sponsored threat group primarily targeting South Korean organizations, also observed targeting Japan, Vietnam, Russia, Nepal, China, India, Romania, Kuwait, and the Middle East.',
    apt37.first_seen = datetime('2012-01-01T00:00:00Z'),
    apt37.pg_id = 'sync-from-postgres';

// --- Campaigns ---
MERGE (c1:Campaign {stix_id: 'campaign--example-apt37-operation-daybreak'})
SET c1.name = 'Operation Daybreak',
    c1.description = 'APT37 campaign exploiting zero-day vulnerability in Adobe Flash to target South Korean organizations',
    c1.start_date = datetime('2016-03-01T00:00:00Z'),
    c1.end_date = datetime('2016-08-01T00:00:00Z'),
    c1.status = 'historical';

MERGE (c2:Campaign {stix_id: 'campaign--example-apt37-operation-erebus'})
SET c2.name = 'Operation Erebus',
    c2.description = 'Watering hole attacks targeting South Korean websites using exploits in Internet Explorer and Flash Player',
    c2.start_date = datetime('2017-01-01T00:00:00Z'),
    c2.status = 'historical';

// --- Software ---
MERGE (s1:Software {stix_id: 'malware--example-rokrat'})
SET s1.name = 'ROKRAT',
    s1.mitre_id = 'S0240',
    s1.type = 'malware',
    s1.description = 'Cloud-based RAT used by APT37 that leverages cloud storage services for C2.',
    s1.platform = ['Windows'];

MERGE (s2:Software {stix_id: 'malware--example-bluelight'})
SET s2.name = 'BLUELIGHT',
    s2.type = 'malware',
    s2.description = 'Reconnaissance tool used by APT37 for initial profiling before deploying ROKRAT.',
    s2.platform = ['Windows'];

MERGE (s3:Software {stix_id: 'malware--example-dolphin'})
SET s3.name = 'Dolphin',
    s3.type = 'malware',
    s3.description = 'Backdoor used by APT37 with extensive spying capabilities including file exfiltration and keylogging.',
    s3.platform = ['Windows'];

// --- Techniques ---
MERGE (t1:Technique {mitre_id: 'T1566.001'})
SET t1.stix_id = 'attack-pattern--t1566-001',
    t1.name = 'Spearphishing Attachment',
    t1.tactic = 'initial-access',
    t1.description = 'Adversaries send spearphishing emails with malicious attachments to gain access.',
    t1.kill_chain_phase = 'Delivery';

MERGE (t2:Technique {mitre_id: 'T1059.005'})
SET t2.stix_id = 'attack-pattern--t1059-005',
    t2.name = 'Visual Basic',
    t2.tactic = 'execution',
    t2.description = 'Adversaries may abuse VBS for execution of malicious commands and payloads.',
    t2.kill_chain_phase = 'Exploitation';

MERGE (t3:Technique {mitre_id: 'T1102'})
SET t3.stix_id = 'attack-pattern--t1102',
    t3.name = 'Web Service',
    t3.tactic = 'command-and-control',
    t3.description = 'Adversaries use legitimate web services for C2 communications.',
    t3.kill_chain_phase = 'Command and Control';

MERGE (t4:Technique {mitre_id: 'T1005'})
SET t4.stix_id = 'attack-pattern--t1005',
    t4.name = 'Data from Local System',
    t4.tactic = 'collection',
    t4.description = 'Adversaries search local system sources to collect sensitive data.',
    t4.kill_chain_phase = 'Actions on Objectives';

MERGE (t5:Technique {mitre_id: 'T1203'})
SET t5.stix_id = 'attack-pattern--t1203',
    t5.name = 'Exploitation for Client Execution',
    t5.tactic = 'execution',
    t5.description = 'Adversaries exploit software vulnerabilities in client applications.',
    t5.kill_chain_phase = 'Exploitation';

// --- Vulnerabilities ---
MERGE (v1:Vulnerability {cve_id: 'CVE-2018-4878'})
SET v1.stix_id = 'vulnerability--cve-2018-4878',
    v1.description = 'Adobe Flash Player use-after-free vulnerability exploited as zero-day by APT37.',
    v1.cvss_score = 9.8,
    v1.severity = 'CRITICAL',
    v1.is_kev = true;

// --- Sample IOCs ---
MERGE (i1:Indicator {stix_id: 'indicator--example-apt37-domain-1'})
SET i1.type = 'domain',
    i1.value = 'example-malicious-c2.com',
    i1.confidence = 85,
    i1.tlp = 'AMBER',
    i1.first_seen = datetime('2024-01-15T00:00:00Z');

MERGE (i2:Indicator {stix_id: 'indicator--example-apt37-hash-1'})
SET i2.type = 'hash_sha256',
    i2.value = 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
    i2.confidence = 90,
    i2.tlp = 'AMBER',
    i2.first_seen = datetime('2024-02-01T00:00:00Z');

// --- Mitigations ---
MERGE (m1:Mitigation {stix_id: 'course-of-action--user-training'})
SET m1.name = 'User Training',
    m1.mitre_id = 'M1017',
    m1.description = 'Train users to identify social engineering techniques and spearphishing emails.';

MERGE (m2:Mitigation {stix_id: 'course-of-action--exploit-protection'})
SET m2.name = 'Exploit Protection',
    m2.mitre_id = 'M1050',
    m2.description = 'Use security features like EMET or Windows Defender Exploit Guard.';

// --- Detection Rules ---
MERGE (d1:DetectionRule {rule_id: 'sigma-apt37-rokrat-c2'})
SET d1.name = 'ROKRAT Cloud C2 Communication',
    d1.type = 'sigma',
    d1.description = 'Detects network connections to known cloud services used by ROKRAT for C2.',
    d1.severity = 'HIGH';


// ============================================================
// RELATIONSHIPS
// ============================================================

// Campaign → ThreatActor (ATTRIBUTED_TO)
MATCH (c:Campaign {name: 'Operation Daybreak'}), (ta:ThreatActor {mitre_id: 'G0067'})
MERGE (c)-[:ATTRIBUTED_TO {confidence: 95}]->(ta);

MATCH (c:Campaign {name: 'Operation Erebus'}), (ta:ThreatActor {mitre_id: 'G0067'})
MERGE (c)-[:ATTRIBUTED_TO {confidence: 90}]->(ta);

// ThreatActor → Software (USES)
MATCH (ta:ThreatActor {mitre_id: 'G0067'}), (s:Software {name: 'ROKRAT'})
MERGE (ta)-[:USES {first_seen: datetime('2017-01-01T00:00:00Z')}]->(s);

MATCH (ta:ThreatActor {mitre_id: 'G0067'}), (s:Software {name: 'BLUELIGHT'})
MERGE (ta)-[:USES {first_seen: datetime('2021-01-01T00:00:00Z')}]->(s);

MATCH (ta:ThreatActor {mitre_id: 'G0067'}), (s:Software {name: 'Dolphin'})
MERGE (ta)-[:USES {first_seen: datetime('2021-06-01T00:00:00Z')}]->(s);

// ThreatActor → Technique (EMPLOYS)
MATCH (ta:ThreatActor {mitre_id: 'G0067'}), (t:Technique {mitre_id: 'T1566.001'})
MERGE (ta)-[:EMPLOYS]->(t);

MATCH (ta:ThreatActor {mitre_id: 'G0067'}), (t:Technique {mitre_id: 'T1059.005'})
MERGE (ta)-[:EMPLOYS]->(t);

MATCH (ta:ThreatActor {mitre_id: 'G0067'}), (t:Technique {mitre_id: 'T1102'})
MERGE (ta)-[:EMPLOYS]->(t);

MATCH (ta:ThreatActor {mitre_id: 'G0067'}), (t:Technique {mitre_id: 'T1005'})
MERGE (ta)-[:EMPLOYS]->(t);

MATCH (ta:ThreatActor {mitre_id: 'G0067'}), (t:Technique {mitre_id: 'T1203'})
MERGE (ta)-[:EMPLOYS]->(t);

// Software → Technique (IMPLEMENTS)
MATCH (s:Software {name: 'ROKRAT'}), (t:Technique {mitre_id: 'T1102'})
MERGE (s)-[:IMPLEMENTS]->(t);

MATCH (s:Software {name: 'ROKRAT'}), (t:Technique {mitre_id: 'T1005'})
MERGE (s)-[:IMPLEMENTS]->(t);

MATCH (s:Software {name: 'Dolphin'}), (t:Technique {mitre_id: 'T1005'})
MERGE (s)-[:IMPLEMENTS]->(t);

// Campaign → Technique (EMPLOYS)
MATCH (c:Campaign {name: 'Operation Daybreak'}), (t:Technique {mitre_id: 'T1566.001'})
MERGE (c)-[:EMPLOYS]->(t);

MATCH (c:Campaign {name: 'Operation Daybreak'}), (t:Technique {mitre_id: 'T1203'})
MERGE (c)-[:EMPLOYS]->(t);

// Technique → Vulnerability (TARGETS)
MATCH (t:Technique {mitre_id: 'T1203'}), (v:Vulnerability {cve_id: 'CVE-2018-4878'})
MERGE (t)-[:TARGETS]->(v);

// Indicator → Technique (INDICATES)
MATCH (i:Indicator {value: 'example-malicious-c2.com'}), (t:Technique {mitre_id: 'T1102'})
MERGE (i)-[:INDICATES {confidence: 80}]->(t);

// Indicator → Campaign (PART_OF)
MATCH (i:Indicator {value: 'example-malicious-c2.com'}), (c:Campaign {name: 'Operation Erebus'})
MERGE (i)-[:PART_OF {confidence: 75}]->(c);

MATCH (i:Indicator {stix_id: 'indicator--example-apt37-hash-1'}), (c:Campaign {name: 'Operation Daybreak'})
MERGE (i)-[:PART_OF {confidence: 85}]->(c);

// Campaign → Identity (TARGETS_SECTOR)
MATCH (c:Campaign {name: 'Operation Daybreak'}), (id:Identity {name: 'Government'})
MERGE (c)-[:TARGETS_SECTOR]->(id);

MATCH (c:Campaign {name: 'Operation Daybreak'}), (id:Identity {name: 'Defense'})
MERGE (c)-[:TARGETS_SECTOR]->(id);

MATCH (c:Campaign {name: 'Operation Erebus'}), (id:Identity {name: 'Technology'})
MERGE (c)-[:TARGETS_SECTOR]->(id);

MATCH (c:Campaign {name: 'Operation Erebus'}), (id:Identity {name: 'Media'})
MERGE (c)-[:TARGETS_SECTOR]->(id);

// Technique → KillChainPhase (PHASE_OF)
MATCH (t:Technique {mitre_id: 'T1566.001'}), (kc:KillChainPhase {name: 'Delivery'})
MERGE (t)-[:PHASE_OF]->(kc);

MATCH (t:Technique {mitre_id: 'T1059.005'}), (kc:KillChainPhase {name: 'Exploitation'})
MERGE (t)-[:PHASE_OF]->(kc);

MATCH (t:Technique {mitre_id: 'T1203'}), (kc:KillChainPhase {name: 'Exploitation'})
MERGE (t)-[:PHASE_OF]->(kc);

MATCH (t:Technique {mitre_id: 'T1102'}), (kc:KillChainPhase {name: 'Command and Control'})
MERGE (t)-[:PHASE_OF]->(kc);

MATCH (t:Technique {mitre_id: 'T1005'}), (kc:KillChainPhase {name: 'Actions on Objectives'})
MERGE (t)-[:PHASE_OF]->(kc);

// Mitigation → Technique (MITIGATES)
MATCH (m:Mitigation {mitre_id: 'M1017'}), (t:Technique {mitre_id: 'T1566.001'})
MERGE (m)-[:MITIGATES]->(t);

MATCH (m:Mitigation {mitre_id: 'M1050'}), (t:Technique {mitre_id: 'T1203'})
MERGE (m)-[:MITIGATES]->(t);

// DetectionRule → Indicator (DETECTS)
MATCH (d:DetectionRule {rule_id: 'sigma-apt37-rokrat-c2'}), (i:Indicator {value: 'example-malicious-c2.com'})
MERGE (d)-[:DETECTS]->(i);


// ============================================================
// USEFUL QUERY TEMPLATES
// ============================================================

// --- 1. Full attack tree for a threat actor ---
// MATCH path = (ta:ThreatActor {name: 'APT37'})-[*1..4]-(connected)
// RETURN path;

// --- 2. All TTPs used by an APT group with Kill Chain mapping ---
// MATCH (ta:ThreatActor {name: 'APT37'})-[:EMPLOYS]->(t:Technique)-[:PHASE_OF]->(kc:KillChainPhase)
// RETURN t.mitre_id, t.name, t.tactic, kc.name AS kill_chain_phase
// ORDER BY kc.order;

// --- 3. Find all IOCs linked to a campaign ---
// MATCH (c:Campaign {name: 'Operation Daybreak'})<-[:PART_OF]-(i:Indicator)
// RETURN i.type, i.value, i.confidence, i.tlp;

// --- 4. Trace from IOC back to APT group ---
// MATCH (i:Indicator {value: 'example-malicious-c2.com'})-[:INDICATES]->(t:Technique)<-[:EMPLOYS]-(ta:ThreatActor)
// RETURN i.value, t.name, ta.name;

// --- 5. Campaign impact: which sectors are targeted? ---
// MATCH (ta:ThreatActor {name: 'APT37'})<-[:ATTRIBUTED_TO]-(c:Campaign)-[:TARGETS_SECTOR]->(id:Identity)
// RETURN c.name, collect(id.name) AS targeted_sectors;

// --- 6. Find mitigations for a specific APT's techniques ---
// MATCH (ta:ThreatActor {name: 'APT37'})-[:EMPLOYS]->(t:Technique)<-[:MITIGATES]-(m:Mitigation)
// RETURN t.mitre_id, t.name, m.name AS mitigation, m.description;

// --- 7. Software-to-technique mapping ---
// MATCH (ta:ThreatActor {name: 'APT37'})-[:USES]->(s:Software)-[:IMPLEMENTS]->(t:Technique)
// RETURN s.name, collect(t.mitre_id + ': ' + t.name) AS techniques;

// --- 8. Full kill chain coverage analysis ---
// MATCH (ta:ThreatActor {name: 'APT37'})-[:EMPLOYS]->(t:Technique)-[:PHASE_OF]->(kc:KillChainPhase)
// WITH kc, collect(t.name) AS techniques, count(t) AS technique_count
// ORDER BY kc.order
// RETURN kc.name, technique_count, techniques;

// --- 9. Shortest path between two entities ---
// MATCH path = shortestPath(
//     (a:ThreatActor {name: 'APT37'})-[*..6]-(v:Vulnerability {cve_id: 'CVE-2018-4878'})
// )
// RETURN path;

// --- 10. Depth-limited subgraph for visualization (API endpoint) ---
// MATCH path = (start {stix_id: $startNodeId})-[*1..$depth]-(connected)
// WITH nodes(path) AS ns, relationships(path) AS rs
// UNWIND ns AS n
// UNWIND rs AS r
// RETURN collect(DISTINCT n) AS nodes, collect(DISTINCT r) AS relationships;
