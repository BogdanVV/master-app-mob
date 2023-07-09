import Toast from 'react-native-toast-message'
import { http } from 'src/utils/axios'
import { create } from 'zustand'

export enum TodoStatuses {
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export enum TodoPriorities {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
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
}

export const useTodos = create<ITodosStore>(set => ({
  todos: [],
  isTodosLoading: false,
  todosLoadingError: null,
  loadTodos: async () => {
    set(state => ({ ...state, isTodosLoading: true, todosLoadingError: null }))
    try {
      const todos = (await http.get('/api/todos')).data
      set(state => ({ ...state, todos }))
    } catch (err) {
      set(state => ({
        ...state,
        todosLoadingError: new Error('failed to load todos'),
      }))
      Toast.show({
        type: 'error',
        text2: 'Failed to load todos. Please, try again later.',
      })
    } finally {
      set(state => ({ ...state, isTodosLoading: false }))
    }
  },
}))
