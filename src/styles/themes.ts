import { basicColors } from './basicColors'

export const darkTheme = {
  colors: {
    mainBg: '#18181b',
    textMain: '#fff',
    bgSecondary: '#27272a',
    ...basicColors,
  },
  font: {
    size: {
      xs: '10px',
      s: '14px',
      m: '16px',
      l: '24px',
      xl: '32px',
    },
    weight: {
      standard: 400,
      bold: 700,
    },
  },
}

export const lightTheme = {
  colors: {
    mainBg: '#e4e4e7',
    textMain: '#1a1a1a',
    bgSecondary: '#d4d4d8',
    ...basicColors,
  },
  font: {
    size: {
      xs: '10px',
      s: '14px',
      m: '16px',
      l: '24px',
      xl: '32px',
    },
    weight: {
      standard: 400,
      bold: 700,
    },
  },
}
