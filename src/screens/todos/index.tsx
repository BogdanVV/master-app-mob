import { TodoListItem } from '@components'
import { useEffect } from 'react'
import { Text } from 'react-native'
import { ScreenLayout } from 'src/components/ScreenLayout'
import { useTodos } from 'src/store/todos'
import { shallow } from 'zustand/shallow'
import { ContentContainer, ScreenTitle, TodoListContainer } from './styled'

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

  console.log(JSON.stringify(todos, null, 4))

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  return (
    <ScreenLayout>
      <ContentContainer>
        <ScreenTitle>Todos</ScreenTitle>
        {todosLoadingError ? (
          <Text style={{ color: '#fff' }}>
            Error: {todosLoadingError.message}
          </Text>
        ) : isTodosLoading ? (
          <Text style={{ color: '#fff' }}>Loading...</Text>
        ) : (
          <TodoListContainer>
            {todos.map(t => (
              <TodoListItem key={t.id} todo={t} />
            ))}
          </TodoListContainer>
        )}
      </ContentContainer>
    </ScreenLayout>
  )
}
