'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const LINES = [
  'kernel: sec-ops-core v2.1 loaded',
  'init: starting detection-pipeline.service',
  'init: starting threat-intel-feed.service',
  'init: starting siem-connector.service',
  'init: starting identity-monitor.service',
  'systemctl: all modules active [OK]',
]

const TYPING_SPEED = 28
const LINE_DELAY = 180

interface BootSequenceProps {
  onComplete?: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [show, setShow] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentLine >= LINES.length) {
      setIsComplete(true)
      return
    }
    const line = LINES[currentLine]
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), TYPING_SPEED)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, LINE_DELAY)
      return () => clearTimeout(t)
    }
  }, [currentLine, currentChar])

  useEffect(() => {
    const iv = setInterval(() => setCursorVisible(v => !v), 500)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    if (isComplete) {
      const t = setTimeout(() => {
        setShow(false)
        onComplete?.()
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [isComplete, onComplete])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center font-mono"
    >
      <div className="w-full max-w-[600px] px-6">
        {/* Header bar */}
        <div className="border border-[#00FF8C]/20 bg-[#0A0A0A] px-4 py-2 mb-1 flex items-center justify-between">
          <span className="text-[#00FF8C]/60 text-xs tracking-widest">SEC-OPS TERMINAL</span>
          <span className="text-gray-600 text-xs">v2.1</span>
        </div>

        {/* Boot log */}
        <div className="border border-[#00FF8C]/20 bg-[#050505] px-4 py-5 space-y-1.5">
          {LINES.map((line, i) => {
            const isPast = i < currentLine
            const isActive = i === currentLine
            const text = isPast ? line : isActive ? line.substring(0, currentChar) : ''
            if (!text && !isActive) return null

            const isOk = isPast && line.endsWith('[OK]')
            return (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-[#00FF8C]/40 shrink-0">$</span>
                <span className={isOk ? 'text-[#00FF8C]' : 'text-gray-400'}>
                  {text}
                  {isActive && (
                    <span
                      className="ml-0.5 inline-block w-2 h-4 bg-[#00FF8C] align-middle"
                      style={{ opacity: cursorVisible ? 1 : 0 }}
                    />
                  )}
                </span>
              </div>
            )
          })}
        </div>

        {/* Status line */}
        <div className="border border-t-0 border-[#00FF8C]/20 bg-[#0A0A0A] px-4 py-2 flex items-center justify-between">
          {isComplete ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-[#00FF8C] tracking-widest"
            >
              SYSTEM READY — AUTHENTICATING OPERATOR...
            </motion.span>
          ) : (
            <span className="text-xs text-gray-600 tracking-widest">
              BOOTING... {currentLine + 1}/{LINES.length}
            </span>
          )}
          <span
            className="w-1.5 h-1.5 bg-[#00FF8C]"
            style={{ boxShadow: '0 0 4px #00FF8C', opacity: cursorVisible ? 1 : 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
