import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgColor: 'var(--bgColor)',
        't-slate-900': 'var(--t-slate-900)',
        't-slate-700': 'var(--t-slate-700)',
        't-slate-600': 'var(--t-slate-600)',
        't-slate-500': 'var(--t-slate-500)',
        't-slate-400': 'var(--t-slate-400)',
        't-slate-300': 'var(--t-slate-300)',
        't-slate-100': 'var(--t-slate-100)',
        't-gray-900': 'var(--t-gray-900)',
        't-gray-700': 'var(--t-gray-700)',
        't-gray-600': 'var(--t-gray-600)',
        't-gray-500': 'var(--t-gray-500)',
        't-gray-400': 'var(--t-gray-400)',
        't-gray-300': 'var(--t-gray-300)',
        't-gray-100': 'var(--t-gray-100)',
        't-emerald-900': 'var(--t-emerald-900)',
        't-emerald-700': 'var(--t-emerald-700)',
        't-emerald-600': 'var(--t-emerald-600)',
        't-emerald-500': 'var(--t-emerald-500)',
        't-emerald-400': 'var(--t-emerald-400)',
        't-emerald-300': 'var(--t-emerald-300)',
        't-emerald-100': 'var(--t-emerald-100)',
        't-red-900': 'var(--t-red-900)',
        't-red-700': 'var(--t-red-700)',
        't-red-600': 'var(--t-red-600)',
        't-red-500': 'var(--t-red-500)',
        't-red-400': 'var(--t-red-400)',
        't-red-300': 'var(--t-red-300)',
        't-red-100': 'var(--t-red-100)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
