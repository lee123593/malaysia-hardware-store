import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ========== 克莱因蓝主题色系 ==========
        klein: {
          50:  '#E8EDFA',
          100: '#C5D1F2',
          200: '#9DB3E8',
          300: '#7595DE',
          400: '#4D77D4',
          500: '#2959C0',
          600: '#002FA7',  // Klein Blue 主色
          700: '#00268A',
          800: '#001D6B',
          900: '#00144D',
          950: '#000B2E',
        },
        // 辅助色
        surface: {
          white: '#FFFFFF',
          light: '#F5F5F7',
          gray:  '#E8E8ED',
          dark:  '#1D1D1F',
          black: '#000000',
        },
        // 强调色
        accent: {
          glow:   '#E8EDFA',  // 荧光白
          silver: '#D1D1D6',  // 浅银灰
          warm:   '#F5F5F7',  // 暖白
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans SC"',
          '"Noto Sans Malayalam"',
          'sans-serif',
        ],
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
        '2xl': '28px',
      },
      spacing: {
        'section': '4rem',
        'section-sm': '2rem',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 30px rgba(0, 47, 167, 0.12)',
        'nav': '0 1px 8px rgba(0, 0, 0, 0.04)',
        'button': '0 4px 14px rgba(0, 47, 167, 0.25)',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
