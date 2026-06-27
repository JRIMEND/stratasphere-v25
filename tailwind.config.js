/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0A',
          secondary: '#111111',
          tertiary: '#1A1A1A',
          quaternary: '#222222',
        },
        accent: {
          DEFAULT: '#14B8A6',
          hover: '#0D9488',
          light: '#2DD4BF',
        },
        txt: {
          primary: '#EAEAEA',
          secondary: '#A1A1AA',
          tertiary: '#52525B',
        },
        success: { DEFAULT: '#10B981', bg: 'rgba(16,185,129,0.1)' },
        warning: { DEFAULT: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
        danger: { DEFAULT: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
        info: { DEFAULT: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
        volumetric: { DEFAULT: '#A78BFA', bg: 'rgba(167,139,250,0.1)' },
        property: {
          balance: '#14B8A6',
          apartment: '#8B5CF6',
          retail: '#F59E0B',
          farm: '#10B981',
          residential: '#3B82F6',
          commercial: '#EC4899',
          industrial: '#6366F1',
        }
      },
      fontFamily: {
        display: ['VT323', 'monospace'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
