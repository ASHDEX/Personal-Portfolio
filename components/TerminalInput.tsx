'use client'

import { useState, useRef, useEffect } from 'react'

const COMMANDS: Record<string, { section?: string; description: string }> = {
  help:           { description: 'list available commands' },
  about:          { section: 'about',          description: 'scroll to SYSTEM_INIT' },
  experience:     { section: 'experience',     description: 'scroll to EXEC_LOGS' },
  casestudies:    { section: 'casestudies',    description: 'scroll to INCIDENT_RESPONSE' },
  ir:             { section: 'casestudies',    description: 'alias for casestudies' },
  detection:      { section: 'detection',      description: 'scroll to DETECTION_ENGINE' },
  capabilities:   { section: 'capabilities',   description: 'scroll to CAPABILITY_MATRIX' },
  architecture:   { section: 'architecture',   description: 'scroll to SYSTEM_ARCHITECTURE' },
  grc:            { section: 'grc',            description: 'scroll to GOVERNANCE_LAYER' },
  projects:       { section: 'projects',       description: 'scroll to DEPLOYED_SYSTEMS' },
  certifications: { section: 'certifications', description: 'scroll to CREDENTIAL_STORE' },
  contact:        { section: 'contact',        description: 'scroll to COMMS_INTERFACE' },
  clear:          { description: 'clear terminal history' },
}

type HistoryEntry =
  | { type: 'input'; text: string }
  | { type: 'output'; lines: string[] }
  | { type: 'help' }
  | { type: 'error'; text: string }

function helpLines(): string[] {
  return Object.entries(COMMANDS)
    .filter(([, v]) => v.description && !['ir'].includes(Object.keys(COMMANDS).find(k => COMMANDS[k] === v && k !== 'ir') ?? ''))
    .map(([cmd, v]) => `  ${cmd.padEnd(16)}${v.description}`)
}

export default function TerminalInput() {
  const [input, setInput]       = useState('')
  const [history, setHistory]   = useState<HistoryEntry[]>([])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef  = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of terminal on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  function flashSection(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    el.style.transition = 'background 0.15s ease'
    el.style.background = 'rgba(0,255,140,0.04)'
    setTimeout(() => { el.style.background = '' }, 600)
  }

  function execute(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    const newHistory: HistoryEntry[] = [...history, { type: 'input', text: cmd }]

    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      setCmdHistory(prev => [raw, ...prev])
      setHistoryIdx(-1)
      return
    }

    if (cmd === 'help') {
      newHistory.push({ type: 'help' })
    } else if (COMMANDS[cmd]) {
      const { section } = COMMANDS[cmd]
      if (section) {
        scrollToSection(section)
        flashSection(section)
        newHistory.push({ type: 'output', lines: [`navigating to ${section.toUpperCase()}...`, `> module loaded [OK]`] })
      }
    } else {
      // Fuzzy suggestion
      const matches = Object.keys(COMMANDS).filter(k => k.startsWith(cmd))
      if (matches.length) {
        newHistory.push({ type: 'error', text: `command not found: '${cmd}' — did you mean: ${matches.join(', ')}?` })
      } else {
        newHistory.push({ type: 'error', text: `command not found: '${cmd}' — type 'help' for available commands` })
      }
    }

    setHistory(newHistory)
    setInput('')
    setCmdHistory(prev => [raw, ...prev])
    setHistoryIdx(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      execute(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = historyIdx - 1
      if (next < 0) { setHistoryIdx(-1); setInput(''); return }
      setHistoryIdx(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = Object.keys(COMMANDS).filter(k => k.startsWith(input.toLowerCase()))
      if (matches.length === 1) setInput(matches[0])
    }
  }

  return (
    <div
      className="font-mono border-t border-[#00FF8C]/10 pt-6 pb-2 mt-2 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Label */}
      <div className="text-[#00FF8C]/30 text-[10px] tracking-widest mb-3">[ TERMINAL ]</div>

      {/* History */}
      {history.length > 0 && (
        <div className="mb-2 space-y-1 max-h-48 overflow-y-auto scrollbar-none">
          {history.map((entry, i) => {
            if (entry.type === 'input') {
              return (
                <div key={i} className="flex items-baseline gap-2 text-xs">
                  <span className="text-[#00FF8C]/50 shrink-0">›</span>
                  <span className="text-gray-300">{entry.text}</span>
                </div>
              )
            }
            if (entry.type === 'output') {
              return (
                <div key={i} className="pl-4 space-y-0.5">
                  {entry.lines.map((line, j) => (
                    <div key={j} className="text-[#00FF8C]/60 text-xs">{line}</div>
                  ))}
                </div>
              )
            }
            if (entry.type === 'error') {
              return (
                <div key={i} className="pl-4 text-xs text-red-400/70">{entry.text}</div>
              )
            }
            if (entry.type === 'help') {
              return (
                <div key={i} className="pl-4 space-y-0.5 py-1">
                  <div className="text-[#00D9FF]/50 text-[10px] tracking-widest mb-1">AVAILABLE COMMANDS</div>
                  {Object.entries(COMMANDS).map(([cmd, v]) => (
                    <div key={cmd} className="flex items-baseline gap-3 text-xs">
                      <span className="text-[#00FF8C]/70 w-32 shrink-0">{cmd}</span>
                      <span className="text-gray-600">{v.description}</span>
                    </div>
                  ))}
                </div>
              )
            }
            return null
          })}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input line */}
      <div className="flex items-center gap-2">
        <span className="text-[#00FF8C]/60 text-sm shrink-0">›</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-gray-200 text-sm caret-[#00FF8C] placeholder-gray-700"
          placeholder="_"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="terminal command input"
        />
      </div>

      {/* Tab hint */}
      <div className="text-gray-800 text-[10px] mt-2">
        tab to autocomplete · ↑↓ history · enter to execute
      </div>
    </div>
  )
}
