const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layout/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir Next', ...defaultTheme.fontFamily.sans],
        heading: ['Druk Wide Web', ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        22: '48px'
      },
      fontSize: {
        24: '24px'
      },
      colors: {
        primaryDark: '#370063',
        primaryClear: '#9D69DE',
        primary: '#8F00FF'
      }
    }
  },
  plugins: []
}
