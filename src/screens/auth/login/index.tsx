import { ScreenLayout } from '@components'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { useAppAuth } from 'src/store/auth'
import { ENV, CHEAT_LOGIN_EMAIL, CHEAT_LOGIN_PASSWORD } from '@env'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackType } from '@types'
import { ILoginForm, LoginForm } from '@forms/login'

interface IProps {
  navigation: StackNavigationProp<AuthStackType, 'Login'>
}

export const LoginScreen = ({ navigation }: IProps) => {
  const { isLoggingIn, login, isRefreshingToken, loginError } = useAppAuth(
    state => ({
      isLoggingIn: state.isLoggingIn,
      login: state.login,
      isRefreshingToken: state.isRefreshingToken,
      loginError: state.loginError,
    }),
  )

  const onSubmit = (data: ILoginForm) => login(data)

  if (isRefreshingToken) {
    return (
      <ScreenLayout>
        <View style={styles.screenContainer}>
          <ActivityIndicator />
        </View>
      </ScreenLayout>
    )
  }

  return (
    <ScreenLayout>
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Login</Text>
        <LoginForm
          isLoggingIn={isLoggingIn}
          loginError={loginError}
          onSubmit={onSubmit}
        />
        {ENV === 'dev' && (
          <Button
            title="CHEAT LOGIN"
            onPress={() =>
              login({
                email: CHEAT_LOGIN_EMAIL,
                password: CHEAT_LOGIN_PASSWORD,
              })
            }
          />
        )}
        <View>
          <Text style={styles.signUpHint}>Don't have account yet?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup')
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.signUpHint, styles.signUpLink]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 32,
  },
  screenTitle: {
    color: '#fff',
    fontSize: 32,
  },
  signUpHint: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  signUpLink: {
    color: '#1d4ed8',
    fontWeight: '700',
  },
})
