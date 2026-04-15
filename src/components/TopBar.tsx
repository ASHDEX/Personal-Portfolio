export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-[#0d1117] border-b border-[#1b2430] z-[1000] flex items-center justify-between px-6">
      {/* Left side: macOS dots + label */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] text-[#6e7a88] uppercase tracking-widest">
          sec-ops-terminal v3.0
        </span>
      </div>

      {/* Right side: status indicator */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 bg-[#00ff9c] rounded-full animate-pulse" />
        <span className="text-[11px] text-[#6e7a88]">
          SESSION ACTIVE | PID 1337 | UPTIME 99.97%
        </span>
      </div>
    </div>
  );
}
