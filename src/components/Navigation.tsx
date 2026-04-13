'use client';

import { useState, useEffect } from 'react';
import { navItems } from '@/src/data/navigation';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 120; // threshold: 120px from top

      for (const sectionId of sections) {
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
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
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
                ${isActive
                  ? 'text-[#00ff9c] border-b-2 border-[#00ff9c] shadow-[0_0_8px_rgba(0,255,156,0.3)]'
                  : 'text-[#6e7a88] border-b-2 border-transparent hover:text-[#00ff9c] hover:border-[#00ff9c]'
                }
                md:px-4 md:py-2.5 md:text-[11px]
                sm:px-3 sm:py-2.5 sm:text-[10px]
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