'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const BOOT_LINES = [
  { text: '[BIOS]  POST check ........................ OK',           color: '#ffb300' },
  { text: '[NET]   Secure tunnel ......... TLS 1.3 ONLINE',          color: '#ffb300' },
  { text: '[AUTH]  operator: jayesh_choudhary .. VERIFIED',          color: '#ffb300' },
  { text: '[AUTH]  clearance: CISSP|CISM|CISA .. LEVEL-5',           color: '#ffb300' },
  { text: '[MOD]   TIMELINE .......... career      LOADED',           color: '#6e7a88' },
  { text: '[MOD]   INCIDENT_FILES .... IR ops      LOADED',           color: '#6e7a88' },
  { text: '[MOD]   CAPABILITY_MATRIX . skills      LOADED',           color: '#6e7a88' },
  { text: '[MOD]   CREDENTIAL_STORE .. 16 certs    LOADED',           color: '#6e7a88' },
  { text: '[SIEM]  Detection engine ........... ACTIVE',             color: '#ffb300' },
  { text: '[CTI]   Threat-intel feeds ..... 50+ SOURCES',            color: '#00e5ff' },
  { text: '[READY] All systems operational. Welcome.',               color: 'accent' },
];

const INTERVAL = 165;

export default function BootSequence() {
  const { t } = useTheme();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(() => {
    if (typeof sessionStorage === 'undefined') return true;
    return !sessionStorage.getItem('booted');
  });

  const skip = useCallback(() => {
    sessionStorage.setItem('booted', '1');
    setStep(BOOT_LINES.length);
    setTimeout(() => setVisible(false), 500);
  }, []);

  useEffect(() => {
    if (step >= BOOT_LINES.length) {
      sessionStorage.setItem('booted', '1');
      const t = setTimeout(() => setVisible(false), 650);
      return () => clearTimeout(t);
    }
    const id = setTimeout(() => setStep(s => s + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [step]);

  useEffect(() => {
    const handler = () => { if (step < BOOT_LINES.length) skip(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step, skip]);

  if (!visible) return null;

  const pct = Math.round((step / BOOT_LINES.length) * 100);

  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center p-6 cursor-pointer"
      style={{ background: t.bg }}
      onClick={skip}
    >
      <div className="w-[560px] max-w-[94vw]">
        {/* Window chrome */}
        <div className="flex items-center gap-[7px] px-[14px] py-[9px] border border-b-0"
          style={{ background: t.panel, borderColor: t.border }}>
          <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          <span className="ml-[10px] text-[10px] tracking-[0.12em]" style={{ color: t.dim }}>
            sec-ops-terminal — boot
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-[18px] text-[12.5px] leading-[1.7] min-h-[240px] border"
          style={{ background: t.panel2, borderColor: t.border }}
          aria-live="polite"
          aria-atomic="false">
          {BOOT_LINES.slice(0, step).map((line, i) => (
            <div
              key={i}
              className="whitespace-pre"
              style={{ color: line.color === 'accent' ? t.accent : line.color }}
            >
              {line.text}
            </div>
          ))}
          <span
            className="inline-block w-[7px] h-[14px] align-[-2px] animate-blink"
            style={{ background: t.accent }}
          />
        </div>

        {/* Progress bar */}
        <div className="h-[2px] mt-[14px] overflow-hidden" style={{ background: t.border }}>
          <div
            className="h-full transition-all duration-[120ms] linear"
            style={{
              width: `${pct}%`,
              background: t.accent,
              boxShadow: `0 0 10px ${t.accent}`,
            }}
          />
        </div>

        {/* Status row */}
        <div className="mt-[9px] flex justify-between text-[10px] tracking-[0.1em]" style={{ color: t.dim }}>
          <span>{step >= BOOT_LINES.length ? 'boot complete' : `loading… ${pct}%`}</span>
          <span>press any key / click to skip ›</span>
        </div>
      </div>
    </div>
  );
}
