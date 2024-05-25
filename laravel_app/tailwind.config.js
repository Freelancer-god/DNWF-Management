/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.jsx',
    './resources/**/*.vue',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        // primary: '#00040f',
        // secondary: '#00f6ff',
        // dimWhite: 'rgba(255, 255, 255, 0.7)',
        // dimBlue: 'rgba(9, 151, 124, 0.1)',
      },
      fontFamily: {
        myFont: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Cantarell', 'Ubuntu', 'Helvetica Neue', 'Arial', 'sans-serif', 'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
    },
    screens: {
      //   ...defaultTheme.screens,
      bp375: '375px',
      bp450: '450px',
      bp950: '950px',

      bpm375: '375px',
      bpm450: { max: '450px' },
      xxs: '360px',
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
