'use client';

import { useTheme } from '@/lib/ThemeContext';
import SectionHeader from '@/components/SectionHeader';
import { repos } from '../data/repos';

export default function OpenSource() {
  const { t } = useTheme();

  return (
    <section id="opensource" style={{ marginBottom: '96px' }}>
      <SectionHeader num="08" title="Open Source" sub="Public repos — scripts, detection rules, and side projects" />

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))' }}>
        {repos.map(repo => (
          <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer"
            className="reveal flex flex-col gap-[8px] border p-[16px_18px] no-underline transition-all duration-200"
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
              <span className="text-[13.5px] font-extrabold" style={{ fontFamily: "'JetBrains Mono',monospace", color: t.accent }}>
                {repo.name}
              </span>
              {repo.language && (
                <span className="text-[9px] border px-[7px] py-[2px] tracking-[0.08em]"
                  style={{ color: t.dim, borderColor: t.border }}>{repo.language}</span>
              )}
            </div>
            <span className="text-[11px] leading-[1.5]" style={{ color: t.text }}>{repo.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
