'use client';

import { useState, useEffect } from 'react';
import BootSequence from '@/components/BootSequence';
import TopBar from '@/components/TopBar';
import Navigation from '@/components/Navigation';
import CommandPalette from '@/components/CommandPalette';
import Hero from '@/components/Hero';
import LiveOpsBand from '@/components/LiveOpsBand';
import Experience from '@/components/Experience';
import CaseStudies from '@/components/CaseStudies';
import AttackMatrix from '@/components/AttackMatrix';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {/* Fixed overlays */}
      <div className="scanline-overlay" />
      <div className="vignette-overlay" />

      <BootSequence />
      <CommandPalette />
      <TopBar />
      <Navigation />

      {/* Hero is full-bleed */}
      <Hero />

      {/* Live ops band */}
      <LiveOpsBand />

      {/* Main content */}
      <main className="max-w-[1120px] mx-auto px-6 pt-[84px] pb-20">
        <Experience />
        <CaseStudies />
        <AttackMatrix />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
