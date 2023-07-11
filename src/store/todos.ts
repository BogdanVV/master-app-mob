import Toast from 'react-native-toast-message'
import { http } from 'src/utils/axios'
import { create } from 'zustand'

export enum TodoStatuses {
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export interface ITodoUpdateBody {
  title?: string
  description?: string
  status?: TodoStatuses
  activeDays?: DaysOfWeek
  priority?: TodoPriorities
  isDaily?: boolean
}

export enum TodoPriorities {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum DaysOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursdya',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export interface ITodo {
  id: number
  title: string
  description: string
  isDaily: boolean
  priority: TodoPriorities
  status: TodoStatuses
  createdAt: string
  updatedAt: string
  userId: string
  activeDays: string[]
}

interface ITodosStore {
  todos: ITodo[]
  isTodosLoading: boolean
  loadTodos: () => void
  todosLoadingError: Error | null
  todo: ITodo | null
  isGettingTodoById: boolean
  getTodoByIdError: Error | null
  getTodoById: (id: number) => void
  isCreatingTodo: boolean
  creatingTodoError: Error | null
  createTodo: () => void
  isUpdatingTodo: boolean
  updatingTodoError: Error | null
  updateTodo: (id: number, body: ITodoUpdateBody) => void
  isDeletingTodo: boolean
  deleteTodoError: Error | null
  deleteTodo: (id: number) => void
}

export const useTodos = create<ITodosStore>(set => ({
  todos: [],
  isTodosLoading: false,
  todosLoadingError: null,
  loadTodos: async () => {
    set(state => ({ ...state, isTodosLoading: true, todosLoadingError: null }))
    try {
      const todos = (await http.get<ITodo[]>('/api/todos')).data
      set(state => ({ ...state, todos }))
    } catch (err) {
      set(state => ({
        ...state,
        todosLoadingError: new Error('failed to load todos'),
      }))
      Toast.show({
        visibilityTime: 2000,
        type: 'error',
        text2: 'Failed to load todos. Please, try again later.',
      })
    } finally {
      set(state => ({ ...state, isTodosLoading: false }))
    }
  },
  todo: null,
  isGettingTodoById: false,
  getTodoByIdError: null,
  getTodoById: async (id: number) => {
    try {
      set(state => ({
        ...state,
        isGettingTodoById: true,
        getTodoByIdError: null,
      }))

      const todo = (await http.get<{ data: ITodo }>(`/api/todos/${id}`)).data
      set(state => ({ ...state, todo: todo.data }))
    } catch (err) {
      Toast.show({
        visibilityTime: 2000,
        type: 'error',
        text2: 'Failed to fetch the todo.',
      })
      set(state => ({ ...state, getTodoByIdError: new Error() }))
    } finally {
      set(state => ({ ...state, isGettingTodoById: false }))
    }
  },
  isCreatingTodo: false,
  creatingTodoError: null,
  createTodo: async () => {},
  isUpdatingTodo: false,
  updatingTodoError: null,
  updateTodo: async (id: number, body: ITodoUpdateBody) => {
    try {
      set(state => ({
        ...state,
        isUpdatingTodo: true,
        updatingTodoError: null,
      }))

      const data = (await http.put<{ data: ITodo }>(`/api/todos/${id}`, body))
        .data
      console.log('data>>>', data)
      set(state => ({ ...state, todo: data.data }))
      Toast.show({
        visibilityTime: 2000,
        type: 'success',
        text2: 'Update successfully',
      })
    } catch (err) {
      console.error(err)
      set(state => ({ ...state, updatingTodoError: new Error() }))
      Toast.show({
        visibilityTime: 2000,
        type: 'error',
        text2: 'Failed to update',
      })
    } finally {
      set(state => ({ ...state, isUpdatingTodo: false }))
    }
  },
  isDeletingTodo: false,
  deleteTodoError: null,
  deleteTodo: async (id: number) => {
    console.log('id>>>', id)
  },
}))
