'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import { caseStudies } from '@/data/casestudies';

export default function CaseStudies() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <SectionHeader
        tag="MODULE"
        title="INCIDENT_RESPONSE — Case Studies & Engagements (Anonymized)"
      />

      <div className="mt-8 space-y-4">
        {caseStudies.map((cs, index) => (
          <ScrollReveal key={cs.id} delay={index * 0.04}>
            <div className="bg-[#0d1117] border border-[#1b2430]">
              {/* HEADER */}
              <div
                onClick={() => setOpen(open === cs.id ? null : cs.id)}
                className="p-6 cursor-pointer hover:border-[#00cc7d] hover:bg-[#0a0e14] transition-all duration-300 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                    <span className="text-[#6e7a88] text-xs font-mono shrink-0">
                      [{cs.id}]
                    </span>
                    <h3 className="text-[13px] font-semibold text-[#e6edf3] leading-snug">
                      {cs.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] px-2 py-0.5 border border-[#1b2430] text-[#00e5ff] tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[10px] tracking-wider font-bold px-3 py-1 ${
                      cs.severity === 'CRITICAL'
                        ? 'bg-[#ff4444] text-white'
                        : cs.severity === 'HIGH'
                          ? 'bg-[#ffb300] text-[#0a0e14]'
                          : 'bg-[#6e7a88] text-white'
                    }`}
                  >
                    {cs.severity}
                  </span>
                  <span
                    className={`text-[#6e7a88] text-sm transition-transform duration-300 ${
                      open === cs.id ? 'rotate-90' : ''
                    }`}
                  >
                    ▸
                  </span>
                </div>
              </div>

              {/* EXPANDED CONTENT */}
              <AnimatePresence>
                {open === cs.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-[#1b2430] pt-5 space-y-6">
                      {/* SCENARIO */}
                      <div>
                        <h4 className="text-[10px] tracking-[2px] uppercase text-[#00ff9c] mb-2 font-semibold">
                          Scenario
                        </h4>
                        <p className="text-[12px] text-[#c9d1d9] leading-[1.8]">
                          {cs.scenario}
                        </p>
                      </div>

                      {/* INVESTIGATION */}
                      <div>
                        <h4 className="text-[10px] tracking-[2px] uppercase text-[#00e5ff] mb-2 font-semibold">
                          Investigation
                        </h4>
                        <p className="text-[12px] text-[#c9d1d9] leading-[1.8]">
                          {cs.investigation}
                        </p>
                      </div>

                      {/* RESPONSE */}
                      <div>
                        <h4 className="text-[10px] tracking-[2px] uppercase text-[#ffb300] mb-2 font-semibold">
                          Response
                        </h4>
                        <p className="text-[12px] text-[#c9d1d9] leading-[1.8]">
                          {cs.response}
                        </p>
                      </div>

                      {/* DETECTION EXAMPLE */}
                      {cs.detectionExample && (
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <h4 className="text-[10px] tracking-[2px] uppercase text-[#ff6ec7] font-semibold">
                              Detection: {cs.detectionExample.title}
                            </h4>
                            <span className="text-[9px] px-2 py-0.5 bg-[rgba(0,255,156,0.13)] text-[#00ff9c] tracking-wider">
                              MITRE {cs.detectionExample.mitre}
                            </span>
                            <span className="text-[9px] text-[#6e7a88]">
                              {cs.detectionExample.language}
                            </span>
                          </div>
                          <pre className="bg-[#0a0e14] border border-[#1b2430] p-4 overflow-x-auto text-[11px] leading-[1.7] text-[#c9d1d9] font-mono">
                            <code>{cs.detectionExample.code}</code>
                          </pre>
                        </div>
                      )}

                      {/* IMPACT METRICS */}
                      <div>
                        <h4 className="text-[10px] tracking-[2px] uppercase text-[#ff7b72] mb-3 font-semibold">
                          Impact Metrics
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {cs.impact.map((m, i) => (
                            <div
                              key={i}
                              className="bg-[#0a0e14] border border-[#1b2430] p-3"
                            >
                              <div className="text-[12px] font-bold text-[#00cc7d]">
                                {m.value}
                              </div>
                              <div className="text-[9px] text-[#6e7a88] mt-1">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* IMPACT SUMMARY */}
                      <div>
                        <h4 className="text-[10px] tracking-[2px] uppercase text-[#79c0ff] mb-2 font-semibold">
                          Summary
                        </h4>
                        <p className="text-[12px] text-[#c9d1d9] leading-[1.8]">
                          {cs.impactSummary}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
