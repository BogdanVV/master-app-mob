import { TodoListItem, TodoRevertCheckToast } from '@components'
import { useCallback, useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScreenLayout } from 'src/components/ScreenLayout'
import { useTodos } from 'src/store/todos'
import { shallow } from 'zustand/shallow'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StackNavigationProp } from '@react-navigation/stack'
import { TodosStackType } from '@types'

interface IProps {
  navigation: StackNavigationProp<TodosStackType>
}

export const TodosScreen = ({ navigation }: IProps) => {
  const { loadTodos, isTodosLoading, todosLoadingError, todos } = useTodos(
    state => ({
      loadTodos: state.loadTodos,
      isTodosLoading: state.isTodosLoading,
      todosLoadingError: state.todosLoadingError,
      todos: state.todos,
    }),
    shallow,
  )
  const [isRevertToastVisible, setIsRevertToastVisible] =
    useState<boolean>(false)

  const onTodoPress = (id: number) => {
    navigation.navigate('Todo', { id })
  }

  const onCheckPress = (id: number) => {
    console.log('id>>>', id)
    if (!isRevertToastVisible) {
      setIsRevertToastVisible(true)
      setTimeout(() => {
        setIsRevertToastVisible(false)
      }, 3000)
    }
  }

  const onRefresh = useCallback(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  return (
    <ScreenLayout isRefreshing={isTodosLoading} onRefresh={onRefresh}>
      <TodoRevertCheckToast isVisible={isRevertToastVisible} todoId={123} />
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => {
            console.log('add press')
          }}
        >
          <Icon name="plus" color="#fff" size={24} />
        </TouchableOpacity>

        <View style={styles.screenTitleContainer}>
          <Text style={styles.screenTitle}>Todos</Text>
        </View>
        {todosLoadingError ? (
          <Text style={{ color: '#fff' }}>
            Error: {todosLoadingError.message}
          </Text>
        ) : isTodosLoading ? (
          <Text style={{ color: '#fff' }}>Loading...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.listContainer}>
            {todos.map(t => (
              <TodoListItem
                onTodoPress={onTodoPress}
                isChecked={false}
                onCheckPress={() => onCheckPress(t.id)}
                key={t.id}
                todo={t}
              />
            ))}
          </ScrollView>
          // Not using FlatList because ScreenLayout component is wrapped in ScrollView
          // <FlatList
          //   data={[...todos, ...todos, ...todos, ...todos, ...todos, ...todos]}
          //   keyExtractor={todo => `${todo.id}`}
          //   renderItem={({ item }) => (
          //     <TodoListItem
          //       isChecked={false}
          //       onCheckPress={() => {}}
          //       todo={item}
          //     />
          //   )}
          //   ItemSeparatorComponent={() => (
          //     <View style={styles.listItemSeparator} />
          //   )}
          //   ListFooterComponent={<View />}
          //   ListFooterComponentStyle={{ height: 90 }}
          // />
        )}
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    position: 'relative',
  },
  listContainer: {
    gap: 8,
    paddingBottom: 80,
  },
  screenTitleContainer: {
    maxWidth: '40%',
  },
  screenTitle: {
    fontSize: 32,
    color: '#fff',
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  addButton: {
    borderRadius: 999,
    borderWidth: 2,
    backgroundColor: '#18181b',
    borderColor: '#fff',
    position: 'absolute',
    padding: 16,
    right: 16,
    bottom: 16,
    zIndex: 10,
  },
  listItemSeparator: {
    height: 10,
  },
})
