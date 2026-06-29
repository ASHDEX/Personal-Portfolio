'use client';

import { useTheme } from '@/lib/ThemeContext';
import SectionHeader from '@/components/SectionHeader';
import { skillGroups } from '@/data/skills';

export default function Skills() {
  const { t } = useTheme();

  return (
    <section id="skills" style={{ marginBottom: '96px' }}>
      <SectionHeader num="04" title="Capability Matrix" sub="Frameworks, tooling, and domains across the detection lifecycle" />

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))' }}>
        {skillGroups.map(g => (
          <div key={g.title} className="reveal p-[20px_22px] border"
            style={{ background: t.panel, borderColor: t.border }}>
            <div className="text-[12px] tracking-[0.06em] mb-[15px] flex items-center gap-2" style={{ color: t.accent }}>
              <span style={{ color: t.dim }}>$</span>{g.title}
            </div>
            <div className="flex flex-wrap gap-[7px]">
              {g.skills.map(sk => (
                <span key={sk}
                  className="text-[11px] border px-[10px] py-1 tracking-[0.02em] transition-all duration-150 cursor-default"
                  style={{ color: t.text, borderColor: t.border }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = t.accent;
                    (e.currentTarget as HTMLElement).style.color = t.accent;
                    (e.currentTarget as HTMLElement).style.background = t.accentSoft;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = t.border;
                    (e.currentTarget as HTMLElement).style.color = t.text;
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
