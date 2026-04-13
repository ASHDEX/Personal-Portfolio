import AnimateIn from './AnimateIn'
import Cursor from './Cursor'

export default function About() {
  return (
    <section id="about" className="w-full pt-[120px] pb-[120px]">
      <AnimateIn delay={0}>
        <div className="border-l border-[#00D9FF] pl-4 mb-6">
          <div className="text-[#00D9FF]/50 text-xs font-mono tracking-widest mb-1">[ MODULE::SYSTEM_INIT ]</div>
          <h2 className="text-[30px] font-mono neon-blue">
            $ init system.operator<Cursor />
          </h2>
          <div className="text-gray-600 text-xs font-mono mt-1">
            <span className="text-[#00D9FF]/40">›</span> load operator.profile --verbose
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <div className="font-mono">
          <p className="text-[15px] leading-relaxed text-gray-300 mb-4">
            <span className="neon-green">$</span> Cybersecurity professional with <span className="text-[#00D9FF]">8+ years</span> of experience across <span className="text-[#00D9FF]">offensive security</span>, <span className="text-[#00D9FF]">threat intelligence</span>, and <span className="text-[#00D9FF]">security architecture</span>.
          </p>
          <p className="text-[15px] leading-relaxed text-gray-300 mb-4">
            <span className="neon-green">$</span> Focus areas: <span className="neon-green">penetration testing</span>, <span className="neon-green">red teaming</span>, <span className="neon-green">detection engineering</span>, and <span className="neon-green">security automation</span>.
          </p>
          <p className="text-[15px] leading-relaxed text-gray-300 mb-4">
            <span className="neon-green">$</span> Passionate about building resilient systems and mentoring next‑generation security practitioners.
          </p>
          <div className="mt-6 text-[15px] text-gray-400">
            <p className="mb-4"><span className="neon-green">$</span> Tools: <span className="text-[#E5E7EB]">Metasploit, Burp Suite, Wireshark, ELK, Splunk, Python, Go</span></p>
            <p className="mb-4"><span className="neon-green">$</span> Certifications: <span className="text-[#00D9FF]">OSCP</span>, <span className="text-[#00D9FF]">CISSP</span>, <span className="text-[#00D9FF]">GPEN</span> (see ./certifications)</p>
          </div>
        </div>
        <div className="mt-6 space-y-1 text-xs font-mono text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">›</span>
            <span>executing... <span className="text-[#00FF8C]/50">operator.profile</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">›</span>
            <span>module initialized</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF]/30">└─</span>
            <span className="text-[#00FF8C]/40">SYSTEM_INIT :: process complete [OK]</span>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}
