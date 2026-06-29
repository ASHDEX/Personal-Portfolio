'use client';

import { useTheme } from '@/lib/ThemeContext';

interface Props {
  num: string;
  title: string;
  sub: string;
}

export default function SectionHeader({ num, title, sub }: Props) {
  const { t } = useTheme();
  return (
    <div className="reveal mb-[40px]">
      <div className="flex items-baseline gap-4">
        <span
          className="inline-block text-[12px] tracking-[0.16em] px-[11px] py-1 font-bold"
          style={{ fontFamily: "'JetBrains Mono',monospace", background: t.accent, color: t.bg }}
        >
          // {num}
        </span>
        <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${t.borderHi}, transparent)` }} />
      </div>
      <h2
        className="mt-3 mb-[6px] font-extrabold tracking-[-0.025em]"
        style={{ fontSize: 'clamp(32px,5.2vw,56px)', color: t.bright }}
      >
        {title}
      </h2>
      <p className="m-0 text-[13.5px]" style={{ color: t.dim }}>{sub}</p>
    </div>
  );
}
