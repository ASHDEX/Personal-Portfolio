'use client'

import { useEffect, useRef } from 'react'

const LOG_LINES = [
  '[INFO]  detection pipeline initialized',
  '[OK]    system integrity check passed',
  '[INFO]  threat intel feed updated — 2,847 new IOCs ingested',
  '[ALERT] suspicious authentication pattern detected — source: 185.220.101.47',
  '[INFO]  SIEM correlation engine running — 14 active rules',
  '[OK]    endpoint telemetry nominal — 312 agents reporting',
  '[WARN]  anomalous outbound traffic — port 4444 — flagged for review',
  '[INFO]  cloud posture scan complete — 0 critical findings',
  '[ALERT] brute force attempt blocked — 47 failed auth in 90s',
  '[INFO]  incident response playbook triggered — IR-2024-0931',
  '[OK]    firewall rule set synchronized',
  '[INFO]  vulnerability scan scheduled — next window: 02:00 UTC',
  '[ALERT] lateral movement indicator — SMB traversal detected',
  '[INFO]  log aggregation pipeline healthy — 4.2M events/hr',
  '[OK]    certificate rotation completed — 3 services updated',
  '[INFO]  threat hunt query executed — no matches',
  '[WARN]  dns query anomaly — domain: update-cdn-secure[.]net',
  '[INFO]  patch compliance report generated — 94.7% coverage',
  '[OK]    backup integrity verified — all snapshots clean',
  '[ALERT] privilege escalation attempt — process: svchost.exe — pid 8844',
  '[INFO]  network baseline recalibrated — 847 hosts profiled',
  '[OK]    SOC shift handoff logged — 0 open P1 incidents',
]

export default function LogStream() {
  const containerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Duplicate lines so the scroll loops seamlessly
    const doubled = [...LOG_LINES, ...LOG_LINES]
    el.innerHTML = doubled
      .map(
        (line) => {
          const level = line.startsWith('[ALERT]')
            ? 'text-red-500/25'
            : line.startsWith('[WARN]')
            ? 'text-yellow-500/20'
            : line.startsWith('[OK]')
            ? 'text-[#00FF8C]/20'
            : 'text-gray-600/40'
          return `<div class="leading-6 ${level}">${line}</div>`
        }
      )
      .join('')

    const halfHeight = el.scrollHeight / 2

    function tick() {
      posRef.current += 0.35 // px per frame ~21px/s at 60fps
      if (posRef.current >= halfHeight) posRef.current = 0
      el!.style.transform = `translateY(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed right-0 top-0 h-full w-[340px] pointer-events-none overflow-hidden z-0 select-none hidden xl:block"
      style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)' }}
    >
      <div
        ref={containerRef}
        className="font-mono text-[10px] tracking-wide px-4 pt-8 will-change-transform"
      />
    </div>
  )
}
