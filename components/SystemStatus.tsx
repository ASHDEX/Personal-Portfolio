import AnimateIn from './AnimateIn'

const systems = [
  { label: 'Detection Engine',     status: 'ACTIVE',    delay: 0 },
  { label: 'SIEM Pipeline',        status: 'CONNECTED', delay: 0.4 },
  { label: 'Threat Intelligence',  status: 'LIVE',      delay: 0.8 },
  { label: 'Incident Response',    status: 'READY',     delay: 1.2 },
]

export default function SystemStatus() {
  return (
    <AnimateIn delay={0.2}>
      <div className="font-mono border-t border-b border-[#00FF8C]/10 py-5 my-2">
        <div className="text-[#00FF8C]/30 text-[10px] tracking-widest mb-4">[ SYSTEM STATUS ]</div>
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          {systems.map((sys) => (
            <div key={sys.label} className="flex items-center gap-2.5">
              <span
                className="status-dot w-1.5 h-1.5 bg-[#00FF8C] inline-block shrink-0"
                style={{ animationDelay: `${sys.delay}s` }}
              />
              <span className="text-gray-500 text-xs">{sys.label}</span>
              <span className="text-[#00FF8C] text-xs flicker" style={{ animationDelay: `${sys.delay + 1}s` }}>
                {sys.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  )
}
