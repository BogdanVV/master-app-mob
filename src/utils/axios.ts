import axios from 'axios'
import { Platform } from 'react-native'
import { ANDROID_DEV_BACKEND_BASE_URL, BACKEND_BASE_URL, ENV } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TEN_SECONDS = 10000

export const testHttp = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  // for correct processing of files, see https://stackoverflow.com/a/71116822/16197359
  // transformRequest: data => data,
  timeout: TEN_SECONDS,
})

// Android can not call `localhost` and should call `10.0.2.2:9999` instead
const devBaseUrl =
  Platform.OS === 'android' ? ANDROID_DEV_BACKEND_BASE_URL : BACKEND_BASE_URL

export const http = axios.create({
  baseURL: ENV !== 'dev' ? BACKEND_BASE_URL : devBaseUrl,
  // for correct processing of files, see https://stackoverflow.com/a/71116822/16197359
  // transformRequest: data => data,
  timeout: TEN_SECONDS,
})

http.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken')
  config.headers.Authorization = `Bearer ${accessToken}`
  // console.log('config>>>', config)
  return config
})
