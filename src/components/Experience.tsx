'use client';

import { useTheme } from '@/lib/ThemeContext';
import SectionHeader from '@/components/SectionHeader';
import { experience } from '../data/experience';

export default function Experience() {
  const { t } = useTheme();

  return (
    <section id="experience" style={{ marginBottom: '96px' }}>
      <SectionHeader num="01" title="Career Timeline" sub="Six roles · five years · banking, cloud-native, and consulting estates" />

      <div className="relative pl-[30px]">
        {/* Rail */}
        <div className="absolute" style={{ left: '5px', top: '6px', bottom: '6px', width: '1px', background: t.border }} />

        {experience.map((job, idx) => (
          <div key={idx} className="reveal relative mb-[30px]">
            {/* Timeline node */}
            <div className="absolute w-[11px] h-[11px] rounded-full border-2"
              style={{ left: '-29px', top: '6px', background: t.bg, borderColor: t.accent, boxShadow: `0 0 10px ${t.accentSoft}` }} />

            <div className="p-[22px_24px] border border-l-2"
              style={{ background: t.panel, borderColor: t.border, borderLeftColor: t.accent }}>

              <div className="flex flex-wrap justify-between gap-2 items-baseline mb-[3px]">
                <h3 className="m-0 text-[17px] font-bold" style={{ color: t.bright }}>{job.role}</h3>
                <span className="text-[11px] tracking-[0.08em]" style={{ color: t.dim }}>{job.date}</span>
              </div>
              <div className="text-[13px] mb-4" style={{ color: t.accent }}>
                {job.company} <span style={{ color: t.dim }}>· {job.location}</span>
              </div>

              {job.metrics && job.metrics.length > 0 && (
                <div className="flex flex-wrap gap-[10px] mb-4">
                  {job.metrics.map((m, i) => (
                    <div key={i} className="border px-[14px] py-2 min-w-[98px]" style={{ borderColor: t.border }}>
                      <div className="text-[16px] font-bold" style={{ fontFamily: "'JetBrains Mono',monospace", color: t.accent2 }}>{m.value}</div>
                      <div className="text-[9px] uppercase tracking-[0.12em] mt-[2px]" style={{ color: t.dim }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <ul className="m-0 mb-4 p-0 list-none">
                {job.bullets.map((b, i) => (
                  <li key={i} className="relative pl-[18px] text-[13px] leading-[1.7] mb-[6px]" style={{ color: t.text }}>
                    <span className="absolute left-0" style={{ color: t.accent }}>›</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-[7px]">
                {job.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-[9px] py-[3px] border tracking-[0.04em]"
                    style={{ color: t.dim, borderColor: t.border }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
