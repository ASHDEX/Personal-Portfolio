'use client';

import { useTheme } from '@/lib/ThemeContext';
import SectionHeader from '@/components/SectionHeader';
import { contacts } from '@/data/contacts';

export default function Contact() {
  const { t } = useTheme();

  return (
    <section id="contact" style={{ marginBottom: '40px' }}>
      <SectionHeader num="07" title="Open a Channel" sub="Detection engineering, IR, threat intel, security program builds" />

      <div className="reveal border p-[26px]" style={{ background: t.panel, borderColor: t.border }}>
        <div className="text-[12px] mb-[22px]">
          <span style={{ color: t.accent2 }}>~/contact</span>
          <span style={{ color: t.accent }} className="mx-[6px]">❯</span>
          <span style={{ color: t.dim }}>cat channels.txt</span>
        </div>

        <div className="grid gap-x-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px,1fr))' }}>
          {contacts.map(ct => (
            <div key={ct.label} className="flex items-baseline gap-3 py-[11px] border-b" style={{ borderColor: t.border }}>
              <span className="text-[10px] tracking-[0.12em] min-w-[112px]" style={{ color: t.dim }}>{ct.label}</span>
              {ct.href ? (
                <a href={ct.href} target="_blank" rel="noopener noreferrer"
                  className="text-[13px] no-underline transition-colors duration-150"
                  style={{ color: t.text }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = t.accent}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = t.text}
                >
                  {ct.value}
                </a>
              ) : (
                <span className="text-[13px]" style={{ color: t.text }}>{ct.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
