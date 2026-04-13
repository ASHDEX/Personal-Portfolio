import { certifications } from '@/data/certifications'
import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

export default function Certifications() {
  return (
    <section id="certifications" className="w-full pt-[120px] pb-[120px]">
      <AnimateIn delay={0}>
        <div className="border-l border-[#00D9FF] pl-4 mb-6">
          <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::CREDENTIAL_STORE ]</div>
          <h2 className="text-[30px] font-mono neon-blue">
            $ verify credential.store --status=active<Cursor />
          </h2>
          <div className="text-gray-600 text-xs font-mono mt-1">
            <span className="text-[#00D9FF]/40">›</span> running integrity check --all
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <div className="font-mono">
          {/* Header row */}
          <div className="grid grid-cols-[60px_1fr_140px_60px] gap-4 pb-2 mb-1 border-b border-[#00FF8C]/10 text-xs text-gray-600 tracking-widest">
            <span>ID</span>
            <span>CERTIFICATION</span>
            <span>ISSUER</span>
            <span className="text-right">YEAR</span>
          </div>

          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[60px_1fr_140px_60px] gap-4 py-3 border-b border-[#00FF8C]/5 last:border-0 hover:border-[#00FF8C]/20 transition-colors duration-150 group"
            >
              <span className="text-[#00FF8C]/60 text-xs self-center">{cert.abbr}</span>
              <div>
                <span className="text-[15px] text-gray-300 group-hover:text-[#E5E7EB] transition-colors duration-150">{cert.name}</span>
                <span className="block text-[11px] text-gray-700 mt-0.5">{cert.id}</span>
              </div>
              <span className="text-gray-500 text-xs self-center">{cert.issuer}</span>
              <span className="text-gray-600 text-xs self-center text-right">{cert.year}</span>
            </div>
          ))}

          <div className="mt-8 space-y-2 text-[14px] text-gray-500">
            <div className="flex items-start gap-2">
              <span className="text-[#00FF8C]/50 shrink-0">$</span>
              <span>Continuous learning via SANS, OffSec labs, and annual conference attendance.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#00FF8C]/50 shrink-0">$</span>
              <span>Currently pursuing: <span className="text-gray-400">GCSA</span>, <span className="text-gray-400">CKS</span></span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-1 text-xs font-mono text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">›</span>
            <span>integrity check passed — 6/6 credentials verified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">└─</span>
            <span className="text-[#00FF8C]/40">CREDENTIAL_STORE :: process complete [OK]</span>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}
