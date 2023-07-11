import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, View } from 'react-native'
import { BottomTabsStack } from '@types'
import { HomeScreen } from '@screens'
import Icon from 'react-native-vector-icons/Ionicons'
import { SettingsStack } from './SettingsStack'
import { TodosStack } from './TodosStack'
import { ScreenLayout } from '@components'

const Tab = createBottomTabNavigator<BottomTabsStack>()

const ToBeDeveloped = () => {
  return (
    <ScreenLayout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff' }}>To be developed...</Text>
      </View>
    </ScreenLayout>
  )
}

export const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1d4ed8',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#000',
        },
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        component={TodosStack}
        name="Todos"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'list-circle' : 'list-circle-outline'}
              size={20}
              color={color}
            />
          ),
          tabBarLabel: 'TODOS',
        }}
      />
      <Tab.Screen
        component={ToBeDeveloped}
        name="Tobedeveloped1"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'code-working' : 'code-working-outline'}
              size={20}
              color={color}
            />
          ),
          tabBarLabel: 'Zzzz1',
        }}
      />
      <Tab.Screen
        component={ToBeDeveloped}
        name="Tobedeveloped2"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'code-working' : 'code-working-outline'}
              size={20}
              color={color}
            />
          ),
          tabBarLabel: 'Zzzz2',
        }}
      />
      <Tab.Screen
        component={SettingsStack}
        name="Settings"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'settings' : 'settings-outline'}
              size={20}
              color={color}
            />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  )
}
