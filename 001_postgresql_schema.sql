-- ============================================================
-- Threat Intel Hub — PostgreSQL Schema
-- Version: 1.0
-- Requires: PostgreSQL 16+ with pgvector extension
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";       -- pgvector for RAG embeddings

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE ioc_type AS ENUM (
    'ipv4', 'ipv6', 'domain', 'url',
    'hash_md5', 'hash_sha1', 'hash_sha256',
    'email', 'file', 'registry_key', 'mutex', 'user_agent'
);

CREATE TYPE tlp_level AS ENUM ('WHITE', 'GREEN', 'AMBER', 'AMBER_STRICT', 'RED');

CREATE TYPE severity_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

CREATE TYPE software_type AS ENUM ('malware', 'tool');

CREATE TYPE sophistication_level AS ENUM (
    'none', 'minimal', 'intermediate', 'advanced',
    'expert', 'innovator', 'strategic'
);

CREATE TYPE feed_type AS ENUM ('rss', 'taxii', 'api', 'csv', 'stix_bundle');

CREATE TYPE feed_status AS ENUM ('active', 'paused', 'error', 'disabled');

CREATE TYPE reliability_rating AS ENUM ('A', 'B', 'C', 'D', 'E', 'F');

CREATE TYPE audience_type AS ENUM ('executive', 'technical', 'soar', 'mssp');

CREATE TYPE mapping_method AS ENUM ('auto', 'manual', 'llm', 'rule_based');

CREATE TYPE user_role AS ENUM ('admin', 'analyst', 'viewer', 'api_consumer', 'mssp_client');


-- ============================================================
-- CORE ENTITY TABLES
-- ============================================================

-- Feed Sources: tracks all ingestion endpoints
CREATE TABLE feed_sources (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    type            feed_type NOT NULL,
    url             TEXT NOT NULL,
    api_key_ref     VARCHAR(255),                           -- reference to secrets manager, never store keys here
    poll_interval   INT NOT NULL DEFAULT 900,               -- seconds between polls
    last_polled_at  TIMESTAMPTZ,
    last_success_at TIMESTAMPTZ,
    status          feed_status NOT NULL DEFAULT 'active',
    reliability     reliability_rating NOT NULL DEFAULT 'C',
    error_count     INT DEFAULT 0,
    last_error      TEXT,
    config          JSONB DEFAULT '{}',                     -- source-specific config (headers, filters, etc.)
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_feed_sources_status ON feed_sources (status);
CREATE INDEX idx_feed_sources_next_poll ON feed_sources (last_polled_at) WHERE status = 'active';


-- Threat Actors (APT Groups)
CREATE TABLE threat_actors (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stix_id           VARCHAR(255) UNIQUE NOT NULL,         -- e.g., "intrusion-set--<uuid>"
    name              VARCHAR(255) NOT NULL,
    aliases           TEXT[] DEFAULT '{}',
    description       TEXT,
    country_of_origin VARCHAR(100),
    motivation        VARCHAR(100),                         -- e.g., "espionage", "financial-gain"
    sophistication    sophistication_level,
    resource_level    VARCHAR(50),                          -- e.g., "government", "organization"
    primary_sector    VARCHAR(100),                         -- primary target sector
    first_seen        TIMESTAMPTZ,
    last_seen         TIMESTAMPTZ,
    mitre_id          VARCHAR(20),                          -- e.g., "G0067" for APT37
    external_refs     JSONB DEFAULT '[]',                   -- MITRE, CISA, vendor references
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_threat_actors_name ON threat_actors (name);
CREATE INDEX idx_threat_actors_mitre ON threat_actors (mitre_id) WHERE mitre_id IS NOT NULL;
CREATE INDEX idx_threat_actors_aliases ON threat_actors USING GIN (aliases);
CREATE INDEX idx_threat_actors_stix ON threat_actors (stix_id);


-- Campaigns
CREATE TABLE campaigns (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stix_id         VARCHAR(255) UNIQUE NOT NULL,
    name            VARCHAR(255) NOT NULL,
    threat_actor_id UUID REFERENCES threat_actors(id) ON DELETE SET NULL,
    description     TEXT,
    objective       TEXT,
    target_sectors  TEXT[] DEFAULT '{}',
    target_countries TEXT[] DEFAULT '{}',
    start_date      TIMESTAMPTZ,
    end_date        TIMESTAMPTZ,
    status          VARCHAR(50) DEFAULT 'unknown',          -- active, historical, unknown
    confidence      INT CHECK (confidence BETWEEN 0 AND 100),
    external_refs   JSONB DEFAULT '[]',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_campaigns_name ON campaigns (name);
CREATE INDEX idx_campaigns_actor ON campaigns (threat_actor_id);
CREATE INDEX idx_campaigns_sectors ON campaigns USING GIN (target_sectors);
CREATE INDEX idx_campaigns_dates ON campaigns (start_date, end_date);


-- Techniques (MITRE ATT&CK)
CREATE TABLE techniques (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stix_id             VARCHAR(255) UNIQUE NOT NULL,
    mitre_id            VARCHAR(20) UNIQUE NOT NULL,        -- e.g., "T1566.001"
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    tactic              VARCHAR(100) NOT NULL,               -- e.g., "initial-access"
    kill_chain_phase    VARCHAR(50),                         -- mapped Cyber Kill Chain phase
    platform            TEXT[] DEFAULT '{}',                  -- e.g., {"Windows", "Linux", "macOS"}
    data_sources        TEXT[] DEFAULT '{}',
    detection           TEXT,
    is_subtechnique     BOOLEAN DEFAULT FALSE,
    parent_technique_id UUID REFERENCES techniques(id) ON DELETE SET NULL,
    external_refs       JSONB DEFAULT '[]',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_techniques_mitre ON techniques (mitre_id);
CREATE INDEX idx_techniques_tactic ON techniques (tactic);
CREATE INDEX idx_techniques_kill_chain ON techniques (kill_chain_phase);
CREATE INDEX idx_techniques_parent ON techniques (parent_technique_id) WHERE parent_technique_id IS NOT NULL;


-- Software (Malware & Tools)
CREATE TABLE software (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stix_id       VARCHAR(255) UNIQUE NOT NULL,
    mitre_id      VARCHAR(20) UNIQUE,                       -- e.g., "S0154"
    name          VARCHAR(255) NOT NULL,
    type          software_type NOT NULL,
    description   TEXT,
    aliases       TEXT[] DEFAULT '{}',
    platform      TEXT[] DEFAULT '{}',
    external_refs JSONB DEFAULT '[]',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_software_mitre ON software (mitre_id) WHERE mitre_id IS NOT NULL;
CREATE INDEX idx_software_name ON software (name);
CREATE INDEX idx_software_type ON software (type);


-- Indicators (IOCs) — the core workhorse table
CREATE TABLE indicators (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stix_id         VARCHAR(255) UNIQUE NOT NULL,
    type            ioc_type NOT NULL,
    value           TEXT NOT NULL,
    pattern         TEXT,                                    -- STIX pattern, e.g. "[ipv4-addr:value = '1.2.3.4']"
    confidence      INT CHECK (confidence BETWEEN 0 AND 100) DEFAULT 50,
    tlp             tlp_level NOT NULL DEFAULT 'GREEN',
    severity        severity_level,
    first_seen      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    valid_until     TIMESTAMPTZ,
    sighting_count  INT DEFAULT 1,
    source_id       UUID REFERENCES feed_sources(id) ON DELETE SET NULL,
    source_name     VARCHAR(100),                           -- denormalized for fast display
    tags            TEXT[] DEFAULT '{}',
    enrichment      JSONB DEFAULT '{}',                     -- GeoIP, WHOIS, passive DNS, etc.
    raw_data        JSONB,                                  -- original STIX object for audit
    is_false_positive BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (first_seen);

-- Partitions by quarter (create more as needed)
CREATE TABLE indicators_2024_q1 PARTITION OF indicators FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
CREATE TABLE indicators_2024_q2 PARTITION OF indicators FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
CREATE TABLE indicators_2024_q3 PARTITION OF indicators FOR VALUES FROM ('2024-07-01') TO ('2024-10-01');
CREATE TABLE indicators_2024_q4 PARTITION OF indicators FOR VALUES FROM ('2024-10-01') TO ('2025-01-01');
CREATE TABLE indicators_2025_q1 PARTITION OF indicators FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');
CREATE TABLE indicators_2025_q2 PARTITION OF indicators FOR VALUES FROM ('2025-04-01') TO ('2025-07-01');
CREATE TABLE indicators_2025_q3 PARTITION OF indicators FOR VALUES FROM ('2025-07-01') TO ('2025-10-01');
CREATE TABLE indicators_2025_q4 PARTITION OF indicators FOR VALUES FROM ('2025-10-01') TO ('2026-01-01');
CREATE TABLE indicators_2026_q1 PARTITION OF indicators FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');
CREATE TABLE indicators_2026_q2 PARTITION OF indicators FOR VALUES FROM ('2026-04-01') TO ('2026-07-01');

CREATE INDEX idx_indicators_stix ON indicators (stix_id);
CREATE INDEX idx_indicators_value ON indicators (value);
CREATE INDEX idx_indicators_type ON indicators (type);
CREATE INDEX idx_indicators_source ON indicators (source_id);
CREATE INDEX idx_indicators_confidence ON indicators (confidence DESC);
CREATE INDEX idx_indicators_first_seen ON indicators (first_seen DESC);
CREATE INDEX idx_indicators_tags ON indicators USING GIN (tags);
CREATE INDEX idx_indicators_enrichment ON indicators USING GIN (enrichment jsonb_path_ops);

-- Full-text search on indicator values and tags
ALTER TABLE indicators ADD COLUMN search_vector tsvector
    GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(value, '') || ' ' || coalesce(source_name, '') || ' ' || array_to_string(tags, ' '))
    ) STORED;
CREATE INDEX idx_indicators_fts ON indicators USING GIN (search_vector);


-- Vulnerabilities (CVEs)
CREATE TABLE vulnerabilities (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stix_id           VARCHAR(255) UNIQUE NOT NULL,
    cve_id            VARCHAR(20) UNIQUE NOT NULL,          -- e.g., "CVE-2024-1234"
    description       TEXT,
    cvss_v3_score     DECIMAL(3,1) CHECK (cvss_v3_score BETWEEN 0.0 AND 10.0),
    cvss_v3_vector    VARCHAR(100),
    severity          severity_level,
    affected_products TEXT[] DEFAULT '{}',                   -- CPE strings or product names
    is_kev            BOOLEAN DEFAULT FALSE,                -- CISA Known Exploited Vulnerability
    kev_due_date      DATE,
    published_date    TIMESTAMPTZ,
    modified_date     TIMESTAMPTZ,
    references        JSONB DEFAULT '[]',
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vulnerabilities_cve ON vulnerabilities (cve_id);
CREATE INDEX idx_vulnerabilities_severity ON vulnerabilities (severity);
CREATE INDEX idx_vulnerabilities_cvss ON vulnerabilities (cvss_v3_score DESC);
CREATE INDEX idx_vulnerabilities_kev ON vulnerabilities (is_kev) WHERE is_kev = TRUE;


-- Detection Rules (YARA, Sigma, Snort)
CREATE TABLE detection_rules (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(255) NOT NULL,
    type          VARCHAR(20) NOT NULL CHECK (type IN ('yara', 'sigma', 'snort', 'suricata', 'custom')),
    content       TEXT NOT NULL,                             -- the actual rule content
    description   TEXT,
    severity      severity_level,
    author        VARCHAR(255),
    tags          TEXT[] DEFAULT '{}',
    source_url    TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_detection_rules_type ON detection_rules (type);


-- Mitigations (D3FEND countermeasures)
CREATE TABLE mitigations (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stix_id       VARCHAR(255) UNIQUE NOT NULL,
    mitre_id      VARCHAR(20),                              -- D3FEND ID or ATT&CK mitigation ID
    name          VARCHAR(255) NOT NULL,
    description   TEXT,
    type          VARCHAR(50) DEFAULT 'course-of-action',   -- STIX type
    external_refs JSONB DEFAULT '[]',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_mitigations_mitre ON mitigations (mitre_id) WHERE mitre_id IS NOT NULL;


-- ============================================================
-- RELATIONSHIP / JUNCTION TABLES
-- ============================================================

-- Campaign ↔ Indicator (M:N)
CREATE TABLE campaign_indicators (
    campaign_id   UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    indicator_id  UUID NOT NULL REFERENCES indicators(id) ON DELETE CASCADE,
    confidence    INT CHECK (confidence BETWEEN 0 AND 100),
    mapped_by     mapping_method DEFAULT 'auto',
    added_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (campaign_id, indicator_id)
);

CREATE INDEX idx_ci_indicator ON campaign_indicators (indicator_id);


-- Indicator ↔ Technique (M:N)
CREATE TABLE indicator_techniques (
    indicator_id  UUID NOT NULL REFERENCES indicators(id) ON DELETE CASCADE,
    technique_id  UUID NOT NULL REFERENCES techniques(id) ON DELETE CASCADE,
    confidence    INT CHECK (confidence BETWEEN 0 AND 100),
    mapped_by     mapping_method DEFAULT 'auto',
    added_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (indicator_id, technique_id)
);

CREATE INDEX idx_it_technique ON indicator_techniques (technique_id);


-- Threat Actor ↔ Software (M:N)
CREATE TABLE actor_software (
    threat_actor_id UUID NOT NULL REFERENCES threat_actors(id) ON DELETE CASCADE,
    software_id     UUID NOT NULL REFERENCES software(id) ON DELETE CASCADE,
    first_seen      TIMESTAMPTZ,
    last_seen       TIMESTAMPTZ,
    PRIMARY KEY (threat_actor_id, software_id)
);

CREATE INDEX idx_as_software ON actor_software (software_id);


-- Threat Actor ↔ Technique (M:N)
CREATE TABLE actor_techniques (
    threat_actor_id UUID NOT NULL REFERENCES threat_actors(id) ON DELETE CASCADE,
    technique_id    UUID NOT NULL REFERENCES techniques(id) ON DELETE CASCADE,
    use_description TEXT,                                    -- how the actor uses this technique
    PRIMARY KEY (threat_actor_id, technique_id)
);

CREATE INDEX idx_at_technique ON actor_techniques (technique_id);


-- Software ↔ Technique (M:N)
CREATE TABLE software_techniques (
    software_id   UUID NOT NULL REFERENCES software(id) ON DELETE CASCADE,
    technique_id  UUID NOT NULL REFERENCES techniques(id) ON DELETE CASCADE,
    PRIMARY KEY (software_id, technique_id)
);

CREATE INDEX idx_st_technique ON software_techniques (technique_id);


-- Technique ↔ Vulnerability (M:N)
CREATE TABLE technique_vulnerabilities (
    technique_id     UUID NOT NULL REFERENCES techniques(id) ON DELETE CASCADE,
    vulnerability_id UUID NOT NULL REFERENCES vulnerabilities(id) ON DELETE CASCADE,
    PRIMARY KEY (technique_id, vulnerability_id)
);

CREATE INDEX idx_tv_vulnerability ON technique_vulnerabilities (vulnerability_id);


-- Technique ↔ Mitigation (M:N)
CREATE TABLE technique_mitigations (
    technique_id  UUID NOT NULL REFERENCES techniques(id) ON DELETE CASCADE,
    mitigation_id UUID NOT NULL REFERENCES mitigations(id) ON DELETE CASCADE,
    description   TEXT,                                      -- how this mitigation applies
    PRIMARY KEY (technique_id, mitigation_id)
);

CREATE INDEX idx_tm_mitigation ON technique_mitigations (mitigation_id);


-- Indicator ↔ Detection Rule (M:N)
CREATE TABLE indicator_detections (
    indicator_id      UUID NOT NULL REFERENCES indicators(id) ON DELETE CASCADE,
    detection_rule_id UUID NOT NULL REFERENCES detection_rules(id) ON DELETE CASCADE,
    PRIMARY KEY (indicator_id, detection_rule_id)
);

CREATE INDEX idx_id_detection ON indicator_detections (detection_rule_id);


-- ============================================================
-- AI / RAG TABLES
-- ============================================================

-- Vector embeddings for RAG retrieval (pgvector)
CREATE TABLE embeddings (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type   VARCHAR(50) NOT NULL,                     -- 'indicator', 'campaign', 'threat_actor', etc.
    entity_id     UUID NOT NULL,
    chunk_index   INT DEFAULT 0,                            -- for long texts split into chunks
    chunk_text    TEXT NOT NULL,
    embedding     vector(384) NOT NULL,                     -- all-MiniLM-L6-v2 = 384 dims
    model_name    VARCHAR(100) NOT NULL DEFAULT 'all-MiniLM-L6-v2',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_embeddings_entity ON embeddings (entity_type, entity_id);

-- HNSW index for fast approximate nearest neighbor search
CREATE INDEX idx_embeddings_vector ON embeddings
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);


-- Generated summaries (executive & technical)
CREATE TABLE summaries (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type   VARCHAR(50) NOT NULL,
    entity_id     UUID NOT NULL,
    audience      audience_type NOT NULL,
    title         VARCHAR(500),
    content       TEXT NOT NULL,
    llm_model     VARCHAR(100) NOT NULL,
    prompt_tokens INT,
    output_tokens INT,
    rag_sources   JSONB DEFAULT '[]',                       -- IDs of retrieved context chunks
    generated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at    TIMESTAMPTZ,                              -- for auto-regeneration
    is_current    BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_summaries_entity ON summaries (entity_type, entity_id);
CREATE INDEX idx_summaries_audience ON summaries (audience);
CREATE INDEX idx_summaries_current ON summaries (entity_type, entity_id, audience) WHERE is_current = TRUE;
CREATE UNIQUE INDEX idx_summaries_unique_current 
    ON summaries (entity_type, entity_id, audience) WHERE is_current = TRUE;


-- ============================================================
-- USER & ACCESS CONTROL TABLES
-- ============================================================

CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) UNIQUE NOT NULL,
    name          VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),                             -- NULL for SSO-only users
    role          user_role NOT NULL DEFAULT 'viewer',
    tenant_id     UUID,                                     -- for MSSP multi-tenancy
    is_active     BOOLEAN DEFAULT TRUE,
    last_login    TIMESTAMPTZ,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_tenant ON users (tenant_id) WHERE tenant_id IS NOT NULL;


-- API keys for SOAR / MSSP integrations
CREATE TABLE api_keys (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    key_hash      VARCHAR(255) NOT NULL,                    -- bcrypt hash of the API key
    name          VARCHAR(255) NOT NULL,
    scopes        TEXT[] DEFAULT '{}',                       -- e.g., {"read:indicators", "read:campaigns"}
    rate_limit    INT DEFAULT 1000,                         -- requests per hour
    expires_at    TIMESTAMPTZ,
    last_used_at  TIMESTAMPTZ,
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_api_keys_user ON api_keys (user_id);
CREATE INDEX idx_api_keys_hash ON api_keys (key_hash);


-- Audit log (immutable)
CREATE TABLE audit_log (
    id          BIGSERIAL PRIMARY KEY,
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    action      VARCHAR(50) NOT NULL,                       -- 'create', 'update', 'delete', 'search', 'export', 'generate_summary'
    entity_type VARCHAR(50),
    entity_id   UUID,
    details     JSONB DEFAULT '{}',
    ip_address  INET,
    user_agent  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_log_user ON audit_log (user_id);
CREATE INDEX idx_audit_log_action ON audit_log (action);
CREATE INDEX idx_audit_log_entity ON audit_log (entity_type, entity_id);
CREATE INDEX idx_audit_log_time ON audit_log (created_at DESC);


-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all entity tables
CREATE TRIGGER trg_feed_sources_updated BEFORE UPDATE ON feed_sources FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_threat_actors_updated BEFORE UPDATE ON threat_actors FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_campaigns_updated BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_techniques_updated BEFORE UPDATE ON techniques FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_software_updated BEFORE UPDATE ON software FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_indicators_updated BEFORE UPDATE ON indicators FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_vulnerabilities_updated BEFORE UPDATE ON vulnerabilities FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- Function: Upsert IOC (increment sighting if exists, insert if new)
CREATE OR REPLACE FUNCTION upsert_indicator(
    p_stix_id VARCHAR,
    p_type ioc_type,
    p_value TEXT,
    p_confidence INT,
    p_tlp tlp_level,
    p_source_id UUID,
    p_source_name VARCHAR,
    p_raw_data JSONB
) RETURNS UUID AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO indicators (stix_id, type, value, confidence, tlp, source_id, source_name, raw_data)
    VALUES (p_stix_id, p_type, p_value, p_confidence, p_tlp, p_source_id, p_source_name, p_raw_data)
    ON CONFLICT (stix_id) DO UPDATE SET
        sighting_count = indicators.sighting_count + 1,
        last_seen = NOW(),
        confidence = GREATEST(indicators.confidence, EXCLUDED.confidence),
        updated_at = NOW()
    RETURNING id INTO v_id;
    
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;


-- Function: Similarity search for RAG
CREATE OR REPLACE FUNCTION search_embeddings(
    query_embedding vector(384),
    match_count INT DEFAULT 10,
    similarity_threshold FLOAT DEFAULT 0.7
)
RETURNS TABLE (
    entity_type VARCHAR,
    entity_id UUID,
    chunk_text TEXT,
    similarity FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.entity_type,
        e.entity_id,
        e.chunk_text,
        1 - (e.embedding <=> query_embedding) AS similarity
    FROM embeddings e
    WHERE 1 - (e.embedding <=> query_embedding) > similarity_threshold
    ORDER BY e.embedding <=> query_embedding
    LIMIT match_count;
END;
$$ LANGUAGE plpgsql;
