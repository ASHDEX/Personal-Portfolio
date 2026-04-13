'use client'

import { useEffect, useRef, useState } from 'react'

interface BridgeProps {
  out?: string
  in?: string
}

function useVisible() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function TypedLine({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 18)
    return () => clearInterval(id)
  }, [started, text])

  return <span className={className}>{displayed}</span>
}

function now() {
  // Static timestamp so SSR and client match — avoids hydration mismatch
  return '2024-11-14T00:00:00Z'
}

export default function SectionDivider({ out, in: into }: BridgeProps) {
  const { ref, visible } = useVisible()

  if (!out && !into) {
    return <div className="section-divider" />
  }

  return (
    <div ref={ref} className="relative font-mono">
      <div className="section-divider" />

      <div className="py-5 space-y-2 pl-1 text-[11px]">
        {out && (
          <div className="flex items-baseline gap-2">
            <span className="text-gray-700 shrink-0 hidden sm:inline">{now()}</span>
            <span className="text-[#00FF8C]/40 shrink-0">[OK]</span>
            {visible
              ? <TypedLine text={out} className="text-gray-500" />
              : <span className="text-gray-500 opacity-0">{out}</span>
            }
          </div>
        )}
        {into && (
          <div className="flex items-baseline gap-2">
            <span className="text-gray-700 shrink-0 hidden sm:inline">{now()}</span>
            <span className="text-[#00D9FF]/40 shrink-0">[SYS]</span>
            {visible
              ? <TypedLine text={into} delay={out ? (out.length * 18) + 120 : 0} className="text-gray-400" />
              : <span className="text-gray-400 opacity-0">{into}</span>
            }
          </div>
        )}
      </div>

      <div className="section-divider" />
    </div>
  )
}
