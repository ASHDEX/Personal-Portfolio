import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0a0e14',
          card: '#0d1117',
          border: '#1b2430',
        },
        green: {
          DEFAULT: '#00ff9c',
          dim: '#00cc7d',
          muted: 'rgba(0,255,156,0.2)',
        },
        cyan: {
          DEFAULT: '#00e5ff',
          dim: '#00b8d4',
        },
        amber: '#ffb300',
        magenta: '#ff6ec7',
        text: {
          DEFAULT: '#c9d1d9',
          dim: '#6e7a88',
          bright: '#e6edf3',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
        display: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
export default config
