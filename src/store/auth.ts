import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUser, ResponseError } from '@types'
import { IProfileForm } from 'src/screens/settings/profile'
import { http } from 'src/utils/axios'
import { create } from 'zustand'
import Toast from 'react-native-toast-message'
import { ILoginForm } from '@forms/login'
import { ISignupForm } from '@forms/signup'

type LoginResponse = { data: { user: IUser; accessToken: string } }

interface IAppAuthStore {
  isAuthenticated: boolean
  user: IUser | null
  isLoggingIn: boolean
  loginError: ResponseError
  login: (input: ILoginForm) => void
  isSigningUp: boolean
  signUpError: ResponseError
  signUp: (input: Omit<ISignupForm, 'passwordConfirmation'>) => void
  isRefreshingToken: boolean
  refreshTokenError: ResponseError
  refreshToken: () => void
  checkAuthError: ResponseError
  checkAuth: () => void
  logoutError: ResponseError
  logout: () => void
  isUpdatingProfile: boolean
  updateProfileError: ResponseError
  updateProfile: (input: IProfileForm, onSuccess: () => void) => void
  isLoadingUserInfo: boolean
  loadUserInfoError: ResponseError
  loadUserInfo: (id: string) => void
}

export const useAppAuth = create<IAppAuthStore>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoggingIn: false,
  loginError: null,
  login: async input => {
    set(state => ({ ...state, isLoggingIn: true, loginError: null }))
    try {
      const loginData = (await http.post<LoginResponse>('/auth/login', input))
        .data
      set(state => ({
        ...state,
        isAuthenticated: true,
        user: loginData.data.user,
      }))
      await AsyncStorage.setItem('accessToken', loginData.data.accessToken)
    } catch (err) {
      console.log('login err>>>', err)
      set(state => ({ ...state, loginError: new Error('failed to login') }))
      Toast.show({
        type: 'error',
        text2: 'Failed to login',
      })
    } finally {
      set(state => ({ ...state, isLoggingIn: false }))
    }
  },
  isSigningUp: false,
  signUpError: null,
  signUp: async input => {
    set(state => ({ ...state, isSigningUp: true, signUpError: null }))
    try {
      const signUpData = (
        await http.post<{ data: { accessToken: string; user: IUser } }>(
          '/auth/sign-up',
          input,
        )
      ).data
      await AsyncStorage.setItem('accessToken', signUpData.data.accessToken)
      set(state => ({
        ...state,
        isAuthenticated: true,
        user: signUpData.data.user,
      }))
    } catch (err) {
      set(state => ({ ...state, signUpError: new Error('failed to signup') }))
    } finally {
      set(state => ({ ...state, isSigningUp: false }))
    }
  },
  checkAuthError: null,
  checkAuth: async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      if (!accessToken) {
        throw new Error()
      }
      await get().refreshToken()
    } catch (err) {
      set(state => ({ ...state, checkAuthError: new Error() }))
    }
  },
  isRefreshingToken: false,
  refreshTokenError: null,
  refreshToken: async () => {
    set(state => ({
      ...state,
      isRefreshingToken: true,
      refreshTokenError: null,
    }))

    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      if (!accessToken) return
      const data = (
        await http.post<{ data: { accessToken: string; user: IUser } }>(
          '/auth/refresh-token',
        )
      ).data
      await AsyncStorage.setItem('accessToken', data.data.accessToken)
      set(state => ({ ...state, isAuthenticated: true, user: data.data.user }))
    } catch (err) {
      set(state => ({ ...state, refreshTokenError: new Error() }))
    } finally {
      set(state => ({ ...state, isRefreshingToken: false }))
    }
  },
  logoutError: null,
  logout: async () => {
    try {
      await AsyncStorage.removeItem('accessToken')
      set(state => ({ ...state, isAuthenticated: false, user: null }))
    } catch (err) {
      set(state => ({ ...state, logoutError: new Error() }))
    }
  },
  isUpdatingProfile: false,
  updateProfileError: null,
  updateProfile: async (input, onSuccess) => {
    set(state => ({
      ...state,
      isUpdatingProfile: true,
      updateProfileError: null,
    }))
    try {
      const formData = new FormData()
      Object.entries(input).forEach(entry => {
        formData.append(entry[0], entry[1])
      })

      const data = (
        await http.put<{ data: IUser }>(
          `/api/users/${get().user?.id}`,
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
            transformRequest: d => d,
          },
        )
      ).data

      set(state => ({ ...state, user: data.data }))
      Toast.show({
        type: 'success',
        text2: 'The profile was successfully updated',
      })
      onSuccess()
    } catch (err) {
      console.error(err)
      set(state => ({
        ...state,
        updateProfileError: new Error('Failed to update the profile'),
      }))
      Toast.show({
        type: 'error',
        text2: 'Failed to update the profile',
      })
    } finally {
      set(state => ({ ...state, isUpdatingProfile: false }))
    }
  },
  isLoadingUserInfo: false,
  loadUserInfoError: null,
  loadUserInfo: async id => {
    set(state => ({
      ...state,
      isLoadingUserInfo: false,
      loadUserInfoError: null,
    }))
    try {
      const data = (await http.get<IUser>(`/api/users/${id}`)).data
      set(state => ({ ...state, user: data }))
    } catch (err) {
      set(state => ({
        ...state,
        loadUserInfoError: new Error(
          'Failed to load your data. Values may be inconsistent',
        ),
      }))
    } finally {
      set(state => ({ ...state, isLoadingUserInfo: false }))
    }
  },
}))
