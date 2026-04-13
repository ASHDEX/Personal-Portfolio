'use client'

import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader 
          tag="MODULE" 
          title="DEPLOYED_SYSTEMS — Projects & Open Source" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ScrollReveal key={project.name} delay={index * 0.06}>
              <div className="bg-[#0d1117] border border-[#1b2430] p-6 hover:border-[#00cc7d] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,255,156,0.06)] transition-all duration-300 h-full flex flex-col">
                <h3 className="text-sm font-semibold text-[#e6edf3] mb-2 flex items-center gap-2">
                  <span className="text-[#00ff9c]">⟩</span>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00ff9c] transition-colors"
                    >
                      {project.name}
                    </a>
                  ) : project.name}
                </h3>
                <p className="text-xs text-[#6e7a88] leading-relaxed mb-3.5 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 border border-[#1b2430] text-[#00e5ff]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}