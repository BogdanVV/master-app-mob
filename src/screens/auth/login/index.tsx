import { AppTextInput, ButtonPrimary, ScreenLayout } from '@components'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { useAppAuth } from 'src/store/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ENV, CHEAT_LOGIN_EMAIL, CHEAT_LOGIN_PASSWORD } from '@env'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackType } from '@types'

interface IProps {
  navigation: StackNavigationProp<AuthStackType, 'Login'>
}

export interface ILoginForm {
  email: string
  password: string
}

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(5, { message: 'Obviously the password is too short to be true' }),
})

export const LoginScreen = ({ navigation }: IProps) => {
  const { isLoggingIn, login, isRefreshingToken, loginError } = useAppAuth(
    state => ({
      isLoggingIn: state.isLoggingIn,
      login: state.login,
      isRefreshingToken: state.isRefreshingToken,
      loginError: state.loginError,
    }),
  )
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  })

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
      {/* <View
        style={{ flex: 1, borderWidth: 3, borderColor: 'blue', height: '100%' }}
      >
        <Text style={{ color: '#fff' }}>123</Text>
      </View> */}
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Login</Text>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="Email"
                error={errors.email}
                placeholder="email"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="Password"
                error={errors.password}
                placeholder="password"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          <View style={styles.submitButtonContainer}>
            <ButtonPrimary
              disabled={!isValid || isLoggingIn}
              title="SUBMIT"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          {loginError ? (
            <Text style={styles.errorMessage}>Failed to login</Text>
          ) : null}
        </View>
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
  formContainer: {
    width: '100%',
    gap: 16,
  },
  submitButtonContainer: {
    marginTop: 24,
  },
  errorMessage: {
    color: '#dc2626',
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
