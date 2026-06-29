'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import SectionHeader from '@/components/SectionHeader';
import { mitreTactics } from '@/data/mitre';
import { MitreTech } from '@/types';

interface Selected extends MitreTech { tactic: string; }

const DEFAULT: Selected = {
  tactic: 'Defense Evasion',
  id: 'T1055.001',
  name: 'Reflective DLL Injection',
  case: '02',
};

export default function AttackMatrix() {
  const { t } = useTheme();
  const [sel, setSel] = useState<Selected>(DEFAULT);

  const { techSet, engSet } = useMemo(() => {
    const techSet = new Set<string>();
    const engSet = new Set<string>();
    mitreTactics.forEach(col => col.techs.forEach(tx => {
      techSet.add(tx.id);
      engSet.add(tx.case ?? tx.exp ?? '');
    }));
    return { techSet, engSet };
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 92, behavior: 'smooth' });
  };

  const viewEvidence = () => {
    if (sel.case) goTo('casestudies');
    else goTo('experience');
  };

  const evidenceLabel = sel.case
    ? `Incident File ${sel.case}`
    : sel.exp ?? '';

  return (
    <section id="attack" style={{ marginBottom: '96px' }}>
      <SectionHeader
        num="03"
        title="ATT&CK Coverage"
        sub="Adversary techniques I've detected, hunted, or responded to — click any cell for the evidence"
      />

      {/* Stat strip */}
      <div className="reveal flex flex-wrap border mb-[18px]" style={{ borderColor: t.border }}>
        {[
          { v: techSet.size,           label: 'Techniques mapped',   color: t.accent },
          { v: mitreTactics.length,    label: 'ATT&CK tactics',      color: t.accent2 },
          { v: engSet.size,            label: 'Source engagements',  color: t.accent3 },
        ].map(s => (
          <div key={s.label} className="flex-1 min-w-[130px] px-5 py-[15px] border-r last:border-r-0"
            style={{ borderColor: t.border }}>
            <div className="text-[28px] font-extrabold leading-[1]"
              style={{ fontFamily: "'JetBrains Mono',monospace", color: s.color }}>{s.v}</div>
            <div className="text-[10px] uppercase tracking-[0.12em] mt-[6px]" style={{ color: t.dim }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Selected detail bar */}
      <div className="reveal flex flex-wrap items-center gap-4 border border-l-[3px] p-[18px_20px] mb-[18px]"
        style={{ background: t.panel, borderColor: t.borderHi, borderLeftColor: t.accent, boxShadow: t.glow }}>
        <div className="flex-1 min-w-[240px]">
          <div className="flex items-center gap-[10px] mb-[7px]">
            <span className="text-[14px] font-bold" style={{ fontFamily: "'JetBrains Mono',monospace", color: t.accent }}>{sel.id}</span>
            <span className="text-[9px] tracking-[0.12em] uppercase border px-2 py-[2px] whitespace-nowrap"
              style={{ color: t.dim, borderColor: t.border }}>{sel.tactic}</span>
          </div>
          <div className="text-[18px] font-semibold mb-[5px]" style={{ color: t.bright }}>{sel.name}</div>
          <div className="text-[12px]" style={{ color: t.dim }}>
            Demonstrated in: <span style={{ color: t.accent2 }}>{evidenceLabel}</span>
          </div>
        </div>
        <button onClick={viewEvidence}
          className="text-[12px] px-[18px] py-3 font-semibold tracking-[0.04em] border-0 cursor-pointer whitespace-nowrap"
          style={{ background: t.accent, color: t.bg, fontFamily: 'inherit' }}>
          ▸ View evidence
        </button>
      </div>

      {/* Matrix columns */}
      <div className="nobar reveal overflow-x-auto flex gap-[10px] pb-[10px]">
        {mitreTactics.map(col => (
          <div key={col.tactic} className="flex-shrink-0 w-[178px]">
            <div className="text-[10px] tracking-[0.08em] uppercase px-[10px] py-2 border-b mb-2 overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ color: t.dim, borderColor: t.border }}>
              {col.tactic}
            </div>
            <div className="flex flex-col gap-[6px]">
              {/* Covered techs */}
              {col.techs.map(tx => {
                const isSel = sel.id === tx.id && sel.tactic === col.tactic;
                return (
                  <button key={tx.id}
                    onClick={() => setSel({ ...tx, tactic: col.tactic })}
                    className="text-left border cursor-pointer p-[9px_11px] transition-all duration-150"
                    style={{
                      fontFamily: 'inherit',
                      background: isSel ? t.accent : t.panel,
                      borderColor: isSel ? t.accent : t.borderHi,
                      borderStyle: 'solid',
                    }}>
                    <div className="text-[11px] font-bold"
                      style={{ fontFamily: "'JetBrains Mono',monospace", color: isSel ? t.bg : t.accent }}>
                      {tx.id}
                    </div>
                    <div className="text-[11px] leading-[1.35] mt-[3px]"
                      style={{ color: isSel ? t.bg : t.bright }}>
                      {tx.name}
                    </div>
                  </button>
                );
              })}
              {/* Dimmed techs */}
              {col.dim.map(d => (
                <div key={d.id} className="border p-[9px_11px]"
                  style={{ opacity: 0.4, borderStyle: 'dashed', borderColor: t.border, background: 'transparent' }}>
                  <div className="text-[11px] font-bold"
                    style={{ fontFamily: "'JetBrains Mono',monospace", color: t.dim }}>{d.id}</div>
                  <div className="text-[11px] leading-[1.35] mt-[3px]" style={{ color: t.dim }}>{d.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
