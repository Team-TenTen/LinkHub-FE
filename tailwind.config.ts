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
        'slate-900': 'var(--slate-900)',
        'slate-700': 'var(--slate-700)',
        'slate-600': 'var(--slate-600)',
        'slate-500': 'var(--slate-500)',
        'slate-400': 'var(--slate-400)',
        'slate-300': 'var(--slate-300)',
        'slate-100': 'var(--slate-100)',
        'gray-900': 'var(--gray-900)',
        'gray-700': 'var(--gray-700)',
        'gray-600': 'var(--gray-600)',
        'gray-500': 'var(--gray-500)',
        'gray-400': 'var(--gray-400)',
        'gray-300': 'var(--gray-300)',
        'gray-100': 'var(--gray-100)',
        'emerald-900': 'var(--emerald-900)',
        'emerald-700': 'var(--emerald-700)',
        'emerald-600': 'var(--emerald-600)',
        'emerald-500': 'var(--emerald-500)',
        'emerald-400': 'var(--emerald-400)',
        'emerald-300': 'var(--emerald-300)',
        'emerald-100': 'var(--emerald-100)',
        'red-900': 'var(--red-900)',
        'red-700': 'var(--red-700)',
        'red-600': 'var(--red-600)',
        'red-500': 'var(--red-500)',
        'red-400': 'var(--red-400)',
        'red-300': 'var(--red-300)',
        'red-100': 'var(--red-100)',
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
