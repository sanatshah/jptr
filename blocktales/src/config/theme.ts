import { extendTheme, ChakraProvider } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#5e1a91',
    800: '#5e1a91',
    700: '#5e1a91',
    600: '#5e1a91',
    500: '#5e1a91',
    400: '#5e1a91',
    300: '#5e1a91',
    200: '#5e1a91',
    100: '#5e1a91',
  },
}

export const BACKGROUND_THEME = {
  "default": {
    1: "rgb(235 74 230)",
    2: "rgb(74 101 235)",
    3: "rgb(241 220 118)",
    4: "hsla(262.03125, 79.71%, 60.58%, 1.00)"
  },
  "forest": {
    1: "rgb(112 118 147)",
    2: "rgb(3 40 6)",
    3: "rgb(147 77 77)",
    4: "rgb(129 141 176)"
  },
  "sky": {
    1: "rgb(128 171 117)",
    2: "rgb(136 210 207)",
    3: "rgb(233 212 212)",
    4: "rgb(129 141 173)"
  },
  "blue": {
  },
  "yellow": {

  }
}

export const theme = extendTheme({ colors })