'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { LogLine } from '@/types';

const LOG_POOL: LogLine[] = [
  { lvl: 'OK',   msg: 'Sentinel rule "OAuth consent anomaly" matched — auto-enriched' },
  { lvl: 'WARN', msg: 'High-entropy subdomain burst from 10.4.aa.bb (DGA suspected)' },
  { lvl: 'CRIT', msg: 'AssumeRoleWithSAML to prod account from unknown ASN' },
  { lvl: 'OK',   msg: 'IOC enrichment complete — VT 0/72, OTX pulse matched' },
  { lvl: 'INFO', msg: 'Sigma → KQL compile passed CI for 12 detections' },
  { lvl: 'WARN', msg: 'Defender ASR blocked LSASS access by office macro' },
  { lvl: 'CRIT', msg: 'Reflective DLL load into svchost.exe — IOA fired' },
  { lvl: 'OK',   msg: 'Containment playbook isolated host WS-7731 in 41s' },
  { lvl: 'INFO', msg: 'Purview DLP classified 1,204 docs — 3 SIT hits' },
  { lvl: 'WARN', msg: 'Password-spray pattern across 40 accounts, 1 ip' },
  { lvl: 'OK',   msg: 'Conditional Access blocked legacy-auth sign-in' },
  { lvl: 'CRIT', msg: 'PRT replay detected from TOR exit — session revoked' },
];

interface LiveLogLine extends LogLine { ts: string; key: string; }

function ts() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

function seed(): LiveLogLine[] {
  return [...LOG_POOL].sort(() => Math.random() - 0.5).slice(0, 6)
    .map((l, i) => ({ ...l, ts: ts(), key: 'seed' + i }));
}

export default function LiveOpsBand() {
  const { t } = useTheme();
  const [logLines, setLogLines] = useState<LiveLogLine[]>(seed);
  const [clock, setClock] = useState('--:--:-- UTC');
  const [events, setEvents] = useState(13370);
  const evBase = useRef(13370);

  useEffect(() => {
    const clk = setInterval(() => {
      evBase.current += 1 + Math.floor(Math.random() * 4);
      setClock(ts() + ' UTC');
      setEvents(evBase.current);
    }, 1000);
    const feed = setInterval(() => {
      const pick = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
      setLogLines(prev => [
        { ...pick, ts: ts(), key: Date.now() + Math.random().toString() },
        ...prev,
      ].slice(0, 6));
    }, 2300);
    return () => { clearInterval(clk); clearInterval(feed); };
  }, []);

  const lvlColor: Record<string, string> = {
    OK: t.accent, INFO: t.dim, WARN: t.accent3, CRIT: '#ff5f57',
  };

  return (
    <section style={{ background: t.panel2, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
      <div className="max-w-[1120px] mx-auto px-6 py-7 grid gap-[18px]"
        style={{ gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)' }}
        data-opsgrid>
        {/* Live feed */}
        <div style={{ border: `1px solid ${t.border}`, background: t.panel }}>
          <div className="flex items-center justify-between px-4 py-[10px] border-b text-[11px] tracking-[0.14em]"
            style={{ borderColor: t.border }}>
            <span style={{ color: t.accent }}>// LIVE DETECTION FEED</span>
            <span style={{ color: t.dim }}>tail -f /var/log/soc.log</span>
          </div>
          <div className="px-4 py-3 text-[12px] leading-[1.5] min-h-[172px]">
            {logLines.map(line => (
              <div key={line.key} className="flex gap-[10px] py-[3px] animate-logslide">
                <span className="flex-shrink-0 w-[78px]" style={{ color: t.dim }}>{line.ts}</span>
                <span className="flex-shrink-0 w-[46px] font-semibold" style={{ color: lvlColor[line.lvl] }}>{line.lvl}</span>
                <span style={{ color: t.text }}>{line.msg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry tiles */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'SYSTEM CLOCK',   value: clock,              color: t.accent2 },
            { label: 'EVENTS TRIAGED', value: events.toLocaleString(), color: t.accent },
            { label: 'INTEL FEEDS',    value: '50+',              color: t.accent3, sub: 'active' },
            { label: 'UPTIME',         value: '99.97',            color: t.accent2, sub: '%' },
          ].map(tile => (
            <div key={tile.label} className="p-4 border" style={{ borderColor: t.border, background: t.panel }}>
              <div className="text-[10px] tracking-[0.12em] mb-2" style={{ color: t.dim }}>{tile.label}</div>
              <div className="text-[19px] font-bold" style={{ fontFamily: "'JetBrains Mono',monospace", color: tile.color }}>
                {tile.value}
                {tile.sub && <span className="text-[11px] ml-1" style={{ color: t.dim }}>{tile.sub}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          [data-opsgrid] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
