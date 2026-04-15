'use client';

import { useState, useEffect } from 'react';
import { navItems } from '@/data/navigation';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 120;
      const scrollPosition = window.scrollY + threshold;

      // Find which section is closest to the threshold
      for (const item of navItems) {
        const sectionId = item.href.replace('#', '');
        const element = document.getElementById(sectionId);

        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-10 left-0 right-0 bg-[#0a0e14] border-b border-[#1b2430] z-[999]">
      <div className="flex overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const sectionId = item.href.replace('#', '');
          const isActive = activeSection === sectionId;

          return (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={`
                px-4 py-2.5 text-[11px] tracking-wider whitespace-nowrap transition-all duration-200
                border-b-2
                ${
                  isActive
                    ? 'text-[#00ff9c] border-[#00ff9c] drop-shadow-[0_0_8px_rgba(0,255,156,0.4)]'
                    : 'text-[#6e7a88] border-transparent hover:text-[#00ff9c] hover:border-[#00ff9c]'
                }
                sm:px-3 sm:text-[10px]
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
