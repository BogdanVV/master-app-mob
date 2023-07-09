export type BottomTabsStack = {
  Home: undefined
  Todos: undefined
  Tobedeveloped1: undefined
  Tobedeveloped2: undefined
  Settings: SettingsStackType
}

export type AuthStackType = {
  Login: undefined
  Signup: undefined
}

export type SettingsStackType = {
  SettingsMain: undefined
  Profile: undefined
}

export type RootNavStack = {
  Auth: AuthStackType
  BottomTabs: BottomTabsStack
}

export interface IUser {
  createdAt: string
  email: string
  id: string
  name: string
  updatedAt: string
  profileImageURL: string
}

export type ResponseError = Error | null

export interface IRNFile {
  name: string
  type: string
  uri: string
}
