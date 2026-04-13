'use client'

import { useState } from 'react'
import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

const architectures = [
  {
    id: 'siem',
    category: 'SIEM PIPELINES',
    title: 'Cloud-Native Log Ingestion & Correlation',
    description:
      'Designed and deployed a scalable SIEM pipeline processing 2 TB of security logs daily across AWS, Azure, and on-premises sources.',
    pipeline: [
      { label: 'COLLECT', detail: 'Fluentd / Vector agents' },
      { label: 'BUFFER', detail: 'Kafka queues' },
      { label: 'STORE', detail: 'Elasticsearch (20 nodes)' },
      { label: 'CORRELATE', detail: 'Spark streaming' },
      { label: 'ENRICH', detail: 'Python processors' },
    ],
    metrics: [
      { value: '50K', unit: 'events/sec', label: 'Throughput' },
      { value: '<5s', unit: 'latency', label: 'Ingestion to Alert' },
      { value: '90d', unit: 'hot retention', label: 'Fast Storage' },
      { value: '$0.12', unit: '/GB processed', label: 'Cost Efficiency' },
    ],
    scale: [
      '500+ data sources',
      '10,000+ endpoints',
      '5,000 concurrent analysts',
      '2 TB/day log volume',
    ],
  },
  {
    id: 'dlp',
    category: 'DLP IMPLEMENTATION',
    title: 'Data-Loss Prevention for Hybrid Workforce',
    description:
      'Architected a content-aware DLP system monitoring data in motion, at rest, and in use across cloud SaaS, endpoints, and network egress.',
    pipeline: [
      { label: 'DETECT', detail: 'Symantec DLP' },
      { label: 'CLASSIFY', detail: 'Custom ML classifiers' },
      { label: 'MONITOR', detail: 'Microsoft Purview' },
      { label: 'RESPOND', detail: 'ServiceNow workflows' },
      { label: 'BLOCK', detail: 'Encryption enforcement' },
    ],
    metrics: [
      { value: '200+', unit: 'monthly', label: 'Incidents Blocked' },
      { value: '75%', unit: 'reduction', label: 'False Positives' },
      { value: '2m', unit: 'MTTD', label: 'Mean Time to Detect' },
      { value: '15m', unit: 'MTTR', label: 'Mean Time to Respond' },
    ],
    scale: [
      '15,000 employees protected',
      '200 TB sensitive data',
      '50+ cloud apps monitored',
      '3 enforcement layers',
    ],
  },
  {
    id: 'edr',
    category: 'ENDPOINT SECURITY',
    title: 'Unified EDR & Threat Hunting Platform',
    description:
      'Built a centralized EDR platform aggregating telemetry from CrowdStrike, SentinelOne, and custom sensors for proactive threat hunting.',
    pipeline: [
      { label: 'DEPLOY', detail: 'CrowdStrike via Terraform' },
      { label: 'QUERY', detail: 'Osquery live telemetry' },
      { label: 'ANALYZE', detail: 'Elasticsearch analytics' },
      { label: 'DETECT', detail: 'Custom YARA rules' },
      { label: 'MANAGE', detail: 'TheHive automation' },
    ],
    metrics: [
      { value: '99.8%', unit: 'asset coverage', label: 'Endpoint Coverage' },
      { value: '95%', unit: 'detection rate', label: 'Threat Detection' },
      { value: '<3%', unit: 'CPU impact', label: 'Agent Overhead' },
      { value: '60%', unit: 'faster', label: 'Investigation Time' },
    ],
    scale: [
      '25,000 endpoints',
      'Windows / macOS / Linux',
      'Cloud workloads included',
      'Purple-team validated',
    ],
  },
]

export default function Architecture() {
  const [expanded, setExpanded] = useState<string | null>('siem')

  return (
    <section id="architecture" className="w-full pt-[120px] pb-[120px]">
      <div>
        <AnimateIn delay={0}>
          <div className="border-l border-[#00D9FF] pl-4 mb-6">
            <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::SYSTEM_ARCHITECTURE ]</div>
            <h2 className="text-[30px] font-mono neon-blue">
              $ load system.blueprints --scale --metrics<Cursor />
            </h2>
            <div className="text-gray-600 text-xs font-mono mt-1">
              <span className="text-[#00D9FF]/40">›</span> indexing architecture modules...
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="space-y-0 font-mono">
            {architectures.map((arch, idx) => {
              const isOpen = expanded === arch.id
              return (
                <div
                  key={arch.id}
                  className="border-b border-[#00FF8C]/10 last:border-0"
                >
                  <button
                    className="w-full flex items-center justify-between py-4 cursor-pointer text-left group"
                    onClick={() => setExpanded(isOpen ? null : arch.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[#00FF8C]/40 text-xs shrink-0">
                        [{String(idx + 1).padStart(2, '0')}]
                      </span>
                      <span className={`text-xs tracking-widest shrink-0 transition-colors duration-150 ${isOpen ? 'text-[#00FF8C]' : 'text-[#00FF8C]/60 group-hover:text-[#00FF8C]/90'}`}>
                        {arch.category}
                      </span>
                      <span className="text-gray-700 hidden md:inline shrink-0">—</span>
                      <span className="text-gray-500 text-xs truncate hidden md:inline group-hover:text-gray-400 transition-colors duration-150">
                        {arch.title}
                      </span>
                    </div>
                    <span className="text-[#00FF8C]/40 text-xs ml-4 shrink-0">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-8 pt-2 pl-10">
                      <div className="mb-6">
                        <h3 className="text-[17px] text-[#E5E7EB] mb-2">
                          <span className="text-[#00FF8C]">$</span> {arch.title}
                        </h3>
                        <p className="text-gray-400 text-[14px] leading-relaxed">
                          {arch.description}
                        </p>
                      </div>

                      <div className="mb-6">
                        <div className="text-xs text-gray-600 mb-3 tracking-widest">
                          PIPELINE
                        </div>
                        <div className="flex flex-wrap items-center gap-x-0 gap-y-2 text-xs">
                          {arch.pipeline.map((step, stepIdx) => (
                            <span key={stepIdx} className="flex items-center">
                              <span className="text-[#00FF8C]/70 tracking-wider">{step.label}</span>
                              <span className="text-gray-600 ml-1">({step.detail})</span>
                              {stepIdx < arch.pipeline.length - 1 && (
                                <span className="text-[#00FF8C]/25 mx-2">→</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="text-xs text-gray-600 mb-3 tracking-widest">
                          METRICS
                        </div>
                        <div className="space-y-0">
                          {arch.metrics.map((metric, mIdx) => (
                            <div key={mIdx} className="flex items-baseline gap-4 py-1.5 border-b border-[#00FF8C]/5 last:border-0">
                              <span className="text-[#00FF8C] text-[15px] font-bold w-16 shrink-0">{metric.value}</span>
                              <span className="text-gray-500 text-xs w-28 shrink-0">{metric.unit}</span>
                              <span className="text-gray-600 text-xs">{metric.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-600 mb-3 tracking-widest">
                          SCALE
                        </div>
                        <div className="space-y-1">
                          {arch.scale.map((stat, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2">
                              <span className="text-[#00FF8C]/40 text-xs">▸</span>
                              <span className="text-[14px] text-gray-400">{stat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-10 space-y-1 text-xs font-mono text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>principles: scalability · resilience · automation-first · least-privilege · defense-in-depth</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>all blueprints production-proven — runbooks, Terraform modules, DR plans attached</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">└─</span>
              <span className="text-[#00FF8C]/40">SYSTEM_ARCHITECTURE :: module initialized [OK]</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
