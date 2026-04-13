'use client'

import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { skillGroups } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader 
          tag="MODULE" 
          title="CAPABILITY_MATRIX — Technical Arsenal" 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, index) => (
            <ScrollReveal key={group.title} delay={index * 0.1}>
              <div className="border border-terminal-green/20 p-6 rounded-lg bg-black/30 hover:bg-black/50 transition-colors">
                <h3 className="text-xl font-semibold mb-4 text-terminal-cyan">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.skills.map((skill) => (
                    <li 
                      key={skill}
                      className="text-text-secondary text-sm flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-terminal-green rounded-full mr-3"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}