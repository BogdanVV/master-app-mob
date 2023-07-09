import 'styled-components/native'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      mainBg: string
      bgSecondary: string
      white: string
      black: string
      textMain: string
    }

    font: {
      size: {
        xs: string
        s: string
        m: string
        l: string
        xl: string
      }
      weight: {
        standard: number
        bold: number
      }
    }
  }
}
