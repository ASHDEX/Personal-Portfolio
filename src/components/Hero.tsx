'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const PHRASES = [
  'init system.operator --verbose',
  'hunt --cloud --enterprise --mitre',
  'deploy detection-as-code --gate-ci',
  'respond --incident --contain --recover',
  'enrich --ioc --confidence-score',
];

const LIVE_STATS = [
  { target: 5,   suffix: '+', label: 'Years in the trenches' },
  { target: 8,   suffix: '',  label: 'IR engagements led' },
  { target: 16,  suffix: '+', label: 'Certifications held' },
  { target: 100, suffix: '+', label: 'Detections authored' },
];

const TICKER_ITEMS = [
  { lvl: 'CVE',   text: 'CVE-2024-3094 · xz/liblzma backdoor · CVSS 10.0' },
  { lvl: 'IOC',   text: 'IOC · 185.220.101.0/24 · TOR exit cluster' },
  { lvl: 'TTP',   text: 'TTP · T1566.002 · OAuth consent phishing' },
  { lvl: 'ALERT', text: 'ALERT · DGA beaconing observed on DC01' },
  { lvl: 'TTP',   text: 'TTP · T1055.001 · reflective DLL injection' },
  { lvl: 'IOC',   text: 'IOC · sha256:9f2c…a1 · SilverFox loader' },
  { lvl: 'CVE',   text: 'CVE-2023-23397 · Outlook NTLM leak' },
  { lvl: 'ALERT', text: 'ALERT · AssumeRoleWithSAML from new ASN' },
];

export default function Hero() {
  const { t, openPalette } = useTheme();
  const [typed, setTyped] = useState('');
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const twRef = useRef({ pi: 0, ci: 0, del: false });
  const twTimer = useRef<ReturnType<typeof setTimeout>>();
  const cntTimer = useRef<ReturnType<typeof setInterval>>();

  // Typewriter
  useEffect(() => {
    const tw = twRef.current;
    const tick = () => {
      const cur = PHRASES[tw.pi];
      if (!tw.del) {
        tw.ci++;
        if (tw.ci > cur.length) {
          tw.del = true;
          setTyped(cur);
          twTimer.current = setTimeout(tick, 1600);
          return;
        }
      } else {
        tw.ci--;
        if (tw.ci <= 0) {
          tw.del = false;
          tw.pi = (tw.pi + 1) % PHRASES.length;
        }
      }
      setTyped(cur.slice(0, Math.max(0, tw.ci)));
      twTimer.current = setTimeout(tick, tw.del ? 38 : 78);
    };
    twTimer.current = setTimeout(tick, 400);
    return () => clearTimeout(twTimer.current);
  }, []);

  // Counters
  useEffect(() => {
    cntTimer.current = setInterval(() => {
      setCounts(prev => {
        const next = prev.map((c, i) => {
          const tgt = LIVE_STATS[i].target;
          return c >= tgt ? tgt : Math.min(tgt, c + Math.ceil(tgt / 28));
        });
        if (next.every((c, i) => c >= LIVE_STATS[i].target)) clearInterval(cntTimer.current);
        return next;
      });
    }, 45);
    return () => clearInterval(cntTimer.current);
  }, []);

  const tickerColor: Record<string, string> = {
    CVE: '#ff5f57', IOC: t.accent2, TTP: t.accent, ALERT: t.accent3,
  };
  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '120px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 pointer-events-none animate-gridmove"
        style={{
          backgroundImage: `linear-gradient(${t.heroGrid} 1px, transparent 1px), linear-gradient(90deg, ${t.heroGrid} 1px, transparent 1px)`,
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(ellipse 85% 80% at 35% 45%, #000 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 35% 45%, #000 35%, transparent 100%)',
        }}
      />

      {/* Radar scope */}
      <div className="absolute pointer-events-none"
        style={{ right: '4%', top: '50%', width: '560px', height: '560px', transform: 'translate(0,-50%)' }}>
        <div className="absolute rounded-full" style={{ inset: '-80px', background: `radial-gradient(circle, ${t.glowA}, transparent 60%)`, filter: 'blur(34px)' }} />
        <div className="absolute inset-0 rounded-full border" style={{ borderColor: t.borderHi, opacity: 0.22 }} />
        <div className="absolute rounded-full border" style={{ inset: '90px', borderColor: t.borderHi, opacity: 0.3 }} />
        <div className="absolute rounded-full border" style={{ inset: '180px', borderColor: t.borderHi, opacity: 0.4 }} />
        <div className="absolute rounded-full border" style={{ inset: '255px', borderColor: t.accent, opacity: 0.6, boxShadow: `0 0 12px ${t.accentSoft}` }} />
        <div className="absolute" style={{ left: '50%', top: 0, bottom: 0, width: '1px', background: t.borderHi, opacity: 0.18 }} />
        <div className="absolute" style={{ top: '50%', left: 0, right: 0, height: '1px', background: t.borderHi, opacity: 0.18 }} />
        <div
          className="absolute inset-0 rounded-full animate-radar"
          style={{
            background: `conic-gradient(from 0deg, ${t.accentSoft}, transparent 28%)`,
            opacity: 0.7,
          }}
        />
      </div>

      {/* Floating dots */}
      <div className="absolute pointer-events-none w-[6px] h-[6px] rounded-full animate-[floaty_4s_ease-in-out_infinite]"
        style={{ left: '18%', top: '30%', background: t.accent, boxShadow: `0 0 10px ${t.accent}` }} />
      <div className="absolute pointer-events-none w-[5px] h-[5px] rounded-full animate-[floaty_5.5s_ease-in-out_infinite]"
        style={{ left: '62%', top: '62%', background: t.accent2, boxShadow: `0 0 10px ${t.accent2}` }} />
      <div className="absolute pointer-events-none w-[4px] h-[4px] rounded-full animate-[floaty_4.8s_ease-in-out_infinite]"
        style={{ left: '78%', top: '24%', background: t.accent3, boxShadow: `0 0 10px ${t.accent3}` }} />

      {/* Content */}
      <div className="relative z-[2] max-w-[1120px] mx-auto w-full">
        {/* Status pill */}
        <div className="reveal inline-flex items-center gap-[10px] border px-[14px] py-[7px] mb-[26px]"
          style={{ borderColor: t.border, background: t.panel }}>
          <span className="w-[7px] h-[7px] rounded-full animate-pulse-dot"
            style={{ background: t.accent, boxShadow: `0 0 8px ${t.accent}` }} />
          <span className="text-[11px] tracking-[0.1em]" style={{ color: t.dim }}>
            AVAILABLE FOR LEAD / PRINCIPAL SECURITY ROLES
          </span>
        </div>

        {/* Prompt line */}
        <div className="reveal text-[13px] mb-[18px]" style={{ color: t.dim }}>
          <span style={{ color: t.accent2 }}>jayesh@sec-ops</span>
          <span style={{ color: t.dim }}>:</span>
          <span style={{ color: t.accent }}>~</span>
          <span className="mx-[6px]" style={{ color: t.accent }}>❯</span>
          <span style={{ color: t.bright }}>{typed}</span>
          <span className="inline-block w-[8px] h-[15px] align-[-2px] animate-blink ml-[1px]"
            style={{ background: t.accent }} />
        </div>

        {/* Glitch name */}
        <h1 className="reveal relative mb-[22px]"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800,
            fontSize: 'clamp(56px,12.5vw,150px)',
            lineHeight: 0.86,
            letterSpacing: '-0.035em',
            color: t.bright,
          }}>
          {/* Jayesh */}
          <span className="block relative">
            <span aria-hidden className="absolute inset-0 glitch-top" style={{ color: '#00e5ff', mixBlendMode: 'screen' }}>Jayesh</span>
            <span aria-hidden className="absolute inset-0 glitch-bot" style={{ color: '#ff3d9a', mixBlendMode: 'screen' }}>Jayesh</span>
            Jayesh
          </span>
          {/* Choudhary */}
          <span className="block relative" style={{ color: t.accent, textShadow: `0 0 48px ${t.accentSoft}` }}>
            <span aria-hidden className="absolute inset-0 glitch-top" style={{ color: '#00e5ff', mixBlendMode: 'screen' }}>Choudhary</span>
            <span aria-hidden className="absolute inset-0 glitch-bot" style={{ color: '#ff3d9a', mixBlendMode: 'screen' }}>Choudhary</span>
            Choudhary
          </span>
          {/* Scan line */}
          <div
            className="absolute pointer-events-none animate-namescan"
            style={{
              left: '-2%', width: '104%', height: '2px',
              background: `linear-gradient(90deg, transparent, ${t.accent} 30%, ${t.accent} 70%, transparent)`,
              boxShadow: `0 0 10px ${t.accent}`,
              mixBlendMode: 'screen',
            }}
          />
        </h1>

        {/* Subhead */}
        <h2 className="reveal mb-[26px]"
          style={{ fontSize: 'clamp(15px,2.4vw,21px)', color: t.text, fontWeight: 500, letterSpacing: '0.01em' }}>
          Lead Security Engineer <span style={{ color: t.dim }}>·</span> Detection Engineering{' '}
          <span style={{ color: t.dim }}>·</span> Cloud IR <span style={{ color: t.dim }}>·</span> Threat Intel
        </h2>

        {/* Bio */}
        <p className="reveal mb-[38px] text-[15px] leading-[1.85] max-w-[660px]" style={{ color: t.text }}>
          I build detection-as-code pipelines, hunt adversaries across cloud and enterprise estates,
          and turn threat intelligence into measurable outcomes — from BEC fraud and reflective-DLL
          implants to ground-up SOCs for regulated fintech.
        </p>

        {/* Counters */}
        <div className="reveal flex flex-wrap border mb-[34px] max-w-[760px]"
          style={{ borderColor: t.border, background: t.panel }}>
          {LIVE_STATS.map((s, i) => (
            <div key={i} className="flex-1 min-w-[150px] px-[22px] py-[18px] border-r last:border-r-0"
              style={{ borderColor: t.border }}>
              <div className="text-[34px] font-bold leading-[1]"
                style={{ fontFamily: "'JetBrains Mono',monospace", color: t.accent }}>
                {counts[i]}{s.suffix}
              </div>
              <div className="text-[10px] uppercase tracking-[0.12em] mt-2" style={{ color: t.dim }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="reveal flex flex-wrap gap-3 items-center">
          <button
            onClick={() => {
              const el = document.getElementById('casestudies');
              if (el) window.scrollTo({ top: el.offsetTop - 92, behavior: 'smooth' });
            }}
            className="text-[13px] px-[22px] py-[13px] font-semibold tracking-[0.04em] border-0 cursor-pointer"
            style={{ background: t.accent, color: t.bg, fontFamily: 'inherit' }}
          >
            ▸ View case studies
          </button>
          <a href="mailto:primeash1@gmail.com"
            className="text-[13px] px-[22px] py-[13px] no-underline tracking-[0.04em] border transition-colors"
            style={{ borderColor: t.border, color: t.text }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = t.accent; (e.currentTarget as HTMLAnchorElement).style.color = t.accent; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = t.border; (e.currentTarget as HTMLAnchorElement).style.color = t.text; }}
          >
            ✉ primeash1@gmail.com
          </a>
          <button
            onClick={openPalette}
            className="text-[12px] px-4 py-[13px] border border-dashed cursor-pointer tracking-[0.04em] transition-colors"
            style={{ background: 'transparent', borderColor: t.border, color: t.dim, fontFamily: 'inherit' }}
          >
            Press <span style={{ color: t.accent }}>⌘K</span> to navigate
          </button>
        </div>
      </div>

      {/* Threat ticker */}
      <div className="absolute left-0 right-0 bottom-0 z-[2] flex items-center overflow-hidden border-t"
        style={{ height: '38px', background: t.panel2, borderColor: t.border }}>
        <span className="flex-shrink-0 text-[10px] tracking-[0.14em] font-bold px-3 py-[5px] z-[2]"
          style={{ background: t.accent3, color: t.bg }}>
          ▲ LIVE INTEL
        </span>
        <div className="flex whitespace-nowrap animate-ticker">
          {tickerDouble.map((ti, i) => (
            <span
              key={i}
              className="text-[11px] px-[22px] border-r"
              style={{ color: tickerColor[ti.lvl] ?? t.text, borderColor: t.border }}
            >
              {ti.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
