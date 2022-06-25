import type { DeepPartial, Theme } from '@chakra-ui/react'

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  purple: {
    100: '#9D69DE',
    200: '#9D69DE',
    300: '#9D69DE',
    400: '#9D69DE',
    500: '#9D69DE',
    600: '#FAF3FF',
    700: '#370063',
    800: '#9D69DE',
    900: '#8f00ff',
  },
  warning: {
    100: '#ffda95',
    200: '#f5a42a',
    800: '#A16207',
    900: '#854D0E',
  },
  error: {
    100: '#ff826e',
    900: '#FF4343',
  },
  primary: {
    100: '#8F00FF',
    700: '#370063',
  },
  secondary: {
    100: '#9D69DE',
    700: '#161616',
  },
  gray: {
    100: '#C4C4C4',
    200: '#898989',
    300: '#494949',
    400: '#2E2E2E',
  },
}

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {}

const colors = {
  ...overridenChakraColors,
  ...extendedColors,
}

export default colors
