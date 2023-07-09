import { createStackNavigator } from '@react-navigation/stack'
import { SettingsScreen } from '@screens'
import { SettingsStackType } from '@types'
import { ProfileSettingsScreen } from 'src/screens/settings/profile'

const Stack = createStackNavigator<SettingsStackType>()

export const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="Profile" component={ProfileSettingsScreen} />
    </Stack.Navigator>
  )
}
