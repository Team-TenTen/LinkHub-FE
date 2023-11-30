import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

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
        slate9: 'var(--slate9)',
        slate7: 'var(--slate7)',
        slate6: 'var(--slate6)',
        slate5: 'var(--slate5)',
        slate4: 'var(--slate4)',
        slate3: 'var(--slate3)',
        slate1: 'var(--slate1)',
        gray9: 'var(--gray9)',
        gray7: 'var(--gray7)',
        gray6: 'var(--gray6)',
        gray5: 'var(--gray5)',
        gray4: 'var(--gray4)',
        gray3: 'var(--gray3)',
        gray1: 'var(--gray1)',
        emerald9: 'var(--emerald9)',
        emerald7: 'var(--emerald7)',
        emerald6: 'var(--emerald6)',
        emerald5: 'var(--emerald5)',
        emerald4: 'var(--emerald4)',
        emerald3: 'var(--emerald3)',
        emerald1: 'var(--emerald1)',
        emerald05: 'var(--emerald05)',
        red9: 'var(--red9)',
        red7: 'var(--red7)',
        red6: 'var(--red6)',
        red5: 'var(--red5)',
        red4: 'var(--red4)',
        red3: 'var(--red3)',
        red1: 'var(--red1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['"Pretendard"', ...fontFamily.sans],
      },
      keyframes: {
        'open-overlay': {
          '0%': { background: 'rgb(0, 0, 0, 0)' },
          '100%': { background: 'rgb(0, 0, 0, 0.4)' },
        },
        'close-overlay': {
          '0%': { background: 'rgb(0, 0, 0, 0.4)' },
          '100%': { background: 'rgb(0, 0, 0, 0)' },
        },
        'open-sidebar': {
          '0%': { right: '-300px' },
          '100%': { right: '0' },
        },
        'close-sidebar': {
          '0%': { right: '0' },
          '100%': { right: '-300px' },
        },
      },
      animation: {
        darkModeSpin: 'spin 1s ease 0s',
        openOverlay: 'open-overlay 0.4s 0s forwards',
        closeOverlay: 'close-overlay 0.4s 0s forwards',
        openSidebar: 'open-sidebar 0.4s ease-in-out 0s forwards',
        closeSidebar: 'close-sidebar 0.4s ease-in-out 0s forwards',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
