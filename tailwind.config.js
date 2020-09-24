const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    aspectRatio: {
      none: 0,
      square: [1, 1],
      "16/9": [16, 9],
      "4/3": [4, 3],
      "21/9": [21, 9]
    },
    extend: {
      colors: {
        'curious-blue': { // light blue
          '100': '#E9F5FB',
          '200': '#C8E6F5',
          '300': '#A7D7EF',
          '400': '#66B9E3',
          '500': '#249BD7',
          '600': '#208CC2',
          '700': '#165D81',
          '800': '#104661',
          '900': '#0B2F41',
        },
        'crusta': { // bright orange
          '100': '#FEF1E9',
          '200': '#FCDBC8',
          '300': '#FAC5A6',
          '400': '#F79A64',
          '500': '#F36E21',
          '600': '#DB631E',
          '700': '#924214',
          '800': '#6D320F',
          '900': '#49210A',
        },
        'lime': {
          '100': '#F3F8E6',
          '200': '#E0EEBF',
          '300': '#CDE399',
          '400': '#A8CE4D',
          '500': '#82B900',
          '600': '#75A700',
          '700': '#4E6F00',
          '800': '#3B5300',
          '900': '#273800',
        },
        'minsk': { // indigo
          '100': '#EAEBF4',
          '200': '#CBCEE3',
          '300': '#ABB0D1',
          '400': '#6D74AF',
          '500': '#2E398D',
          '600': '#29337F',
          '700': '#1C2255',
          '800': '#151A3F',
          '900': '#0E112A',
        },
        'orange': {
          ...defaultTheme.colors.orange,
          '500': '#ef3f35',
        },
      },
    },
    fontFamily: {
      sans: ['Whitney', 'Lato', ...defaultTheme.fontFamily.sans],
      display: ['Aldi', ...defaultTheme.fontFamily.sans],
      subheading: ['Clambake', ...defaultTheme.fontFamily.serif],
      body: ['Whitney', 'Lato', ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    aspectRatio: ['responsive']
  },
  plugins: [
    require('@tailwindcss/ui'),
    require("tailwindcss-responsive-embed"),
    require("tailwindcss-aspect-ratio"),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}