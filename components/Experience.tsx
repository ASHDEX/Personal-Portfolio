'use client'

import { experiences } from '@/data/experience'
import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

export default function Experience() {
  return (
    <section id="experience" className="w-full pt-[120px] pb-[120px]">
      <div>
        {/* Section header */}
        <AnimateIn delay={0}>
          <div className="border-l border-[#00D9FF] pl-4 mb-6">
            <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::EXECUTION_LOGS ]</div>
            <h2 className="text-[30px] font-mono neon-blue">
              $ run execution.log --operator=jayesh<Cursor />
            </h2>
            <div className="text-gray-600 text-xs font-mono mt-1">
              <span className="text-[#00D9FF]/40">›</span> stream logs --format=timeline --depth=full
            </div>
          </div>
        </AnimateIn>

        {/* Vertical timeline */}
        <AnimateIn delay={0.1}>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800"></div>

            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-12 mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-3 top-2 w-3 h-3 bg-[#00FF8C]"></div>

                <div className="font-mono">
                  {/* Role header */}
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h3 className="text-[19px] text-[#E5E7EB]">
                      <span className="neon-green">{exp.company}</span>
                      <span className="text-gray-400 mx-2">—</span>
                      <span className="text-[#00FF8C]">{exp.role}</span>
                    </h3>
                    <span className="text-gray-400 text-sm mt-1 md:mt-0">{exp.period}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-500 text-[14px] leading-relaxed mb-5 border-l border-gray-800 pl-3">
                    {exp.summary}
                  </p>

                  {/* Key Contributions subheading */}
                  <div className="text-xs text-gray-600 tracking-widest mb-3">IMPACT DELIVERED</div>

                  {/* Bullet points */}
                  <ul className="space-y-3 mb-5">
                    {exp.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start">
                        <span className="text-[#00FF8C] mr-3">*</span>
                        <span className="text-[15px] leading-relaxed text-gray-300">
                          <span className="text-[#E5E7EB]">{bullet.verb}</span>{' '}
                          {bullet.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Metrics row */}
                  <div className="flex flex-wrap gap-6">
                    {exp.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-baseline gap-1.5">
                        <span className="text-gray-600 text-xs">{metric.label}</span>
                        {metric.direction && (
                          <span className={`text-xs ${metric.direction === '↓' ? 'text-[#00D9FF]' : 'text-[#00FF8C]'}`}>
                            {metric.direction}
                          </span>
                        )}
                        <span className="text-[#00FF8C] text-sm font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-1 text-xs font-mono text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>executing... execution.log</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>process complete — all metrics verified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">└─</span>
              <span className="text-[#00FF8C]/40">EXECUTION_LOGS :: stream closed [OK]</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}