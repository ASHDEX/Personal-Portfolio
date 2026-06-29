'use client';

import { useTheme } from '@/lib/ThemeContext';
import SectionHeader from '@/components/SectionHeader';
import { certifications } from '../data/certifications';

export default function Certifications() {
  const { t } = useTheme();

  return (
    <section id="certifications" style={{ marginBottom: '96px' }}>
      <SectionHeader num="06" title="Credential Store" sub="15+ active certifications — governance, cloud, and offensive" />

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px,1fr))' }}>
        {certifications.map(cert => (
          <div key={cert.name} className="reveal flex flex-col gap-[6px] border p-[16px_18px] transition-all duration-200"
            style={{ background: t.panel, borderColor: t.border }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = t.accent;
              (e.currentTarget as HTMLElement).style.boxShadow = t.glow;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = t.border;
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-[15px] font-extrabold" style={{ fontFamily: "'JetBrains Mono',monospace", color: t.accent }}>
                {cert.name}
              </span>
              <span className="text-[9px] border px-[7px] py-[2px] tracking-[0.08em]"
                style={{ color: t.dim, borderColor: t.border }}>{cert.issuer}</span>
            </div>
            <span className="text-[11px] leading-[1.5]" style={{ color: t.text }}>{cert.full}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
