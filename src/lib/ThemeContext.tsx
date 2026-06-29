'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Theme, ThemeTokens } from '@/types';
import { getTheme } from '@/lib/theme';

interface ThemeContextValue {
  variant: Theme;
  t: ThemeTokens;
  setVariant: (v: Theme) => void;
  openPalette: () => void;
  closePalette: () => void;
  paletteOpen: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  variant: 'terminal',
  t: getTheme('terminal'),
  setVariant: () => {},
  openPalette: () => {},
  closePalette: () => {},
  paletteOpen: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<Theme>('terminal');
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <ThemeContext.Provider value={{
      variant,
      t: getTheme(variant),
      setVariant,
      openPalette: () => setPaletteOpen(true),
      closePalette: () => setPaletteOpen(false),
      paletteOpen,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
