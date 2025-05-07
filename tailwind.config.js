/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          primary: '#36393f',
          secondary: '#2f3136',
          tertiary: '#202225',
          accent: '#5865f2',
          text: '#dcddde',
          muted: '#72767d',
          link: '#00b0f4',
          positive: '#43b581',
          negative: '#f04747',
          warning: '#faa61a',
        },
      },
    },
  },
  plugins: [],
}
