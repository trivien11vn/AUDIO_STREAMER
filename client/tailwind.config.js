/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-left' : {
          '0%': {
            '-webkit-transform': 'translateX(500px);',
                    transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0px);',
                    transform: 'translateX(0px);'
          }
        },
        'slide-left2' : {
          '0%': {
            '-webkit-transform': 'translateX(500px);',
                    transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0px);',
                    transform: 'translateX(0px);'
          }
        },
        'slide-right' : {
          '0%': {
            '-webkit-transform': 'translateX(-500px);',
                    transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
                    transform: 'translateX(0);'
          }
        },
      },
      animation: {
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      }
    },
  },
  plugins: [],
}