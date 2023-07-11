import { StyleSheet, View } from 'react-native'
import {
  BaseToast,
  ErrorToast,
  ToastConfig,
  InfoToast,
} from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/Ionicons'

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
  revertTodoCheck: props => (
    <InfoToast
      style={{
        backgroundColor: '#f59e0b',
        borderRadius: 10,
        borderLeftWidth: 0,
      }}
      text1Style={{
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
      }}
      // renderLeadingIcon={() => (
      //   <Icon name="arrow-undo-outline" size={40} color="#000" />
      // )}
      renderTrailingIcon={() => (
        <View style={styles.undoIconContainer}>
          <Icon name="arrow-undo-outline" size={32} color="#fff" />
        </View>
      )}
      {...props}
    />
  ),
}

const styles = StyleSheet.create({
  undoIconContainer: {
    marginRight: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    top: 10,
  },
})
