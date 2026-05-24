// @ts-ignore
import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './assets/**/*.css',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter','Quicksand','Bruno Ace SC'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary, #FFAC00)',
          50: '#FFF3D9',
          100: '#FFE9BF',
          200: '#FFD680',
          300: '#FFC240',
          400: '#FFAC00',
          500: '#E69B00',
          600: '#CC8A00',
          700: '#B37800',
          800: '#996700',
          900: '#805600',
          950: '#664400',
        },
        secondary: {
          DEFAULT: '#FFA600',
          50: '#FFEDCC',
          100: '#FFDB99',
          200: '#FFC966',
          300: '#FFC14D',
          400: '#FFAF1A',
          500: '#FFA600',
          600: '#E69500',
          700: '#CC8500',
          800: '#B37400',
          900: '#996300',
          950: '#664200',
        },
        dark: {
          DEFAULT: '#161616',
          lighter: '#242424',
          card: '#1c1c1c',
          deep: '#0b0b0b',
        },
        info: {
          DEFAULT: '#3abff8',
          50: '#e0f4ff',
          100: '#bae5ff',
          200: '#8fd4ff',
          300: '#64c3ff',
          400: '#3ab2ff',
          500: '#1f9fe6',
          600: '#147cb4',
          700: '#0f5c82',
          800: '#093c51',
          900: '#041c21',
        },
        success: {
          DEFAULT: '#36d399',
          50: '#dbfbed',
          100: '#b2f5d9',
          200: '#88f0c5',
          300: '#5eeab1',
          400: '#34e49d',
          500: '#1bc184',
          600: '#159868',
          700: '#0f6f4d',
          800: '#084632',
          900: '#022e1e',
        },
        warning: {
          DEFAULT: '#fbbd23',
          50: '#fff7db',
          100: '#ffeeb2',
          200: '#ffe488',
          300: '#ffdb5e',
          400: '#ffd234',
          500: '#e6b91b',
          600: '#b49215',
          700: '#826c0f',
          800: '#504509',
          900: '#1f1e03',
        },
        error: {
          DEFAULT: '#f87272',
          50: '#ffe5e5',
          100: '#ffb8b8',
          200: '#ff8a8a',
          300: '#ff5c5c',
          400: '#ff2e2e',
          500: '#e61414',
          600: '#b41010',
          700: '#820c0c',
          800: '#500808',
          900: '#1f0303',
        }
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '84': '21rem',
        '98': '24.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'neon': '0 0 5px var(--tw-shadow-color), 0 0 20px var(--tw-shadow-color)',
        'glass': '0 0 15px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 0 30px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'bounce-gentle': 'bounce-gentle 1s infinite',
        'pulse-gentle': 'pulse-gentle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },

  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    rtl: true,
    darkMode:'class',
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['forest'],
          primary: '#FFAC00',
          'primary-focus': '#E69B00',
          secondary: '#a100fc',
          'secondary-focus': '#7900bf',
        }
      },
      {
        light: {
          ...require('daisyui/src/theming/themes')['emerald'],
          primary: '#FFAC00',
          'primary-focus': '#E69B00',
          secondary: '#a100fc',
          'secondary-focus': '#7900bf',
        }
      },
      {
        night: {
          ...require('daisyui/src/theming/themes')['night'],
          primary: '#FFAC00',
          'primary-focus': '#E69B00',
          secondary: '#a100fc',
          'secondary-focus': '#7900bf',
        }
      }, 
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
} satisfies Config;