import { useState } from "react";

const COLORS = {
  bg: "#0a0e1a",
  card: "#111827",
  cardHover: "#1a2332",
  border: "#1e2a3a",
  accent: "#00d4aa",
  accentDim: "#00d4aa33",
  warning: "#f59e0b",
  warningDim: "#f59e0b22",
  danger: "#ef4444",
  dangerDim: "#ef444422",
  blue: "#3b82f6",
  blueDim: "#3b82f622",
  purple: "#8b5cf6",
  purpleDim: "#8b5cf622",
  cyan: "#06b6d4",
  cyanDim: "#06b6d422",
  text: "#e2e8f0",
  textDim: "#94a3b8",
  textMuted: "#64748b",
};

const layers = [
  {
    id: "ingestion",
    title: "01 / DATA INGESTION",
    subtitle: "Real-time feed processing via Kafka",
    color: COLORS.cyan,
    colorDim: COLORS.cyanDim,
    items: [
      { name: "RSS / ATOM Feeds", desc: "Threat blogs, vendor advisories, CVE feeds, government CERTs" },
      { name: "MITRE ATT&CK / D3FEND", desc: "APT groups, software, campaigns, techniques, mitigations, detection" },
      { name: "Abuse.ch Feeds", desc: "URLhaus, MalwareBazaar, ThreatFox, SSL Blacklist" },
      { name: "STIX/TAXII Servers", desc: "AlienVault OTX, CIRCL, FS-ISAC, sector-specific sharing" },
      { name: "Additional CTI Sources", desc: "VirusTotal, Shodan, GreyNoise, CISA KEV, NVD" },
    ],
  },
  {
    id: "processing",
    title: "02 / PROCESSING & ENRICHMENT",
    subtitle: "Normalize → Deduplicate → Enrich → Correlate",
    color: COLORS.accent,
    colorDim: COLORS.accentDim,
    items: [
      { name: "STIX 2.1 Normalizer", desc: "Convert all feeds to unified STIX 2.1 format with confidence scoring" },
      { name: "IOC Deduplication", desc: "Fuzzy matching, hash-based dedup, and temporal decay scoring" },
      { name: "CTI Enrichment Engine", desc: "Cross-reference IOCs with MITRE, WHOIS, GeoIP, passive DNS" },
      { name: "Campaign Correlator", desc: "Link IOCs → TTPs → APT groups → campaigns via graph relationships" },
      { name: "Kill Chain Mapper", desc: "Auto-map artifacts to Cyber Kill Chain / Diamond Model phases" },
    ],
  },
  {
    id: "storage",
    title: "03 / DATA LAYER",
    subtitle: "Hybrid storage for structured, graph, and vector data",
    color: COLORS.purple,
    colorDim: COLORS.purpleDim,
    items: [
      { name: "PostgreSQL", desc: "Structured IOC metadata, user accounts, audit logs, campaign records" },
      { name: "Neo4j Graph DB", desc: "Relationship graph: IOCs ↔ TTPs ↔ APT groups ↔ campaigns ↔ software" },
      { name: "OpenSearch", desc: "Full-text search across IOCs, reports, campaigns, executive summaries" },
      { name: "Vector Store (pgvector)", desc: "RAG embeddings for LLM-powered search and contextual retrieval" },
      { name: "Redis Cache", desc: "Hot IOC lookups, session state, rate limiting, real-time feed status" },
    ],
  },
  {
    id: "intelligence",
    title: "04 / AI & INTELLIGENCE ENGINE",
    subtitle: "RAG-powered analysis and summary generation",
    color: COLORS.warning,
    colorDim: COLORS.warningDim,
    items: [
      { name: "RAG Pipeline", desc: "Retrieval-augmented generation with CTI corpus, MITRE knowledge base" },
      { name: "Executive Summary Gen", desc: "Non-technical briefs: business impact, risk level, recommended actions" },
      { name: "Technical Summary Gen", desc: "IOCs, TTPs, detection rules, YARA/Sigma, remediation playbooks" },
      { name: "Threat Scenario Builder", desc: "Auto-generate attack scenarios from correlated intelligence" },
      { name: "Natural Language Search", desc: "\"Show me all APT37 campaigns targeting finance sector in 2024\"" },
    ],
  },
  {
    id: "output",
    title: "05 / OUTPUT & VISUALIZATION",
    subtitle: "Multi-audience delivery and integration",
    color: COLORS.blue,
    colorDim: COLORS.blueDim,
    items: [
      { name: "Attack Tree / Mind Map", desc: "Interactive D3.js graph: drill from campaign → TTPs → IOCs → detections" },
      { name: "Threat Dashboard", desc: "Real-time IOC counts, campaign timelines, severity heat maps" },
      { name: "Report Generator", desc: "PDF/DOCX export with audience toggle (executive vs technical)" },
      { name: "SOAR Integration", desc: "REST API + webhooks to Cortex XSOAR, Splunk SOAR, TheHive" },
      { name: "STIX/TAXII Export", desc: "Share enriched intel downstream to partners, ISACs, MSSPs" },
    ],
  },
];

const techStack = [
  { category: "Ingestion", tools: "Apache Kafka, Logstash, custom Python connectors" },
  { category: "Backend API", tools: "FastAPI (Python) or Go microservices" },
  { category: "Databases", tools: "PostgreSQL + pgvector, Neo4j, Redis, OpenSearch" },
  { category: "LLM / RAG", tools: "LangChain + Claude API / local Mistral, sentence-transformers" },
  { category: "Frontend", tools: "React + D3.js / Cytoscape.js for graph viz, Tailwind CSS" },
  { category: "Infra", tools: "Docker + K8s, Nginx, Prometheus + Grafana" },
  { category: "Standards", tools: "STIX 2.1, TAXII 2.1, MITRE ATT&CK v15" },
];

function LayerCard({ layer, isExpanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: isExpanded ? layer.colorDim : COLORS.card,
        border: `1px solid ${isExpanded ? layer.color : COLORS.border}`,
        borderRadius: 12,
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: layer.color, letterSpacing: 2, marginBottom: 4, textTransform: "uppercase" }}>
            {layer.title}
          </div>
          <div style={{ fontSize: 13, color: COLORS.textDim }}>{layer.subtitle}</div>
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: `1px solid ${layer.color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: layer.color,
            fontSize: 14,
            transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s ease",
          }}
        >
          ▾
        </div>
      </div>

      {isExpanded && (
        <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
          {layer.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: COLORS.bg,
                borderRadius: 8,
                padding: "12px 16px",
                borderLeft: `3px solid ${layer.color}`,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 2 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ThreatIntelArchitecture() {
  const [expandedLayer, setExpandedLayer] = useState("ingestion");
  const [showStack, setShowStack] = useState(false);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.accent, letterSpacing: 3, marginBottom: 8 }}>
            ARCHITECTURE BLUEPRINT
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, margin: 0, lineHeight: 1.3 }}>
            Threat Intel Hub
          </h1>
          <p style={{ fontSize: 14, color: COLORS.textDim, marginTop: 8, lineHeight: 1.6, maxWidth: 600 }}>
            Real-time CTI aggregation, RAG-powered enrichment, and multi-audience delivery platform. Click each layer to explore components.
          </p>
        </div>

        {/* Data Flow Indicator */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
          padding: "10px 16px",
          background: COLORS.card,
          borderRadius: 8,
          border: `1px solid ${COLORS.border}`,
          fontSize: 11,
          color: COLORS.textMuted,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <span style={{ color: COLORS.cyan }}>INGEST</span>
          <span>→</span>
          <span style={{ color: COLORS.accent }}>PROCESS</span>
          <span>→</span>
          <span style={{ color: COLORS.purple }}>STORE</span>
          <span>→</span>
          <span style={{ color: COLORS.warning }}>ANALYZE</span>
          <span>→</span>
          <span style={{ color: COLORS.blue }}>DELIVER</span>
        </div>

        {/* Architecture Layers */}
        {layers.map((layer) => (
          <LayerCard
            key={layer.id}
            layer={layer}
            isExpanded={expandedLayer === layer.id}
            onToggle={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
          />
        ))}

        {/* Tech Stack Toggle */}
        <div
          onClick={() => setShowStack(!showStack)}
          style={{
            marginTop: 24,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: "16px 24px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.danger, letterSpacing: 2 }}>
              RECOMMENDED TECH STACK
            </div>
            <span style={{ color: COLORS.danger, fontSize: 14 }}>{showStack ? "−" : "+"}</span>
          </div>
          {showStack && (
            <div style={{ marginTop: 16, display: "grid", gap: 6 }}>
              {techStack.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, fontSize: 12, padding: "8px 0", borderBottom: i < techStack.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                  <span style={{ color: COLORS.danger, fontWeight: 600, minWidth: 110, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{item.category}</span>
                  <span style={{ color: COLORS.textDim }}>{item.tools}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Key Design Decisions */}
        <div style={{ marginTop: 24, padding: "20px 24px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.accent, letterSpacing: 2, marginBottom: 16 }}>
            KEY DESIGN DECISIONS
          </div>
          {[
            { label: "Why Kafka?", text: "Real-time ingestion with replay capability. If a downstream processor crashes, you don't lose data." },
            { label: "Why Neo4j + Postgres?", text: "Graph DB for relationship traversal (campaign → TTP → IOC). Postgres for structured queries, auth, and audit." },
            { label: "Why pgvector over Pinecone?", text: "Keeps vector store co-located with structured data. Simpler ops, no vendor lock-in, good enough at this scale." },
            { label: "Why dual summaries?", text: "Execs need risk/impact in plain language. SOC analysts need IOCs, YARA rules, and detection guidance. Same data, different prompts." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
