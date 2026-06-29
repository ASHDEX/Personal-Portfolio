'use client';

import { useTheme } from '@/lib/ThemeContext';
import SectionHeader from '@/components/SectionHeader';
import { projects } from '../data/projects';

export default function Projects() {
  const { t } = useTheme();

  return (
    <section id="projects" style={{ marginBottom: '96px' }}>
      <SectionHeader num="05" title="Deployed Systems" sub="Tools I've designed, built, and shipped to production" />

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px,1fr))' }}>
        {projects.map(p => (
          <div key={p.id} className="reveal flex flex-col border border-t-2 p-[22px_24px]"
            style={{ background: t.panel, borderColor: t.border, borderTopColor: t.accent }}>
            <div className="flex items-baseline gap-[10px] mb-4">
              <span className="text-[13px]" style={{ fontFamily: "'JetBrains Mono',monospace", color: t.dim }}>{p.id}</span>
              <h3 className="m-0 text-[16px] font-bold" style={{ color: t.bright }}>{p.name}</h3>
            </div>

            {[
              { label: 'Problem',  color: t.accent3, text: p.problem },
              { label: 'Approach', color: t.accent2, text: p.approach },
              { label: 'Outcome',  color: t.accent,  text: p.outcome },
            ].map(({ label, color, text }) => (
              <div key={label} className="mb-[13px]">
                <div className="text-[9.5px] tracking-[0.16em] uppercase mb-1" style={{ color }}>{label}</div>
                <p className="m-0 text-[12.5px] leading-[1.7]" style={{ color: t.text }}>{text}</p>
              </div>
            ))}

            <div className="flex flex-wrap gap-[6px] mt-auto pt-2">
              {p.tools.map(tool => (
                <span key={tool} className="text-[10px] border px-2 py-[3px]"
                  style={{ color: t.dim, borderColor: t.border }}>{tool}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
