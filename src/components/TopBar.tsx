'use client';

import { useTheme } from '@/lib/ThemeContext';

export default function TopBar() {
  const { t, variant, setVariant, openPalette } = useTheme();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[42px] z-[100] flex items-center justify-between px-[18px] border-b"
      style={{
        background: t.panelBlur,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderColor: t.border,
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-[13px]">
        <div className="flex gap-[7px]">
          <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
        </div>
        <span
          className="text-[11px] tracking-[0.16em] uppercase hidden sm:inline"
          style={{ color: t.dim }}
        >
          sec-ops-terminal v4.0
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* ⌘K search button */}
        <button
          onClick={openPalette}
          aria-label="Open command palette"
          className="flex items-center gap-2 text-[10.5px] tracking-[0.08em] px-[11px] py-[5px] border transition-colors"
          style={{
            background: 'transparent',
            borderColor: t.border,
            color: t.dim,
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = t.accent;
            (e.currentTarget as HTMLButtonElement).style.color = t.accent;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = t.border;
            (e.currentTarget as HTMLButtonElement).style.color = t.dim;
          }}
        >
          <span style={{ color: t.accent }}>⌘</span>K
          <span className="opacity-70">SEARCH</span>
        </button>

        {/* Theme toggle */}
        <div className="flex border" style={{ borderColor: t.border }}>
          <button
            onClick={() => setVariant('terminal')}
            aria-label="Switch to green theme"
            aria-pressed={variant === 'terminal'}
            className="text-[10px] tracking-[0.1em] px-[11px] py-[5px] border-0 uppercase transition-colors"
            style={{
              fontFamily: 'inherit',
              background: variant === 'terminal' ? t.accent : 'transparent',
              color: variant === 'terminal' ? t.bg : t.dim,
              cursor: 'pointer',
            }}
          >
            Green
          </button>
          <button
            onClick={() => setVariant('console')}
            aria-label="Switch to cyan theme"
            aria-pressed={variant === 'console'}
            className="text-[10px] tracking-[0.1em] px-[11px] py-[5px] border-0 border-l uppercase transition-colors"
            style={{
              fontFamily: 'inherit',
              borderColor: t.border,
              background: variant === 'console' ? t.accent : 'transparent',
              color: variant === 'console' ? t.bg : t.dim,
              cursor: 'pointer',
            }}
          >
            Cyan
          </button>
        </div>

        {/* Pulsing status dot */}
        <span
          className="w-[7px] h-[7px] rounded-full animate-pulse-dot"
          style={{ background: t.accent, boxShadow: `0 0 6px ${t.accent}` }}
        />
      </div>
    </div>
  );
}
