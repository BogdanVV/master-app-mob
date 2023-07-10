import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNav } from '@components'
import { BACKEND_BASE_URL } from '@env'
import { Text } from 'react-native'
// import { ThemeProvider } from 'styled-components/native'
// import { useAppTheme } from './store/theme'
import { useEffect } from 'react'
import { useAppAuth } from './store/auth'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthStack } from './navigation/AuthStack'
import { RootNavStack } from '@types'
import Toast from 'react-native-toast-message'
import { toastConfig } from './utils/toast'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Stack = createStackNavigator<RootNavStack>()

export const App = () => {
  // const { theme, getTheme } = useAppTheme(state => ({
  //   theme: state.theme,
  //   getTheme: state.getTheme,
  // }))
  const { refreshToken, isRefreshingToken, isAuthenticated } = useAppAuth(
    state => ({
      isRefreshingToken: state.isRefreshingToken,
      refreshToken: state.refreshToken,
      isAuthenticated: state.isAuthenticated,
    }),
  )

  useEffect(() => {
    // getTheme()
    refreshToken()
  }, [
    // getTheme,
    refreshToken,
  ])

  // TODO: add implementation (incl. UI) for this use-case
  if (!BACKEND_BASE_URL) {
    return <Text>Error .env</Text>
  }

  if (isRefreshingToken) {
    return <Text>Refreshing token...</Text>
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{ headerShown: false }}
        >
          {isAuthenticated ? (
            <Stack.Screen name="BottomTabs" component={BottomTabNav} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  )
}
