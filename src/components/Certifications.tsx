'use client'

import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { certifications } from '../data/certifications'

export default function Certifications() {
  return (
    <section id="certifications" className="w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader 
          tag="MODULE" 
          title="CREDENTIAL_STORE — Verified Certifications" 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.name} delay={index * 0.05}>
              <div className="border border-terminal-green/20 p-5 rounded-lg bg-black/30 hover:bg-black/50 hover:border-terminal-green/40 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-terminal-cyan mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">
                      {cert.fullName}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-tertiary">
                        Issuer:
                      </span>
                      <span className="text-xs font-medium text-terminal-green">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                  <div className={`${cert.badgeColor} text-black text-xs font-bold px-2.5 py-1 rounded-full`}>
                    {cert.badgeLabel}
                  </div>
                </div>
                <div className="pt-3 border-t border-terminal-green/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary">
                      Credential ID: {cert.name}
                    </span>
                    <span className="text-xs text-terminal-green font-medium">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-5 px-5 py-3.5 bg-[#0d1117] border border-[#1b2430] text-xs text-[#6e7a88]">
          <span className="text-[#ffb300]">▸ Currently pursuing:</span>{' '}
          <span className="text-[#c9d1d9]">CRISC · ISSMP · ISSAP · ISSEP</span>
        </div>
      </div>
    </section>
  )
}