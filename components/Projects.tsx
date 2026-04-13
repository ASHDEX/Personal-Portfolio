'use client'

import { projects } from '@/data/projects'
import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

export default function Projects() {
  return (
    <section id="projects" className="w-full pt-[120px] pb-[120px]">
      <div>
        <AnimateIn delay={0}>
          <div className="border-l border-[#00D9FF] pl-4 mb-6">
            <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::DEPLOYED_SYSTEMS ]</div>
            <h2 className="text-[30px] font-mono neon-blue">
              $ query deployed.systems --status=active<Cursor />
            </h2>
            <div className="text-gray-600 text-xs font-mono mt-1">
              <span className="text-[#00D9FF]/40">›</span> loading system registry --verbose
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="space-y-0">
            {projects.map((project, idx) => (
              <div key={project.id}>
                <div className="font-mono py-8">
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-[#00FF8C]/50 text-xs">[{project.id}]</span>
                    <h3 className="text-[19px] text-[#E5E7EB]">
                      <span className="text-[#00FF8C]">$</span> {project.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-gray-600 tracking-widest mb-1">PROBLEM</div>
                      <p className="text-[15px] leading-relaxed text-gray-300">{project.problem}</p>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 tracking-widest mb-1">APPROACH</div>
                      <p className="text-[15px] leading-relaxed text-gray-300">{project.approach}</p>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 tracking-widest mb-1">TOOLS</div>
                      <p className="text-[14px] text-[#00FF8C]/70">
                        {project.tools.join(' · ')}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 tracking-widest mb-1">OUTCOME</div>
                      <p className="text-[#00FF8C] text-[15px] leading-relaxed">{project.outcome}</p>
                    </div>
                  </div>
                </div>

                {idx < projects.length - 1 && (
                  <div className="border-t border-[#00FF8C]/10" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-1 text-xs font-mono text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">›</span>
              <span>all systems follow security-by-design — runbooks and test coverage attached</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00D9FF]/30">└─</span>
              <span className="text-[#00FF8C]/40">DEPLOYED_SYSTEMS :: registry loaded [OK]</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
