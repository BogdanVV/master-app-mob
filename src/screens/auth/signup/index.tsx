import { BackButton, ScreenLayout } from '@components'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackType } from '@types'
import { useAppAuth } from 'src/store/auth'
import { StyleSheet, Text, View } from 'react-native'
import { SignupForm } from '@forms'
import { ISignupForm } from '@forms/signup'

interface IProps {
  navigation: StackNavigationProp<AuthStackType, 'Signup'>
}

export const SignUpScreen = ({ navigation }: IProps) => {
  const { isSigningUp, signUpError, signUp } = useAppAuth(state => ({
    isSigningUp: state.isSigningUp,
    signUpError: state.signUpError,
    signUp: state.signUp,
  }))

  const onSubmit = (data: ISignupForm) => {
    signUp({ email: data.email, name: data.name, password: data.password })
  }

  return (
    <ScreenLayout>
      <View style={styles.headerContainer}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.screenContentContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <SignupForm
          isSigningUp={isSigningUp}
          onSubmit={onSubmit}
          signUpError={signUpError}
        />
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
  },
  screenContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 32,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 32,
  },
})
