'use client'

import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="w-full pt-[120px] pb-[120px]">
      <SectionHeader
        tag="MODULE"
        title="EXECUTION_LOGS — Career Timeline"
      />

      <div className="space-y-8">
        {experience.map((entry, index) => (
          <ScrollReveal
            key={`${entry.company}-${entry.role}`}
            delay={index * 0.1}
            className="border border-[#1b2430] bg-[#0a0e14]/50 rounded-lg p-6 hover:border-[#00ff9c]/30 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-mono text-[#00ff9c]">{entry.company}</h3>
                  <span className="text-gray-400">—</span>
                  <span className="text-lg font-mono text-[#E5E7EB]">{entry.role}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-mono">
                  <span>{entry.date}</span>
                  {entry.location && (
                    <>
                      <span className="text-gray-700">•</span>
                      <span>{entry.location}</span>
                    </>
                  )}
                </div>
              </div>
              {entry.metrics && entry.metrics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-[#1b2430] border border-[#2a3441] rounded-full text-xs font-mono"
                    >
                      <span className="text-[#00ff9c]">{metric.value}</span>
                      <span className="text-gray-400 ml-1">{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {entry.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300 text-[15px] leading-relaxed">
                  <span className="text-[#00ff9c] mt-1.5 text-xs">›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1b2430]">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-[#1b2430] text-[#6e7a88] text-xs font-mono rounded border border-[#2a3441]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}