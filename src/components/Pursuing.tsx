'use client';

import { useTheme } from '@/lib/ThemeContext';
import SectionHeader from '@/components/SectionHeader';
import { pursuingCerts } from '../data/pursuing';

export default function Pursuing() {
  const { t } = useTheme();

  return (
    <section id="pursuing" style={{ marginBottom: '96px' }}>
      <SectionHeader num="07" title="In Progress" sub="Certifications currently being pursued" />

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px,1fr))' }}>
        {pursuingCerts.map(cert => (
          <div key={cert.name} className="reveal flex flex-col gap-[6px] border border-dashed p-[16px_18px] transition-all duration-200"
            style={{ background: t.panel, borderColor: t.accent3 + '55' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = t.accent3;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = t.accent3 + '55';
            }}
          >
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-[15px] font-extrabold" style={{ fontFamily: "'JetBrains Mono',monospace", color: t.accent3 }}>
                {cert.name}
              </span>
              <span className="text-[9px] border px-[7px] py-[2px] tracking-[0.08em]"
                style={{ color: t.accent3, borderColor: t.accent3 + '55' }}>IN PROGRESS · {cert.target}</span>
            </div>
            <span className="text-[11px] leading-[1.5]" style={{ color: t.text }}>{cert.full}</span>
            <span className="text-[9px]" style={{ color: t.dim }}>{cert.issuer}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
