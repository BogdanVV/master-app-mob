import AsyncStorage from '@react-native-async-storage/async-storage'
import { darkTheme, lightTheme } from 'src/styles'
import { DefaultTheme } from 'styled-components/native'
import { create } from 'zustand'

type ThemeTitle = 'dark' | 'light'

interface IThemeState {
  theme: DefaultTheme
  changeTheme: (newTheme: ThemeTitle) => void
  getTheme: () => void
  themeTitle: ThemeTitle
}

export const useAppTheme = create<IThemeState>(set => ({
  themeTitle: 'dark',
  theme: darkTheme,
  getTheme: async () => {
    try {
      const theme = (await AsyncStorage.getItem('theme')) as ThemeTitle
      if (theme) {
        set(state => ({
          ...state,
          theme: theme === 'dark' ? darkTheme : lightTheme,
        }))
      }
    } catch (err) {
      set(state => ({ ...state, theme: darkTheme }))
      console.log('err on getTheme>>>', err)
    }
  },
  changeTheme: async (newTheme: ThemeTitle) => {
    try {
      await AsyncStorage.setItem('theme', newTheme)
      set(state => ({
        ...state,
        theme: newTheme === 'dark' ? darkTheme : lightTheme,
        themeTitle: newTheme === 'dark' ? 'dark' : 'light',
      }))
    } catch (err) {
      set(state => ({ ...state, theme: darkTheme }))
      console.log('err on changeTheme>>>', err)
    }
  },
}))
