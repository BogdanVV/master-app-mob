import { createStackNavigator } from '@react-navigation/stack'
import { TodoScreen, TodosScreen } from '@screens'
import { TodosStackType } from '@types'

const Stack = createStackNavigator<TodosStackType>()

export const TodosStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TodosMain" component={TodosScreen} />
      <Stack.Screen name="Todo" component={TodoScreen} />
    </Stack.Navigator>
  )
}
