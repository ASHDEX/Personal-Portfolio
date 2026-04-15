'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootLine {
  text: string;
  delay: number;
  type: 'system' | 'ok' | 'info' | 'header' | 'divider' | 'ascii' | 'blank';
}

const BOOT_LINES: BootLine[] = [
  // ASCII Logo
  { text: '┌──────────────────────────────────────────────┐', delay: 30, type: 'divider' },
  { text: '│  ███████╗███████╗ ██████╗     ██████╗ ██████╗│', delay: 20, type: 'ascii' },
  { text: '│  ██╔════╝██╔════╝██╔════╝    ██╔═══██╗██╔══██╗', delay: 20, type: 'ascii' },
  { text: '│  ███████╗█████╗  ██║         ██║   ██║██████╔╝', delay: 20, type: 'ascii' },
  { text: '│  ╚════██║██╔══╝  ██║         ██║   ██║██╔═══╝│', delay: 20, type: 'ascii' },
  { text: '│  ███████║███████╗╚██████╗    ╚██████╔╝██║    │', delay: 20, type: 'ascii' },
  { text: '│  ╚══════╝╚══════╝ ╚═════╝     ╚═════╝ ╚═╝    │', delay: 20, type: 'ascii' },
  { text: '└──────────────────────────────────────────────┘', delay: 30, type: 'divider' },
  { text: '', delay: 40, type: 'blank' },

  // System Init
  { text: 'SEC-OPS TERMINAL v3.0 — Security Operations Platform', delay: 60, type: 'header' },
  { text: 'Build: 2025.06.15-stable | Kernel: sec-ops-core-4.2.1', delay: 40, type: 'system' },
  { text: '', delay: 30, type: 'blank' },

  // Hardware & system checks
  { text: '[BIOS]  POST check ............................ OK', delay: 50, type: 'ok' },
  { text: '[MEM]   Allocating secure memory pool ......... 256MB', delay: 40, type: 'info' },
  { text: '[CPU]   Threat analysis cores ................. 8/8 ONLINE', delay: 50, type: 'ok' },
  { text: '[DISK]  Encrypted storage mount ............... AES-256-XTS', delay: 40, type: 'info' },
  { text: '[NET]   Secure tunnel established ............. TLS 1.3', delay: 50, type: 'ok' },
  { text: '', delay: 30, type: 'blank' },

  // Operator Auth
  { text: '── OPERATOR AUTHENTICATION ───────────────────────', delay: 40, type: 'divider' },
  { text: '[AUTH]  Operator: jayesh_choudhary ............. VERIFIED', delay: 80, type: 'ok' },
  { text: '[AUTH]  Clearance: CISSP | CISM | CISA ........ LEVEL-5', delay: 60, type: 'ok' },
  { text: '[AUTH]  Active credentials ..................... 16 CERTS', delay: 50, type: 'info' },
  { text: '[AUTH]  Session PID: 1337 ..................... ASSIGNED', delay: 40, type: 'ok' },
  { text: '', delay: 30, type: 'blank' },

  // Module loading
  { text: '── LOADING MODULES ──────────────────────────────', delay: 40, type: 'divider' },
  { text: '[MOD]   EXEC_LOGS ........... career timeline   LOADED', delay: 35, type: 'ok' },
  { text: '[MOD]   CASE_STUDY ......... IR engagements    LOADED', delay: 35, type: 'ok' },
  { text: '[MOD]   CAPABILITY_MATRIX .. skills + GRC      LOADED', delay: 35, type: 'ok' },
  { text: '[MOD]   DEPLOYED_SYSTEMS ... projects + OSS    LOADED', delay: 35, type: 'ok' },
  { text: '[MOD]   CREDENTIAL_STORE ... certifications    LOADED', delay: 35, type: 'ok' },
  { text: '[MOD]   IN_PROGRESS ........ pursuing certs    LOADED', delay: 35, type: 'ok' },
  { text: '[MOD]   COMMS_INTERFACE .... contact channels  LOADED', delay: 35, type: 'ok' },
  { text: '', delay: 30, type: 'blank' },

  // Security subsystems
  { text: '── SECURITY SUBSYSTEMS ─────────────────────────', delay: 40, type: 'divider' },
  { text: '[SIEM]  Detection engine ...................... ACTIVE', delay: 30, type: 'ok' },
  { text: '[CTI]   Threat intel feeds .................... 50+ SOURCES', delay: 30, type: 'info' },
  { text: '[IR]    Incident response playbooks ........... ARMED', delay: 30, type: 'ok' },
  { text: '[DLP]   Data loss prevention .................. ENFORCING', delay: 30, type: 'ok' },
  { text: '[EDR]   Endpoint detection .................... MONITORING', delay: 30, type: 'ok' },
  { text: '', delay: 30, type: 'blank' },

  // Final
  { text: '═══════════════════════════════════════════════════', delay: 40, type: 'divider' },
  { text: '[READY] All systems operational. Welcome, Jayesh.', delay: 150, type: 'header' },
  { text: '[SYS]   Terminal ready — 7 modules active, 0 errors', delay: 80, type: 'ok' },
];

const totalLines = BOOT_LINES.length;

export default function BootSequence() {
  const [isVisible, setIsVisible] = useState(true);
  const [visibleLines, setVisibleLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const skip = useCallback(() => {
    setVisibleLines(totalLines);
    setIsComplete(true);
    setTimeout(() => setIsVisible(false), 300);
  }, []);

  useEffect(() => {
    let currentLine = 0;
    let timeoutId: NodeJS.Timeout;

    const showNextLine = () => {
      if (currentLine >= totalLines) {
        setIsComplete(true);
        timeoutId = setTimeout(() => setIsVisible(false), 500);
        return;
      }
      currentLine++;
      setVisibleLines(currentLine);
      timeoutId = setTimeout(showNextLine, BOOT_LINES[currentLine - 1].delay);
    };

    timeoutId = setTimeout(showNextLine, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleKeydown = () => {
      if (!isComplete) skip();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isComplete, skip]);

  const getLineClasses = (type: BootLine['type']) => {
    switch (type) {
      case 'ok': return 'text-[#c9d1d9]';
      case 'info': return 'text-[#c9d1d9]';
      case 'header': return 'text-[#00ff9c] font-semibold';
      case 'divider': return 'text-[#2a3544]';
      case 'ascii': return 'text-[#00ff9c] text-[11px] leading-none';
      case 'system': return 'text-[#6e7a88]';
      case 'blank': return '';
      default: return 'text-[#c9d1d9]';
    }
  };

  const formatLine = (text: string) => {
    return text
      .replace(/(OK|VERIFIED|LOADED|ACTIVE|ARMED|ENFORCING|MONITORING|ONLINE|ASSIGNED|READY)/g,
        '<span class="text-[#00ff9c] font-semibold">$1</span>')
      .replace(/(LEVEL-5|16 CERTS|50\+ SOURCES|256MB|8\/8|AES-256-XTS|TLS 1\.3)/g,
        '<span class="text-[#00e5ff]">$1</span>')
      .replace(/(\[(?:BIOS|MEM|CPU|DISK|NET|AUTH|MOD|SIEM|CTI|IR|DLP|EDR|SYS|READY)\])/g,
        '<span class="text-[#ffb300]">$1</span>');
  };

  if (!isVisible && isComplete) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] bg-[#0a0e14] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Scan line overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,156,0.015)_2px,rgba(0,255,156,0.015)_4px)]" />

          {/* Terminal window */}
          <div className="relative w-[620px] max-w-[92vw] max-h-[80vh] overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0d1117] border border-[#1b2430] border-b-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[10px] text-[#6e7a88] tracking-wider">
                sec-ops-terminal — boot
              </span>
            </div>

            {/* Terminal body */}
            <div className="bg-[#080c12] border border-[#1b2430] p-5 font-mono text-[12px] leading-[1.6] overflow-y-auto max-h-[70vh]">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={getLineClasses(line.type)}
                  dangerouslySetInnerHTML={{
                    __html: line.type === 'blank' ? '&nbsp;' : formatLine(line.text),
                  }}
                />
              ))}

              {/* Blinking cursor */}
              {!isComplete && (
                <span className="inline-block w-[7px] h-[14px] bg-[#00ff9c] animate-[blink_1s_step-end_infinite] ml-0.5" />
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-[620px] max-w-[92vw] h-[2px] bg-[#1b2430] mt-4 overflow-hidden">
            <motion.div
              className="h-full bg-[#00ff9c]"
              style={{ boxShadow: '0 0 10px #00ff9c, 0 0 20px rgba(0,255,156,0.3)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${(visibleLines / totalLines) * 100}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Status line */}
          <div className="w-[620px] max-w-[92vw] mt-2 flex justify-between text-[10px] text-[#6e7a88]">
            <span>
              {isComplete ? 'Boot complete' : `Loading... ${Math.round((visibleLines / totalLines) * 100)}%`}
            </span>
            <span>{visibleLines}/{totalLines} tasks</span>
          </div>

          {/* Skip button */}
          {!isComplete && (
            <button
              onClick={skip}
              className="mt-6 text-[10px] text-[#6e7a88] hover:text-[#00ff9c] transition-colors tracking-wider uppercase cursor-pointer"
            >
              Press any key to skip ›
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
