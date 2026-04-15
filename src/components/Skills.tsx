'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import { skillGroups } from '@/data/skills';
import { frameworks, policyGroups, riskMetrics } from '@/data/grc';

export default function Skills() {
  const [openFramework, setOpenFramework] = useState<string | null>(null);

  return (
    <div>
      <SectionHeader tag="MODULE" title="CAPABILITY_MATRIX — Technical Arsenal & Governance" />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SUB-SECTION: Technical Skills                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[11px] tracking-[2px] uppercase text-[#00ff9c] font-semibold">
          Technical Skills
        </span>
        <span className="flex-1 border-t border-[#1b2430]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group, index) => (
          <ScrollReveal key={group.title} delay={index * 0.05}>
            <div className="bg-[#0d1117] border border-[#1b2430] p-5">
              <h3 className="text-[11px] tracking-[2px] uppercase text-[#00ff9c] mb-3.5 pb-2 border-b border-[#1b2430]">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2.5 py-1 bg-[#0a0e14] border border-[#1b2430] text-[#c9d1d9] hover:border-[#00ff9c] hover:text-[#00ff9c] transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SUB-SECTION: Framework Expertise                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 mb-4 mt-12">
        <span className="text-[11px] tracking-[2px] uppercase text-[#00ff9c] font-semibold">
          Framework Expertise
        </span>
        <span className="flex-1 border-t border-[#1b2430]" />
      </div>

      {frameworks.map((fw, index) => (
        <ScrollReveal key={fw.id} delay={index * 0.05}>
          <div
            className="bg-[#0d1117] border border-[#1b2430] mb-3 cursor-pointer hover:border-[#00cc7d] transition-colors duration-300"
            onClick={() => setOpenFramework(openFramework === fw.id ? null : fw.id)}
          >
            {/* Collapsed header */}
            <div className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="shrink-0 text-[10px] font-bold tracking-wider px-3 py-1.5 bg-[#00ff9c] text-[#0a0e14] uppercase">
                  {fw.name}
                </span>
                <span className="text-xs text-[#6e7a88] truncate hidden sm:block">
                  {fw.fullName}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {fw.outcome && (
                  <span className="text-[10px] px-2.5 py-1 bg-[rgba(0,229,255,0.1)] text-[#00e5ff] tracking-wider hidden md:block">
                    {fw.outcome}
                  </span>
                )}
                <span
                  className={`text-[#6e7a88] text-sm transition-transform duration-300 ${
                    openFramework === fw.id ? 'rotate-90' : ''
                  }`}
                >
                  ▸
                </span>
              </div>
            </div>

            {/* Expanded content */}
            <AnimatePresence>
              {openFramework === fw.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 border-t border-[#1b2430] pt-4">
                    <p className="text-xs text-[#c9d1d9] leading-relaxed mb-4">
                      {fw.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {fw.contributions.map((c, i) => (
                        <li
                          key={i}
                          className="relative pl-5 text-[12px] text-[#c9d1d9] leading-relaxed"
                        >
                          <span className="absolute left-0 text-[#00ff9c]">▸</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                    {fw.outcome && (
                      <div className="inline-flex items-center gap-2 bg-[#0a0e14] border border-[#1b2430] px-4 py-2">
                        <span className="text-[10px] text-[#6e7a88] tracking-wider uppercase">
                          {fw.outcomeLabel}
                        </span>
                        <span className="text-sm font-bold text-[#00e5ff]">
                          {fw.outcome}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      ))}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SUB-SECTION: Policy Design                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 mb-4 mt-12">
        <span className="text-[11px] tracking-[2px] uppercase text-[#00ff9c] font-semibold">
          Policy Design
        </span>
        <span className="flex-1 border-t border-[#1b2430]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policyGroups.map((pg, index) => (
          <ScrollReveal key={pg.title} delay={index * 0.06}>
            <div className="bg-[#0d1117] border border-[#1b2430] p-5 h-full flex flex-col">
              <h4 className="text-[11px] tracking-[2px] uppercase text-[#00e5ff] mb-3 pb-2 border-b border-[#1b2430]">
                {pg.title}
              </h4>
              <ul className="space-y-1.5 mb-4 flex-1">
                {pg.policies.map((p, i) => (
                  <li key={i} className="text-[11px] text-[#c9d1d9] flex items-start gap-2">
                    <span className="text-[#6e7a88] shrink-0 mt-px">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="text-[10px] text-[#6e7a88] border-t border-[#1b2430] pt-3 mt-auto">
                <span className="text-[#ffb300]">IMPACT:</span> {pg.impact}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SUB-SECTION: Risk & Compliance Metrics                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 mb-4 mt-12">
        <span className="text-[11px] tracking-[2px] uppercase text-[#00ff9c] font-semibold">
          Risk & Compliance Metrics
        </span>
        <span className="flex-1 border-t border-[#1b2430]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {riskMetrics.map((m, index) => (
          <ScrollReveal key={m.label} delay={index * 0.04}>
            <div className="bg-[#0d1117] border border-[#1b2430] p-4 text-center hover:border-[#00cc7d] transition-colors duration-300 group">
              <div className="text-xl font-bold text-[#00ff9c] group-hover:text-[#00e5ff] transition-colors">
                {m.value}
              </div>
              <div className="text-[10px] text-[#e6edf3] tracking-wider uppercase mt-1">
                {m.label}
              </div>
              <div className="text-[9px] text-[#6e7a88] mt-1.5 leading-snug">{m.detail}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 text-[11px] text-[#6e7a88] flex items-start gap-2">
        <span className="text-[#00ff9c] shrink-0">›</span>
        <span>
          Frameworks: SOC 2 Type II · ISO 27001/27002 · NIST CSF / SP 800-53 · GDPR · FIRST CSIRT
          <br />
          Tooling: Microsoft Purview · Defender · Intune · Wazuh · Azure Logic Apps · Custom Python automation
        </span>
      </div>
    </div>
  );
}
