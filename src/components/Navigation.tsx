'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { navItems } from '@/data/navigation';

export default function Navigation() {
  const { t } = useTheme();
  const [active, setActive] = useState('about');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 160;
      for (const item of navItems) {
        const id = item.href.replace('#', '');
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 92, behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-[42px] left-0 right-0 z-[90] border-b"
      style={{
        background: t.panelBlur,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderColor: t.border,
      }}
    >
      <div className="nobar flex overflow-x-auto max-w-[1120px] mx-auto">
        {navItems.map(item => {
          const id = item.href.replace('#', '');
          const isActive = active === id;
          return (
            <button
              key={item.href}
              onClick={() => goTo(item.href)}
              className="px-4 py-[11px] text-[10.5px] tracking-[0.13em] whitespace-nowrap border-0 border-b-2 transition-all duration-200"
              style={{
                fontFamily: 'inherit',
                background: 'transparent',
                color: isActive ? t.accent : t.dim,
                borderColor: isActive ? t.accent : 'transparent',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
