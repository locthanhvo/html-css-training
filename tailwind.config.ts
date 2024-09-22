import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#CB3CFF',
        secondary: '#AEB9E1',
        midNightBlue: '#0B1739',
        slateBlue: '#343B4F',
        iceBlue: '#D9E1FA',
        darkBlue: '#0A1330',
        springGreen: '#05C16833',
        ghostWhite: '#F1F1F333',
        spaceBlue: '#081028',
        denimBlue: '#575DFFCC',
        lightBlue: '#575DFF33',
      },
    },
  },
  plugins: [],
};
export default config;
