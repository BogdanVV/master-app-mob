import {
  BackButton,
  ButtonPrimary,
  ScreenLayout,
  TodoOptionItem,
} from '@components'
import { UpdateTodoForm } from '@forms'
import { StackScreenProps } from '@react-navigation/stack'
import { TodosStackType } from '@types'
import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useTodos } from 'src/store/todos'
import { shallow } from 'zustand/shallow'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getPriorityIconProps } from '@utils'

type Props = StackScreenProps<TodosStackType, 'Todo'>

export const TodoScreen = ({ route, navigation }: Props) => {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false)
  const { getTodoById, getTodoByIdError, isGettingTodoById, todo } = useTodos(
    state => ({
      todo: state.todo,
      isGettingTodoById: state.isGettingTodoById,
      getTodoByIdError: state.getTodoByIdError,
      getTodoById: state.getTodoById,
    }),
    shallow,
  )
  console.log('todo>>>', todo)
  const priorityIconProps = getPriorityIconProps(todo?.priority)

  const onRefresh = useCallback(async () => {
    getTodoById(route.params.id)
  }, [])

  const onDeletePress = () => {}

  const onEditPress = () => setIsEditingMode(prev => !prev)

  const onCheckPress = () => {}

  useEffect(() => {
    getTodoById(route.params.id)
  }, [])

  if (getTodoByIdError) {
    return (
      <ScreenLayout>
        <View style={styles.screenStatusContainer}>
          <Text style={styles.errorMessage}>Failed to load todo.</Text>
          <ButtonPrimary
            title="GO TO THE LIST"
            onPress={() => navigation.replace('TodosMain')}
          />
        </View>
      </ScreenLayout>
    )
  }

  if (isGettingTodoById) {
    return (
      <ScreenLayout>
        <View style={styles.screenStatusContainer}>
          <ActivityIndicator size={64} color="#fff" />
        </View>
      </ScreenLayout>
    )
  }

  return (
    <ScreenLayout isRefreshing={isGettingTodoById} onRefresh={onRefresh}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.optionsContainer}>
          <TodoOptionItem
            iconName="checkmark-outline"
            onPress={onCheckPress}
            iconColor="#16a34a"
          />
          <TodoOptionItem iconName="create-outline" onPress={onEditPress} />
          <TodoOptionItem
            iconName="trash-outline"
            iconColor="#dc2626"
            onPress={onDeletePress}
          />
        </View>

        <View style={styles.infoContainer}>
          {isEditingMode ? (
            <UpdateTodoForm />
          ) : (
            <>
              <View style={styles.infoCategoryContainer}>
                <Text style={styles.title}>Title</Text>
                <Text style={styles.subTitle}>{todo?.title}</Text>
              </View>
              <View style={styles.infoCategoryContainer}>
                <Text style={styles.title}>Priority</Text>
                <View style={styles.priorityValueContainer}>
                  <Icon
                    size={24}
                    color={priorityIconProps.color}
                    name={priorityIconProps.name}
                  />
                  <Text style={[styles.subTitle, styles.priority]}>
                    {todo?.priority ?? 'No priority specified'}
                  </Text>
                </View>
              </View>
              <View style={styles.infoCategoryContainer}>
                <Text style={styles.title}>Description</Text>
                <Text style={styles.subTitle}>
                  {todo?.description ?? 'No description provided'}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  screenStatusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  errorMessage: {
    color: '#dc2626',
    fontSize: 24,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 16,
    color: '#fff',
  },
  infoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 16,
  },
  infoCategoryContainer: {
    gap: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#71717a',
  },
  priorityValueContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  priority: { textTransform: 'capitalize' },
})
