'use client';

import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import { pursuingCerts } from '@/data/pursuing';

export default function Pursuing() {
  return (
    <div>
      <SectionHeader tag="MODULE" title="IN_PROGRESS — Certifications In Progress" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pursuingCerts.map((cert, index) => (
          <ScrollReveal key={cert.name} delay={index * 0.06}>
            <div className="bg-[#0d1117] border border-[#1b2430] p-5 h-full flex flex-col hover:border-[#00cc7d] transition-colors duration-300">
              {/* Header row */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    cert.expectedTimeline === 'In Progress'
                      ? 'bg-[#00ff9c] animate-pulse shadow-[0_0_6px_#00ff9c]'
                      : 'bg-[#ffb300]'
                  }`} />
                  <h3 className="text-sm font-bold text-[#e6edf3]">{cert.name}</h3>
                </div>
                <span className={`text-[9px] tracking-wider font-semibold px-2 py-0.5 ${
                  cert.expectedTimeline === 'In Progress'
                    ? 'bg-[rgba(0,255,156,0.15)] text-[#00ff9c]'
                    : 'bg-[rgba(255,179,0,0.15)] text-[#ffb300]'
                }`}>
                  {cert.expectedTimeline.toUpperCase()}
                </span>
              </div>

              {/* Full name */}
              <p className="text-[11px] text-[#00e5ff] mb-1">{cert.fullName}</p>

              {/* Issuer */}
              <p className="text-[10px] text-[#6e7a88] mb-3">{cert.issuer}</p>

              {/* Description */}
              <p className="text-[11px] text-[#c9d1d9] leading-relaxed mb-3 flex-1">
                {cert.description}
              </p>

              {/* Relevance */}
              <div className="text-[10px] text-[#6e7a88] border-t border-[#1b2430] pt-3 mt-auto">
                <span className="text-[#ffb300]">RELEVANCE:</span>{' '}
                <span>{cert.relevance}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Recommended sequence note */}
      <div className="mt-4 text-[11px] text-[#6e7a88] flex items-start gap-2">
        <span className="text-[#00ff9c] shrink-0">›</span>
        <span>
          Recommended sequence: CRISC → ISSMP → ISSAP → ISSEP
          <br />
          All three ISS concentrations require active CISSP in good standing.
        </span>
      </div>
    </div>
  );
}
