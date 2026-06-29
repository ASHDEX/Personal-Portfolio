'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import SectionHeader from '@/components/SectionHeader';
import { caseStudies } from '@/data/casestudies';

export default function CaseStudies() {
  const { t } = useTheme();
  const [openId, setOpenId] = useState<string | null>('01');

  return (
    <section id="casestudies" style={{ marginBottom: '96px' }}>
      <SectionHeader num="02" title="Incident Files" sub="Real engagements — redacted & generalized. Click to open the report." />

      <div className="flex flex-col gap-[14px]">
        {caseStudies.map(cs => {
          const isOpen = openId === cs.id;
          const sevColor = cs.severity === 'CRITICAL' ? '#ff5f57' : t.accent3;
          return (
            <div key={cs.id} className="reveal" style={{ background: t.panel, border: `1px solid ${isOpen ? t.borderHi : t.border}` }}>
              {/* Header button */}
              <button
                onClick={() => setOpenId(isOpen ? null : cs.id)}
                aria-expanded={isOpen}
                aria-controls={`cs-body-${cs.id}`}
                className="w-full text-left border-0 cursor-pointer flex gap-4 items-start p-[20px_22px]"
                style={{ background: 'transparent', fontFamily: 'inherit' }}
              >
                <span className="text-[22px] font-extrabold leading-[1] mt-[-2px]"
                  style={{ fontFamily: "'JetBrains Mono',monospace", color: isOpen ? t.accent : t.dim }}>
                  {cs.id}
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-center gap-[10px] mb-[9px]">
                    <span className="text-[9px] tracking-[0.14em] font-bold border px-2 py-[2px]"
                      style={{ color: sevColor, borderColor: sevColor }}>
                      {cs.severity}
                    </span>
                    <span className="text-[16px] font-semibold leading-[1.35]" style={{ color: t.bright }}>{cs.title}</span>
                  </span>
                  <span className="flex flex-wrap gap-[6px]">
                    {cs.tags.map(tag => (
                      <span key={tag} className="text-[9.5px] border px-2 py-[2px] tracking-[0.03em]"
                        style={{ color: t.dim, borderColor: t.border }}>{tag}</span>
                    ))}
                  </span>
                </span>
                <span className="text-[14px] mt-1" style={{ color: t.accent }}>{isOpen ? '▾' : '▸'}</span>
              </button>

              {/* Expanded body */}
              {isOpen && (
                <div id={`cs-body-${cs.id}`} role="region" className="px-[22px] pb-6 border-t" style={{ borderColor: t.border }}>
                  <div className="grid gap-[18px] mt-[18px]">
                    {[
                      { label: '› Scenario',     color: t.accent3, text: cs.scenario },
                      { label: '› Investigation', color: t.accent2, text: cs.investigation },
                      { label: '› Response',      color: t.accent,  text: cs.response },
                    ].map(({ label, color, text }) => (
                      <div key={label}>
                        <div className="text-[10px] tracking-[0.16em] uppercase mb-[6px]" style={{ color }}>{label}</div>
                        <p className="m-0 text-[13px] leading-[1.75]" style={{ color: t.text }}>{text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Impact metrics */}
                  <div className="flex flex-wrap gap-[10px] mt-[18px]">
                    {cs.impact.map((m, i) => (
                      <div key={i} className="border border-b-2 px-[14px] py-[9px] min-w-[112px]"
                        style={{ borderColor: t.border, borderBottomColor: t.accent }}>
                        <div className="text-[15px] font-bold" style={{ fontFamily: "'JetBrains Mono',monospace", color: t.accent2 }}>{m.value}</div>
                        <div className="text-[9px] uppercase tracking-[0.1em] mt-[2px]" style={{ color: t.dim }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Code exhibit */}
                  {cs.detectionExample && (
                    <div className="mt-[20px] border" style={{ borderColor: t.border, background: t.panel2 }}>
                      <div className="flex flex-wrap justify-between gap-2 px-[14px] py-[10px] border-b" style={{ borderColor: t.border }}>
                        <span className="text-[11.5px]" style={{ color: t.bright }}>⬡ {cs.detectionExample.title}</span>
                        <span className="text-[10px] tracking-[0.06em]" style={{ color: t.accent3 }}>
                          {cs.detectionExample.mitre} · {cs.detectionExample.language}
                        </span>
                      </div>
                      <pre className="nobar m-0 px-4 py-[14px] overflow-x-auto text-[11.5px] leading-[1.65]"
                        style={{ fontFamily: "'JetBrains Mono',monospace", color: t.text }}>
                        <code>{cs.detectionExample.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
