'use client'

import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { certifications } from '../data/certifications'

export default function Certifications() {
  return (
    <section id="certifications" className="w-full pt-[120px] pb-[120px]">
      <SectionHeader
        tag="MODULE"
        title="CREDENTIAL_STORE — Verified Certifications"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {certifications.map((cert, index) => (
          <ScrollReveal
            key={`${cert.issuer}-${cert.name}`}
            delay={index * 0.05}
            className="border border-[#1b2430] bg-[#0a0e14]/50 rounded-lg p-4 hover:border-[#00ff9c]/30 transition-colors duration-300"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <h3 className="text-sm font-mono font-semibold text-[#e6edf3] mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-[#6e7a88] font-mono mb-3">
                  {cert.fullName}
                </p>
              </div>
              <div className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono font-semibold text-[#0a0e14] whitespace-nowrap ${cert.badgeColor}`}>
                {cert.badgeLabel}
              </div>
            </div>
            <div className="pt-3 border-t border-[#1b2430] flex items-center justify-between">
              <p className="text-[10px] text-[#6e7a88] font-mono uppercase tracking-wider">
                {cert.issuer}
              </p>
              <span className="text-[10px] text-[#00ff9c] font-mono">
                ✓ VERIFIED
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>

    </section>
  )
}