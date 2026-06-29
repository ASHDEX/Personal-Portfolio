'use client';

import { useTheme } from '@/lib/ThemeContext';

export default function Footer() {
  const { t } = useTheme();
  return (
    <footer className="flex flex-wrap justify-between gap-3 mt-10 pt-6 border-t text-[11px] tracking-[0.06em]"
      style={{ borderColor: t.border, color: t.dim }}>
      <span>© 2026 Jayesh Choudhary — operated from the terminal.</span>
      <span style={{ color: t.accent }}>$ logout — connection closed.</span>
    </footer>
  );
}
