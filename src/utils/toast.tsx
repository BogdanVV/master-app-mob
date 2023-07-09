import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message'

export const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#16a34a',
        borderRadius: 10,
        borderLeftWidth: 0,
      }}
      contentContainerStyle={{}}
      text1Style={{
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
      }}
      text2Style={{
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center',
      }}
      text2NumberOfLines={3}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: '#b91c1c',
        borderRadius: 10,
        borderLeftWidth: 0,
      }}
      text1Style={{
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
      }}
      text2Style={{
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center',
      }}
      text2NumberOfLines={3}
    />
  ),
}
