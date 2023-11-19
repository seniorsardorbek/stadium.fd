import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode :"class" ,
  theme: {
    extend: {
      colors :{
        "bblue" :'#fcfcfc'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true, // Centers the container horizontally
        padding: '1rem', // You can set your desired padding
      },
      boxShadow: {
        'custom': '6.84842px 82.18102px 41.09051px 0px rgba(229, 229, 229, 0.70)',
      },
    },
  },

  plugins: []
}
export default config
