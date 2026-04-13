'use client'

import { useState } from 'react'
import BootSequence from '@/components/BootSequence'
import TopBar from '@/components/TopBar'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SectionDivider from '@/components/Section'
import Hero from '@/components/Hero'
import SystemStatus from '@/components/SystemStatus'
import TerminalInput from '@/components/TerminalInput'
import About from '@/components/About'
import Experience from '@/components/Experience'
import CaseStudies from '@/components/CaseStudies'
import Detection from '@/components/Detection'
import Capabilities from '@/components/Capabilities'
import Skills from '@/components/Skills'
import Architecture from '@/components/Architecture'
import GRC from '@/components/GRC'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import LogStream from '@/components/LogStream'

export default function Home() {
  const [showContent, setShowContent] = useState(false)

  return (
    <>
      <BootSequence onComplete={() => setShowContent(true)} />
      <main className={`font-mono ${showContent ? 'block' : 'hidden'}`}>
        <LogStream />
        <TopBar />
        <Navigation />
        <div className="max-w-[900px] mx-auto px-6">
          <Hero />
          <SystemStatus />
          <TerminalInput />
          <SectionDivider
            out="operator identity resolved"
            in="loading SYSTEM_INIT module..."
          />
          <About />
          <SectionDivider
            out="system initialized. loading execution logs..."
            in="execution logs loaded."
          />
          <Experience />
          <SectionDivider
            out="triggering incident response analysis..."
            in="incident response module active."
          />
          <CaseStudies />
          <SectionDivider
            out="feeding data into detection systems..."
            in="detection engine initialized."
          />
          <Detection />
          <SectionDivider
            out="forwarding to architecture layer..."
            in="enumerating capability matrix..."
          />
          <Capabilities />
          <SectionDivider
            out="capability matrix loaded."
            in="visualizing skill matrix..."
          />
          <Skills />
          <SectionDivider
            out="skill matrix visualized."
            in="mounting system architecture blueprints..."
          />
          <Architecture />
          <SectionDivider
            out="architecture layer online."
            in="initializing governance layer..."
          />
          <GRC />
          <SectionDivider
            out="governance layer verified."
            in="querying deployed systems registry..."
          />
          <Projects />
          <SectionDivider
            out="deployed systems registry loaded."
            in="running credential integrity check..."
          />
          <Certifications />
          <SectionDivider
            out="credentials verified [OK]."
            in="opening comms interface..."
          />
          <Contact />
        </div>
        
        <Footer />
      </main>
    </>
  )
}