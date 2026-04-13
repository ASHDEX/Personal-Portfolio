'use client'

import { useState, useEffect } from 'react'
import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

const SKILLS = [
  'Incident Response',
  'Detection Engineering',
  'Security Architecture',
  'GRC'
]

const TYPING_SPEED = 110
const DELAY_BETWEEN_SKILLS = 1500
const DELAY_BEFORE_REPEAT = 3000

export default function Hero() {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Typing animation
  useEffect(() => {
    const currentSkill = SKILLS[currentSkillIndex]
    
    if (!isDeleting && currentCharIndex < currentSkill.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1)
      }, TYPING_SPEED)
      return () => clearTimeout(timeout)
    }

    if (!isDeleting && currentCharIndex === currentSkill.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, DELAY_BETWEEN_SKILLS)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && currentCharIndex > 0) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev - 1)
      }, TYPING_SPEED / 2)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && currentCharIndex === 0) {
      const timeout = setTimeout(() => {
        setIsDeleting(false)
        setCurrentSkillIndex(prev => (prev + 1) % SKILLS.length)
      }, DELAY_BEFORE_REPEAT)
      return () => clearTimeout(timeout)
    }
  }, [currentSkillIndex, currentCharIndex, isDeleting])

  const displayedSkill = SKILLS[currentSkillIndex].substring(0, currentCharIndex)

  return (
    <section id="hero" className="w-full pt-[120px] pb-[120px]">
      <div className="text-left">
        <AnimateIn delay={0}>
          <div className="text-xs font-mono text-[#00D9FF]/50 tracking-widest mb-3 flex items-center gap-2">
            <span>[SEC-OPS-TERMINAL]</span>
            <span className="text-gray-700">·</span>
            <span className="text-gray-600">ONLINE</span>
            <span className="text-gray-700">·</span>
            <span className="text-gray-600 text-[10px]">&gt; init system.core --operator=jayesh --modules=10</span>
          </div>
          <div className="text-xs font-mono text-[#00FF8C]/50 tracking-widest mb-4 flex items-center gap-2">
            <span className="text-[#00FF8C]/30">[BOOT]</span>
            <span>system boot complete</span>
            <span className="text-[#00FF8C]/30 ml-1">■</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-mono font-bold text-[#E5E7EB]">
            Jayesh Chaudhary
          </h1>
          <h2 className="text-[20px] font-mono text-[#E5E7EB] mt-2">
            Senior Security Engineer<Cursor />
          </h2>
          <div className="text-xs font-mono text-gray-600 mt-3 tracking-wide">
            operating security detection and response systems at scale
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          {/* Typing animation line */}
          <div className="mt-8 font-mono text-[19px] text-gray-300">
            <span className="neon-green">$</span> {displayedSkill}
            <span className={`ml-1 inline-block w-2 h-6 bg-[#00FF8C] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          {/* Metrics line */}
          <div className="mt-10 font-mono text-sm text-gray-400 border-l border-[#00FF8C] pl-4">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <span className="neon-green">MTTD</span>
                <span className="mx-2 text-gray-500">↓</span>
                <span className="text-[#00FF8C]">40%</span>
              </div>
              <div className="flex items-center">
                <span className="neon-green">MTTR</span>
                <span className="mx-2 text-gray-500">↓</span>
                <span className="text-[#00FF8C]">35%</span>
              </div>
              <div className="flex items-center">
                <span className="neon-green">Detection Coverage</span>
                <span className="mx-2 text-gray-500">↑</span>
                <span className="text-[#00FF8C]">30%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Measured across enterprise security programs
            </p>
          </div>

          {/* Terminal-style footer */}
          <div className="mt-10 text-gray-600 text-xs font-mono flex items-center">
            <span className="mr-2">└─</span>
            <span>Senior‑level security leadership • Available for advisory roles</span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}