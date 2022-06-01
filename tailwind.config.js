const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layout/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir Next', ...defaultTheme.fontFamily.sans],
        heading: ['Druk Wide Web', ...defaultTheme.fontFamily.sans]
      },
      lineHeight: {
        12: '1.2',
        131: '1.31',
        138: '1.38'
      },
      spacing: {
        22: '48px'
      },
      fontSize: {
        12: '12px',
        14: '14px',
        24: '24px',
        54: '54px'
      },
      colors: {
        primaryDark: '#370063',
        primaryClear: '#9D69DE',
        primary: '#8F00FF',
        primaryClearBg: '#FAF3FF',
        whitePurple: '#C89CFF',
        gray: '#898989'
      },
      maxWidth: {
        '558px': '558px'
      },
      width: {
        90: '360px'
      },
      height: {
        82: '328px',
        149: '569px'
      },
      boxShadow: {
        purpleDark: '0px 20px 35px rgba(55, 0, 99, 0.2)'
      },
      margin: {
        '-13': '-52px',
        '-100': '-400px'
      }
    }
  },
  plugins: []
}
