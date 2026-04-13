'use client'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-[#00FF8C]/20 bg-[#050505] z-40">
      <div className="max-w-[900px] mx-auto px-6 py-1.5 flex items-center justify-between font-mono text-[10px]">
        <div className="flex items-center gap-4 text-gray-600">
          <span className="text-[#00FF8C]/50">sec-ops-terminal v2.1</span>
          <span>PID 1337</span>
          <span>UPTIME 99.97%</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <span>MODULES: 8 ACTIVE</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 bg-[#00FF8C] inline-block" style={{boxShadow: '0 0 3px #00FF8C'}}></span>
            <span className="text-[#00FF8C]/50">SECURE</span>
          </span>
        </div>
      </div>
    </footer>
  )
}