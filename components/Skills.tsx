'use client'

import { skillGroups } from '@/data/skills'
import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

export default function Skills() {
  return (
    <section id="skills" className="w-full pt-[120px] pb-[120px]">
      <div>
        <AnimateIn delay={0}>
          <div className="border-l border-[#00FF8C] pl-4 mb-10">
            <div className="text-[#00FF8C]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::SKILL_MATRIX ]</div>
            <h2 className="text-[30px] font-mono neon-green">
              $ capability.matrix --visualize --grid<Cursor />
            </h2>
            <div className="text-gray-600 text-xs font-mono mt-1">
              <span className="text-[#00FF8C]/40">›</span> categorized capability matrix with proficiency levels
            </div>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, groupIdx) => (
            <AnimateIn key={groupIdx} delay={0.1 + groupIdx * 0.05}>
              <div className="border border-[#00FF8C]/20 rounded-lg p-6 bg-[#050505]/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-[#00FF8C] inline-block" style={{boxShadow: '0 0 4px #00FF8C'}}></span>
                  <h3 className="font-mono text-lg text-[#E5E7EB]">{group.category}</h3>
                </div>
                <div className="space-y-4">
                  {group.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-sm text-gray-300">{skill.name}</span>
                        <span className="font-mono text-xs text-[#00FF8C]">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00FF8C]/30 to-[#00FF8C] rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.5}>
          <div className="mt-10 space-y-1 text-xs font-mono text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-[#00FF8C]/30">›</span>
              <span>matrix updated via continuous learning and hands‑on projects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00FF8C]/30">└─</span>
              <span className="text-[#00FF8C]/40">SKILL_MATRIX :: visualization complete [OK]</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}