import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from '../screens/auth/login'
import { SignUpScreen } from '../screens/auth/signup'
import { AuthStackType } from '@types'

const Stack = createStackNavigator<AuthStackType>()

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  )
}
