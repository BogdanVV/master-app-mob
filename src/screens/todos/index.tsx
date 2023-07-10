import { TodoListItem } from '@components'
import { useEffect } from 'react'
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

export const TodosScreen = () => {
  const { loadTodos, isTodosLoading, todosLoadingError, todos } = useTodos(
    state => ({
      loadTodos: state.loadTodos,
      isTodosLoading: state.isTodosLoading,
      todosLoadingError: state.todosLoadingError,
      todos: state.todos,
    }),
    shallow,
  )

  // console.log(JSON.stringify(todos, null, 4))

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  return (
    <ScreenLayout>
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
          // TODO: replace with FlatList
          <ScrollView contentContainerStyle={styles.listContainer}>
            {todos.map(t => (
              <TodoListItem
                isChecked={false}
                onCheckPress={(id: number) => {
                  console.log(`item with id ${id} clicked`)
                }}
                key={t.id}
                todo={t}
              />
            ))}
          </ScrollView>
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
    borderWidth: 2,
    borderColor: 'red',
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
})
