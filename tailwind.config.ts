import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
        display: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        blink:      'blink 1s step-end infinite',
        'pulse-dot':'pulse-dot 2s ease-in-out infinite',
        gridmove:   'gridmove 9s linear infinite',
        radar:      'radar 7s linear infinite',
        ticker:     'ticker 38s linear infinite',
        logslide:   'logslide 0.4s ease both',
        namescan:   'namescan 4.5s linear infinite',
        'glitch-top':'gtop 4s steps(1) infinite',
        'glitch-bot':'gbot 3.4s steps(1) infinite',
        'floaty-1': 'floaty 4s ease-in-out infinite',
        'floaty-2': 'floaty 5.5s ease-in-out infinite',
        'floaty-3': 'floaty 4.8s ease-in-out infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        'pulse-dot': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        fadeup: {
          from: { transform: 'translateY(14px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        gridmove: {
          from: { backgroundPosition: '0 0' },
          to:   { backgroundPosition: '0 46px' },
        },
        radar: { to: { transform: 'translate(-50%,-50%) rotate(360deg)' } },
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)',     opacity: '0.5' },
          '50%':      { transform: 'translateY(-10px)', opacity: '1'   },
        },
        logslide: {
          from: { transform: 'translateX(-10px)', opacity: '0' },
          to:   { transform: 'translateX(0)',     opacity: '1' },
        },
        namescan: {
          '0%':  { top: '-8%',  opacity: '0' },
          '8%':  { opacity: '0.55' },
          '92%': { opacity: '0.55' },
          '100%':{ top: '104%', opacity: '0' },
        },
        gtop: {
          '0%,86%,100%': { clipPath: 'inset(0 0 100% 0)', transform: 'translate(0,0)' },
          '87%': { clipPath: 'inset(0 0 58% 0)',   transform: 'translate(-4px,-2px)' },
          '89%': { clipPath: 'inset(26% 0 40% 0)', transform: 'translate(4px,1px)' },
          '91%': { clipPath: 'inset(8% 0 72% 0)',  transform: 'translate(-3px,2px)' },
          '93%': { clipPath: 'inset(44% 0 22% 0)', transform: 'translate(3px,-1px)' },
          '95%': { clipPath: 'inset(0 0 100% 0)',  transform: 'translate(0,0)' },
        },
        gbot: {
          '0%,84%,100%': { clipPath: 'inset(100% 0 0 0)', transform: 'translate(0,0)' },
          '85%': { clipPath: 'inset(56% 0 0 0)',   transform: 'translate(4px,2px)' },
          '88%': { clipPath: 'inset(38% 0 26% 0)', transform: 'translate(-4px,-1px)' },
          '90%': { clipPath: 'inset(72% 0 0 0)',   transform: 'translate(3px,1px)' },
          '92%': { clipPath: 'inset(30% 0 34% 0)', transform: 'translate(-3px,2px)' },
          '94%': { clipPath: 'inset(100% 0 0 0)',  transform: 'translate(0,0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
