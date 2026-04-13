import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

const channels = [
  { handle: 'EMAIL',    value: 'jayesh.chaudhary@example.com', note: 'PGP key available on request' },
  { handle: 'LINKEDIN', value: 'linkedin.com/in/jayeshchaudhary', note: 'Professional networking and advisory discussions' },
  { handle: 'GITHUB',   value: 'github.com/jayeshchaudhary', note: 'Open-source detection and automation tools' },
  { handle: 'SIGNAL',   value: '@jayesh_security', note: 'Secure channel for sensitive communications' },
]

export default function Contact() {
  return (
    <section id="contact" className="w-full pt-[120px] pb-[120px]">
      <AnimateIn delay={0}>
        <div className="border-l border-[#00D9FF] pl-4 mb-6">
          <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::COMMS_INTERFACE ]</div>
          <h2 className="text-[30px] font-mono neon-blue">
            $ open comms.interface --channels=all<Cursor />
          </h2>
          <div className="text-gray-600 text-xs font-mono mt-1">
            <span className="text-[#00D9FF]/40">›</span> establishing secure communication channels...
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <div className="font-mono">
          <p className="text-[14px] text-gray-500 mb-8">
            Available for security consulting, advisory roles, and speaking engagements.
          </p>

          <div className="space-y-0">
            {channels.map((ch, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-[#00FF8C]/5 last:border-0 group hover:border-[#00FF8C]/20 transition-colors duration-150"
              >
                <span className="text-[#00FF8C]/50 text-xs w-20 shrink-0 tracking-widest">{ch.handle}</span>
                <span className="text-[15px] text-gray-300 group-hover:text-[#E5E7EB] transition-colors duration-150">{ch.value}</span>
                <span className="text-gray-700 text-xs sm:ml-auto">{ch.note}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-2 text-[14px] text-gray-500">
            <div className="flex items-start gap-2">
              <span className="text-[#00FF8C]/50 shrink-0">$</span>
              <span>Response time: 24–48 hours for non-urgent inquiries.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#00FF8C]/50 shrink-0">$</span>
              <span>Availability: remote consulting, part-time advisory, conference speaking.</span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-1 text-xs font-mono text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">›</span>
            <span>module initialized — 4 channels active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">└─</span>
            <span className="text-[#00FF8C]/40">COMMS_INTERFACE :: listening [OK]</span>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}
