import { ThemeTokens, Theme } from '@/types';

export function getTheme(variant: Theme): ThemeTokens {
  if (variant === 'console') {
    return {
      bg:         '#06090e',
      panel:      '#0b1119',
      panel2:     '#080c12',
      panelBlur:  'rgba(8,12,18,0.82)',
      border:     '#16212e',
      borderHi:   'rgba(0,229,255,0.42)',
      accent:     '#00e5ff',
      accent2:    '#00ff9c',
      accent3:    '#ffb300',
      accentSoft: 'rgba(0,229,255,0.12)',
      glow:       '0 0 28px rgba(0,229,255,0.16)',
      heroGrid:   'rgba(0,229,255,0.05)',
      glowA:      'rgba(0,229,255,0.13)',
      text:       '#c4cdd8',
      bright:     '#eaf2f8',
      dim:        '#6b7888',
    };
  }
  return {
    bg:         '#06090e',
    panel:      '#0d1117',
    panel2:     '#080c12',
    panelBlur:  'rgba(10,14,20,0.82)',
    border:     '#1b2430',
    borderHi:   'rgba(0,255,156,0.40)',
    accent:     '#00ff9c',
    accent2:    '#00e5ff',
    accent3:    '#ffb300',
    accentSoft: 'rgba(0,255,156,0.12)',
    glow:       '0 0 28px rgba(0,255,156,0.16)',
    heroGrid:   'rgba(0,255,156,0.05)',
    glowA:      'rgba(0,255,156,0.13)',
    text:       '#c9d1d9',
    bright:     '#e6edf3',
    dim:        '#6e7a88',
  };
}
