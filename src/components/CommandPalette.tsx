'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface Cmd {
  icon: string;
  label: string;
  hint: string;
  kw: string;
  run: () => void;
}

const NAV_SECTIONS = [
  { id: 'about',          label: 'WHOAMI' },
  { id: 'experience',     label: 'TIMELINE' },
  { id: 'casestudies',    label: 'INCIDENT_FILES' },
  { id: 'attack',         label: 'ATT&CK' },
  { id: 'skills',         label: 'CAPABILITY' },
  { id: 'projects',       label: 'DEPLOYED' },
  { id: 'certifications', label: 'CREDENTIALS' },
  { id: 'contact',        label: 'COMMS' },
];

function goTo(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 92, behavior: 'smooth' });
}

export default function CommandPalette() {
  const { t, paletteOpen, closePalette, setVariant } = useTheme();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (paletteOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [paletteOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape' && paletteOpen) closePalette();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [paletteOpen, closePalette]);

  if (!paletteOpen) return null;

  const allCmds: Cmd[] = [
    ...NAV_SECTIONS.map(n => ({
      icon: '⌕',
      label: `Jump to ${n.label}`,
      hint: 'SECTION',
      kw: n.label + ' ' + n.id,
      run: () => { goTo(n.id); closePalette(); },
    })),
    { icon: '✉', label: 'Email Jayesh', hint: 'mailto', kw: 'email mail contact', run: () => { window.location.href = 'mailto:primeash1@gmail.com'; closePalette(); } },
    { icon: '▸', label: 'Open LinkedIn', hint: 'external', kw: 'linkedin', run: () => { window.open('https://www.linkedin.com/in/jayesh-chaudhary-cissp-cism-cisa-5b563519b/', '_blank'); closePalette(); } },
    { icon: '▸', label: 'Open GitHub', hint: 'external', kw: 'github code', run: () => { window.open('https://github.com/Ashdex', '_blank'); closePalette(); } },
    { icon: '▸', label: 'Open FreeIntelHub', hint: 'external', kw: 'freeintelhub oss intel', run: () => { window.open('https://github.com/ASHDEX/FreeIntelhub', '_blank'); closePalette(); } },
    { icon: '▸', label: 'Open Blog', hint: 'external', kw: 'blog news', run: () => { window.open('https://dailydoesofcybersecuritynews.com', '_blank'); closePalette(); } },
    { icon: '◑', label: 'Switch theme — Green / Cyan', hint: 'THEME', kw: 'theme color green cyan toggle', run: () => setVariant('terminal') },
    { icon: '◑', label: 'Switch to Green theme', hint: 'THEME', kw: 'green terminal', run: () => { setVariant('terminal'); closePalette(); } },
    { icon: '◑', label: 'Switch to Cyan theme', hint: 'THEME', kw: 'cyan console blue', run: () => { setVariant('console'); closePalette(); } },
  ];

  const q = query.trim().toLowerCase();
  const filtered = q
    ? allCmds.filter(c => (c.label + ' ' + c.kw).toLowerCase().includes(q))
    : allCmds;

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filtered[0]) filtered[0].run();
  };

  return (
    <div
      className="fixed inset-0 z-[250] flex items-start justify-center"
      style={{ background: 'rgba(4,7,11,0.78)', paddingTop: '14vh' }}
      onClick={closePalette}
    >
      <div
        className="w-[560px] max-w-[92vw]"
        style={{ background: t.panel, border: `1px solid ${t.borderHi}`, boxShadow: `0 24px 80px rgba(0,0,0,0.6), ${t.glow}` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-[10px] px-4 py-[14px] border-b" style={{ borderColor: t.border }}>
          <span style={{ color: t.accent, fontSize: '14px' }}>❯</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Jump to a section, open a link, switch theme…"
            className="flex-1 bg-transparent border-0 outline-none text-[14px]"
            style={{ color: t.bright, fontFamily: 'inherit' }}
          />
          <span className="text-[10px] border px-[7px] py-[2px]" style={{ color: t.dim, borderColor: t.border }}>ESC</span>
        </div>

        {/* Results */}
        <div className="nobar max-h-[340px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-5 text-center text-[12px]" style={{ color: t.dim }}>
              no matching command — try &quot;linkedin&quot;, &quot;case&quot;, &quot;theme&quot;
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <button key={i} onClick={cmd.run}
                className="w-full text-left border-0 border-l-2 cursor-pointer flex items-center gap-3 px-[14px] py-[11px] mb-[2px] transition-colors duration-100"
                style={{
                  fontFamily: 'inherit',
                  background: 'transparent',
                  borderColor: 'transparent',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = t.accentSoft;
                  (e.currentTarget as HTMLElement).style.borderColor = t.accent;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                }}
              >
                <span style={{ color: t.accent, fontSize: '12px', width: '18px' }}>{cmd.icon}</span>
                <span className="flex-1 text-[13px]" style={{ color: t.bright }}>{cmd.label}</span>
                <span className="text-[10px] tracking-[0.08em]" style={{ color: t.dim }}>{cmd.hint}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
